import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LinkHandler } from "../HOC/LinkHandler";
import blankImage from "./nullPic.jpg";

export const NavbarSearchResults = ({ props }) => {
	return (
		<div className='flex justify-center'>
			{props.isSearching ? (
				<div className='flex h-16 w-[250px] items-center justify-center rounded-xl bg-slate-200'>
					<div className='h-7 w-7 animate-spin rounded-full border-4 border-gray-500 border-t-white'></div>
				</div>
			) : props.searchRes.results.length > 0 ? (
				<div className='grid w-full max-w-[250px] divide-y divide-slate-600 rounded-xl bg-slate-200 p-4 px-5'>
					{props.searchRes.results.slice(0, 5).map((res) => (
						<div className='flex pt-2 text-slate-800' key={res.id}>
							<div className='min-w-fit'>
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
											width={94 / 1.75}
											height={141 / 1.75}
										/>
									}
								/>
							</div>
							<div className='px-2'>
								{/*name link*/}
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

										<div className='pt-2 text-blue-600'>
											{res.vote_average} / 10 FROM {res.vote_count} VOTES
										</div>
									</>
								) : (
									//type = tv
									<>
										<LinkHandler
											type={"tv"}
											id={res.id}
											name={res.name}
											style='text-xl'
											component={`${res.name} ${
												res.first_air_date ? `(${res.first_air_date.slice(0, 4)})` : ""
											}`}
										/>

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
				<div className='flex h-16 w-[250px] items-center justify-center rounded-xl bg-slate-200 font-semibold text-slate-800'>
					No results found
				</div>
			)}
		</div>
	);
};
