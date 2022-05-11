import { useState, useCallback, useEffect } from "react";
import SearchResults from "../components/SearchResults";
import Meta from "../components/Meta";
import { useRouter } from "next/router";
const axios = require("axios").default;

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchRes, setSearchRes] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (router) {
			console.log(router.query.q);
			setSearchQuery(router.query.q);
			search(router.query.q);
		}
	}, [router]);

	useEffect(() => {
		if (searchQuery.length === 0) {
			setSearchRes(null);
		}
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
		// console.log(query);
		if (query) {
			setIsSearching(true);
			const options = {
				method: "GET",
				url: `/api/search/${query}`,
			};

			axios
				.request(options)
				.then((response) => {
					console.log(response);
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
						placeholder='Enter a movie, tv show, person...'
						value={searchQuery}
						className='m-4 h-20 w-full rounded-xl px-4 text-4xl text-slate-800 outline-blue-400 duration-300'
						onChange={(e) => {
							handleSearch(e.target.value);
							setSearchQuery(e.target.value);
						}}
					/>
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
