import { useState, useCallback, useEffect } from "react";
import SearchResults from "../components/SearchResults";
import Meta from "../components/Meta";
import { useRouter } from "next/router";
const axios = require("axios").default;

const Search = () => {
	const router = useRouter();
	const query = router.query;
	const [searchQuery, setSearchQuery] = useState(query.q || "");
	const [searchRes, setSearchRes] = useState(null);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		/^\s*$/.test(searchQuery) && setSearchQuery(""); // string only includes whitespace
		if (searchQuery.length > 0) {
			router.push(`/search?q=${searchQuery}`, undefined, { shallow: true });
			handleSearch(searchQuery);
		}
		searchQuery.length === 0 && router.push("/search", undefined, { shallow: true }); // empty string
	}, [searchQuery]);

	const debounce = (func) => {
		let timer;
		return (args) => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func(args);
			}, 1000);
		};
	};

	const search = (query) => {
		if (query && !/^\s*$/.test(query)) {
			setIsSearching(true);
			const options = {
				method: "GET",
				url: `/api/search/${query}`,
			};

			axios
				.request(options)
				.then((response) => {
					setSearchRes(response.data);
					setIsSearching(false);
				})
				.catch((error) => {
					console.error(error);
					setIsSearching(false);
				});
		}
	};

	const handleSearch = useCallback(debounce(search), []);

	return (
		<>
			<Meta title='Search | VIPDB' />
			<div>
				<form
					className='flex items-center justify-center'
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type='text'
						placeholder='Enter a Movie, TV Show or Person'
						value={searchQuery}
						className='m-4 h-20 w-full rounded-xl px-4 text-4xl text-slate-800 outline-blue-400 duration-300'
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
					/>
					{searchQuery && (
						<svg
							// close icon
							xmlns='http://www.w3.org/2000/svg'
							className='absolute right-6 mr-6 h-8 w-8 cursor-pointer'
							fill='red'
							viewBox='0 0 24 24'
							stroke='#dc2626'
							onClick={() => setSearchQuery("")}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					)}
				</form>
			</div>

			<div>
				{isSearching ? (
					<div className='flex justify-center'>
						<div className='h-7 w-7 animate-spin rounded-full border-4 border-white border-t-gray-500'></div>
					</div>
				) : (
					searchRes &&
					searchQuery && <SearchResults data={searchRes} isSearching={isSearching} />
				)}
			</div>
		</>
	);
};

export default Search;
