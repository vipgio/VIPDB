import Image from "next/image";
import Link from "next/link";
import blankImage from "./nullPic.jpg";

export const NavbarSearchResults = ({ data }) => {
	return (
		<div className='flex justify-center'>
			<div className='grid w-full rounded-xl bg-slate-200 p-4 px-5'>
				{data.results.slice(0, 5).map((res) => (
					<div
						className='flex border-b border-slate-600 pt-2 text-slate-800'
						key={res.id}
					>
						<div className='min-w-fit'>
							<Link
								href={`/${res.media_type}/${res.id}-${
									res.name
										? res.name
												.toLowerCase()
												.replace(/[ ]/g, "-")
												.replace(/[,:;'.]/g, "")
										: res.title
												.toLowerCase()
												.replace(/[ ]/g, "-")
												.replace(/[,:;'.]/g, "")
								}`}
							>
								<a>
									<Image
										src={
											res.poster_path || res.profile_path
												? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${
														res.poster_path ? res.poster_path : res.profile_path
												  }`
												: blankImage
										}
										alt={res.name ? res.name : res.title}
										width={94 / 1.5}
										height={141 / 1.5}
									/>
								</a>
							</Link>
						</div>
						<div className='px-2'>
							{/*name link*/}
							{res.media_type === "person" ? (
								<>
									<Link
										href={`/person/${res.id}-${res.name
											.toLowerCase()
											.replace(/[ ]/g, "-")
											.replace(/[,:;'.]/g, "")}`}
									>
										<a className='hover:text-sky-400'>
											<div>{res.name}</div>
										</a>
									</Link>
									<div>Actor</div>
								</>
							) : res.media_type === "movie" ? (
								<>
									<Link
										href={`/movie/${res.id}-${res.title
											.toLowerCase()
											.replace(/[ ]/g, "-")
											.replace(/[,:;'.]/g, "")}`}
									>
										<a className='hover:text-sky-400'>
											{res.title}{" "}
											{res.release_date && `(${res.release_date.slice(0, 4)})`}
										</a>
									</Link>
									<div className='pt-2 text-blue-600'>
										{res.vote_average} / 10 FROM {res.vote_count} VOTES
									</div>
								</>
							) : (
								//type = tv
								<>
									<Link
										href={`/tv/${res.id}-${res.name
											.toLowerCase()
											.replace(/[ ]/g, "-")
											.replace(/[,:;'.]/g, "")}`}
									>
										<a className='hover:text-sky-400'>
											{res.name}{" "}
											{res.first_air_date && `(${res.first_air_date.slice(0, 4)}-)`}
										</a>
									</Link>
									<div className='text-blue-600'>
										{res.vote_average} / 10 FROM {res.vote_count} VOTES
									</div>
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
