import { useState } from "react";
import { LinkHandler } from "../HOC/LinkHandler";

export const PersonTitlesList = ({ person }) => {
	const [filter, setFilter] = useState("all");
	return (
		<div className='relative'>
			{person.known_for_department === "Acting" ? (
				<ActorList props={{ filter, setFilter, person }} />
			) : (
				<CrewList props={{ filter, setFilter, person }} />
			)}
		</div>
	);
};

const Dropdown = ({ setFilter, filter, options }) => {
	return (
		<div className='group'>
			<div className='cursor-pointer first-letter:uppercase hover:font-semibold hover:text-white'>
				{filter} &darr;
			</div>
			<div className='group m-1 hidden flex-col divide-y divide-slate-200 overflow-hidden rounded-md border group-hover:flex'>
				{options.map((option) => (
					<div
						className='cursor-pointer bg-slate-800 first-letter:uppercase hover:bg-slate-300 hover:text-sky-600'
						onClick={() => setFilter(option)}
						key={option}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	);
};

const ActorList = ({ props }) => {
	return (
		<>
			<div className='absolute right-0 w-24 text-center'>
				<Dropdown
					setFilter={props.setFilter}
					filter={props.filter}
					options={["all", "movie", "tv"]}
				/>
			</div>
			<h2 className='mb-2 text-2xl font-semibold'>Acting</h2>
			<div className='mb-2 divide-y border border-slate-300 shadow-lg'>
				{props.person.combined_credits.cast
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
					.filter((item) => {
						if (props.filter === "all") return true;
						if (props.filter === "movie" && item.title) return true;
						if (props.filter === "tv" && item.name) return true;
					})
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
											<span className='font-thin text-slate-400'>
												{" "}
												as <span className='text-slate-300'>{role.character}</span>
											</span>
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
											<span className='font-thin text-slate-400'>
												{role.episode_count > 0 && (
													<>
														{" "}
														{role.episode_count}{" "}
														{`${role.episode_count === 1 ? "Episode" : "Episodes"}`}
													</>
												)}{" "}
												as <span className='text-slate-300'>{role.character}</span>
											</span>
										)}
									</span>
								</>
							)}
						</div>
					))}
			</div>
		</>
	);
};

const CrewList = ({ props }) => {
	return (
		<>
			<div className='absolute right-0 w-24 text-center'>
				<Dropdown
					setFilter={props.setFilter}
					filter={props.filter}
					options={[
						"all",
						...props.person.combined_credits.crew
							.filter((value, index, self) => {
								return self.findIndex((v) => v.department === value.department) === index;
							})
							.map((crew) => crew.department),
					]}
				/>
			</div>

			<h2 className='mb-2 text-2xl font-semibold first-letter:uppercase'>
				{props.filter}
			</h2>
			<div className='mb-2 divide-y border border-slate-300 shadow-lg'>
				{props.person.combined_credits.crew
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
					.filter((item) => {
						if (props.filter === "all") return true;
						else return item.department === props.filter;
					})
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
										{role.job && <span className='font-thin'> ...{role.job}</span>}
									</span>
								</>
							)}
							{role.name && (
								<>
									<span className='col-span-3 md:col-span-8'>
										<span className='text-lg font-bold'>
											<LinkHandler type={"tv"} id={role.id} name={role.name} />
										</span>
										{role.job && <span className='font-thin'> ...{role.job}</span>}
									</span>
								</>
							)}
						</div>
					))}
			</div>
		</>
	);
};
