import { useState } from "react";
import SearchResults from "../components/SearchResults";
import Meta from "../components/Meta";
const axios = require("axios").default;

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchRes, setSearchRes] = useState(null);
	const [isSearching, setIsSearching] = useState(true);
	const search = (query) => {
		if (searchQuery) {
			setIsSearching(true);
			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${query}`,
			};

			axios
				.request(options)
				.then((response) => {
					console.log(response);
					setSearchRes(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
			setIsSearching(false);
		}
	};

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
							setSearchQuery(e.target.value);
							search(e.target.value);
						}}
					/>
				</form>
			</div>
			<div>{searchRes && <SearchResults data={searchRes} />}</div>
		</>
	);
};

export default Search;
