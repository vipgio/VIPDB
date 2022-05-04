import { useState } from "react";
import { NavbarSearchResults } from "./NavbarSearchResults";
const axios = require("axios").default;

const SearchBox = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchRes, setSearchRes] = useState(null);
	const [isSearching, setIsSearching] = useState(true);
	const search = (query) => {
		if (searchQuery) {
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
				})
				.catch((error) => {
					console.error(error);
				});
			setIsSearching(false);
		}
	};
	return (
		<div className='flex items-center'>
			<input
				type='text'
				placeholder='Enter a movie, tv show, person...'
				value={searchQuery}
				onChange={(e) => {
					setSearchQuery(e.target.value);
					search(e.target.value);
				}}
				className={`${
					searchQuery ? "w-[250px]" : "w-[35px]"
				} relative rounded-full p-2 pr-8 text-slate-800 transition-all duration-700 ease-in-out hover:w-[250px] focus:w-[250px] focus:outline-sky-400`}
			/>

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
					<div className='absolute top-11 z-10 max-h-80 overflow-hidden'>
						{searchRes && searchQuery && <NavbarSearchResults data={searchRes} />}
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
