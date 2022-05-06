import { useState, useEffect } from "react";
import { LinkHandler } from "../HOC/LinkHandler";

export const PersonTitlesList = ({ person }) => {
	const [filter, setFilter] = useState("all");
	const [filteredList, setFilteredList] = useState(person.combined_credits.cast);

	useEffect(() => {
		filter === "movie" &&
			setFilteredList((person.combined_credits.cast || []).filter((item) => item.title));
		filter === "tv" &&
			setFilteredList((person.combined_credits.cast || []).filter((item) => item.name));
		filter === "all" &&
			setFilteredList(
				(person.combined_credits.cast || []).filter((item) => item.title || item.name)
			);
	}, [filter]);
	return (
		<div className='relative'>
			<div className='absolute right-0 w-24 text-center'>
				<Dropdown setFilter={setFilter} filter={filter} />
			</div>
			{person.known_for_department === "Acting" ? (
				<>
					<h2 className='mb-2 text-2xl font-semibold'>Acting</h2>
					<div className='mb-2 divide-y border border-slate-300 shadow-lg'>
						{filteredList
							.sort((a, b) => {
								//sort based on date, if no date is available then move the title to the top
								if (a.first_air_date && b.first_air_date)
									return a.first_air_date.localeCompare(b.first_air_date);
								if (a.release_date && b.first_air_date)
									return a.release_date.localeCompare(b.first_air_date);
								if (a.first_air_date && b.release_date)
									return a.first_air_date.localeCompare(b.release_date);
								if (a.release_date && b.release_date)
									return a.release_date.localeCompare(b.release_date);
								if (!a.release_date && !a.first_air_date) return 1;
								if (!b.release_date && !b.first_air_date) return -1;
							})
							.reverse()
							.map((role) => (
								<div
									className='grid grid-cols-4 py-4 pr-2 md:grid-cols-9'
									key={role.credit_id}
								>
									{role.first_air_date || role.release_date ? (
										<span className='px-2 text-center'>
											{role.first_air_date?.slice(0, 4) || role.release_date?.slice(0, 4)}{" "}
										</span>
									) : (
										<span className='text-center'>—</span>
									)}
									{role.title && (
										<>
											<span className='col-span-3 md:col-span-8'>
												<span className='text-lg font-bold'>
													<LinkHandler type={"movie"} id={role.id} name={role.title} />
												</span>
												{role.character && (
													<span className='font-thin'> as {role.character}</span>
												)}
											</span>
										</>
									)}
									{role.name && (
										<>
											<span className='col-span-3 md:col-span-8'>
												<span className='text-lg font-bold'>
													<LinkHandler type={"tv"} id={role.id} name={role.name} />
												</span>
												{role.character && (
													<span className='font-thin'> as {role.character}</span>
												)}
											</span>
										</>
									)}
								</div>
							))}
					</div>
				</>
			) : (
				<div>{person.name}</div>
			)}
		</div>
	);
};
// a.first_air_date && b.first_air_date
// 	? a.first_air_date.localeCompare(b.first_air_date)
// 	: a.release_date && b.first_air_date
// 	? a.release_date.localeCompare(b.first_air_date)
// 	: a.first_air_date && b.release_date
// 	? a.first_air_date.localeCompare(b.release_date)
// 	: a.release_date && b.release_date
// 	? a.release_date.localeCompare(b.release_date)
// 	: null;
const Dropdown = ({ setFilter, filter }) => {
	return (
		<div className='group'>
			<div className='first-letter:uppercase'>{filter} &darr;</div>
			<div className='group m-1 hidden flex-col bg-slate-200 text-black group-hover:flex'>
				<button className='hover:text-sky-400' onClick={() => setFilter("all")}>
					All
				</button>
				<button className='hover:text-sky-400' onClick={() => setFilter("movie")}>
					Movies
				</button>
				<button className='hover:text-sky-400' onClick={() => setFilter("tv")}>
					Tv
				</button>
			</div>
		</div>
	);
};
