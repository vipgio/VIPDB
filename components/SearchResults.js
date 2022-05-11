import Image from "next/image";
import Link from "next/link";
import { LinkHandler } from "../HOC/LinkHandler";
import blankImage from "./nullPic.jpg";

const SearchResults = ({ data }) => {
	return (
		<div className='flex justify-center'>
			{data.results.length > 0 ? (
				<div className='mx-4 mb-4 grid w-full divide-y divide-slate-600 rounded-xl bg-slate-200 p-4 px-5'>
					{data.results.slice(0, 5).map((res) => (
						<div className='flex pt-2 text-slate-800' key={res.id}>
							<div className='mb-2 min-w-fit overflow-hidden rounded-md text-[0px]'>
								<LinkHandler
									type={res.media_type}
									id={res.id}
									name={res.name || res.title}
									component={
										<Image
											src={
												res.poster_path || res.profile_path
													? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${
															res.poster_path || res.profile_path
													  }`
													: blankImage
											}
											alt={res.name || res.title}
											width={94}
											height={141}
										/>
									}
								/>
							</div>
							<div className='px-2'>
								{res.media_type === "person" ? (
									<>
										<LinkHandler
											type={"person"}
											id={res.id}
											name={res.name}
											style='text-xl'
											component={res.name}
										/>

										<div>Actor</div>
									</>
								) : res.media_type === "movie" ? (
									<>
										<LinkHandler
											type={"movie"}
											id={res.id}
											name={res.title}
											style='text-xl'
											component={`${res.title} ${
												res.release_date ? `(${res.release_date.slice(0, 4)})` : ""
											}`}
										/>

										<div className='text-sm'>{res.overview}</div>
										<div className='text-blue-600'>
											{res.vote_average} / 10 FROM {res.vote_count} VOTES
										</div>
									</>
								) : (
									<>
										<LinkHandler
											type={"tv"}
											id={res.id}
											name={res.name}
											style='text-xl'
											component={`${res.name} ${
												res.first_air_date ? `(${res.first_air_date.slice(0, 4)}-)` : ""
											}`}
										/>
										<div className='text-sm'>{res.overview}</div>
										<div className='text-blue-600'>
											{res.vote_average} / 10 FROM {res.vote_count} VOTES
										</div>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<>No results found</>
			)}
		</div>
	);
};

export default SearchResults;
