import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { NavbarSearchResults } from "./NavbarSearchResults";
const axios = require("axios").default;

const SearchBox = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchRes, setSearchRes] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const router = useRouter();
	const query = router.query;

	useEffect(() => {
		// clear search results when page changes
		setSearchQuery("");
		setSearchRes(null);
	}, [query]);

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push({
			pathname: "/search",
			query: { q: `${searchQuery}` },
		});
		setSearchRes(null);
		setSearchQuery("");
	};
	0;
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
		if (query) {
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
		<div className='flex items-center'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Enter a movie, tv show, person...'
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						handleSearch(e.target.value);
					}}
					className={`${
						searchQuery ? "w-[250px]" : "w-[35px]"
					} relative rounded-full p-2 pr-8 text-slate-800 transition-all duration-700 ease-in-out hover:w-[250px] focus:w-[250px] focus:outline-sky-400`}
				/>
			</form>

			{searchQuery ? (
				<>
					<svg
						// close icon
						xmlns='http://www.w3.org/2000/svg'
						className='absolute right-0 mr-6 h-6 w-6 cursor-pointer'
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
					<div className='absolute top-14 z-10'>
						{searchRes && searchQuery && (
							<NavbarSearchResults props={{ searchRes, isSearching }} />
						)}
					</div>
				</>
			) : (
				<svg
					// magnifier icon
					xmlns='http://www.w3.org/2000/svg'
					className='pointer-events-none absolute right-0 mr-6 h-6 w-6 bg-white'
					fill='none'
					viewBox='0 0 24 24'
					stroke='#1f2937'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
					/>
				</svg>
			)}
		</div>
	);
};

export default SearchBox;
