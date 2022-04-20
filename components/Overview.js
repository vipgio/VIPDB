import Link from "next/link";
import { useEffect } from "react";
import DetailsBox from "./DetailsBox";
const Overview = ({ currentTitle }) => {
	return (
		<>
			{currentTitle.title ? (
				<div>
					<h1>
						<span className='text-5xl'>{currentTitle.title} </span>
						<span className='text-3xl text-slate-300'>
							({currentTitle.release_date.slice(0, 4)})
						</span>
					</h1>
					<div className='flex'>
						{currentTitle.genres.map((genre, index) => (
							<span className='mr-1' key={genre.id}>
								<>
									{
										<Link
											href={`/movies/genre/${genre.name
												.toLowerCase()
												.replace(/[ ]/g, "-")}`}
										>
											<a className='link'>{genre.name}</a>
										</Link>
									}
									{index === currentTitle.genres.length - 1 ? "" : ", "}
								</>
							</span>
						))}
						{currentTitle.runtime > 0 && (
							<>
								<span className='ml-3'>&#8226;</span>
								<span className='ml-4'>
									{(currentTitle.runtime / 60).toFixed(0)}h {currentTitle.runtime % 60}m
								</span>
							</>
						)}
					</div>
					<div className='flex flex-col lg:flex-row'>
						<div>
							<p className='my-2 italic text-slate-300'>{currentTitle.tagline}</p>
							<h3 className='text-xl font-bold'>Overview</h3>
							<p className='text-md text-slate-200'>{currentTitle.overview}</p>
							<h2 className='mt-5 text-slate-300'>
								Directed by:{" "}
								{currentTitle.credits.crew
									.filter((person) => person.job === "Director")
									.map((director, index) => (
										<span key={director.id}>
											{index === 0 ? "" : ", "}
											{
												<Link
													href={`/person/${director.id}-${director.name
														.toLowerCase()
														.replace(/[ ]/g, "-")}`}
												>
													<a className='link'>{director.name}</a>
												</Link>
											}
										</span>
									))}
							</h2>
						</div>
						{/* <DetailsBox /> */}
					</div>
				</div>
			) : (
				<div>
					<h1>
						<span className='text-5xl'>{currentTitle.name} </span>
						<span className='text-3xl text-slate-300'>
							{currentTitle.last_air_date
								? currentTitle.first_air_date.slice(0, 4) ===
								  currentTitle.last_air_date.slice(0, 4)
									? `(${currentTitle.first_air_date.slice(0, 4)})`
									: currentTitle.status === "Ended"
									? `(${currentTitle.first_air_date.slice(
											0,
											4
									  )}-${currentTitle.last_air_date.slice(0, 4)})`
									: `(${currentTitle.first_air_date.slice(0, 4)}-)`
								: `(${currentTitle.first_air_date.slice(0, 4)})`}
						</span>
					</h1>
					<div className='flex'>
						{currentTitle.genres.map((genre, index) => (
							<span className='mr-1' key={genre.id}>
								<>
									{
										<Link
											href={`/tv/genre/${genre.id}-${genre.name
												.toLowerCase()
												.replace(" & ", "-")}`}
										>
											<a className='hover:text-sky-400'>{genre.name}</a>
										</Link>
									}
									{index === currentTitle.genres.length - 1 ? "" : ", "}
								</>
							</span>
						))}
						<span className='ml-3'>&#8226;</span>
						<span className='ml-4'>
							{Math.floor(currentTitle.episode_run_time[0] / 60).toFixed(0) > 0 &&
								`${(currentTitle.episode_run_time[0] / 60).toFixed(0)}h`}
							{currentTitle.episode_run_time[0] % 60 > 0 &&
								`${currentTitle.episode_run_time[0] % 60}m`}
						</span>
					</div>
					<h3 className='my-2 italic text-slate-300'>{currentTitle.tagline}</h3>
					<h3 className='text-xl font-bold'>Overview</h3>
					<p className='text-md text-slate-200'>{currentTitle.overview}</p>
					{currentTitle.created_by[0] && (
						<h2 className='mt-5 text-slate-200'>
							Created by:{" "}
							{currentTitle.created_by.map((director, index) => (
								<span key={director.id}>
									{index === 0 ? "" : ", "}
									{
										<Link
											href={`/person/${director.id}-${director.name
												.toLowerCase()
												.replace(/[ ]/g, "-")}`}
										>
											<a className='hover:text-sky-400'>{director.name}</a>
										</Link>
									}
								</span>
							))}
						</h2>
					)}
				</div>
			)}
		</>
	);
};

export default Overview;