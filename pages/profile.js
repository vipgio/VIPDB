import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import Meta from "../components/Meta";
import Link from "next/link";
import Bookmark from "../components/Bookmark";
export default function Profile() {
	const { currentUser, isLoading } = useContext(UserContext);
	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<Meta title='Profile | VIPDB' />
			{currentUser && (
				<div className='m-2 flex flex-col'>
					<div className='border p-2'>
						<p>Movies watched: {currentUser.user_metadata.seen.length}</p>
						<p>Movies added to watchlist: {currentUser.user_metadata.watchlist.length}</p>
					</div>
					{/* <div className='loading-spinner'></div> */}
					{/* <div className='h-8 w-8 animate-spin rounded-full border-4 border-white border-t-gray-500'></div> */}
					<div>
						<h1 className='text-3xl font-bold'>Watchlist</h1>
						<div className='grid grid-cols-3 sm:grid-cols-5'>
							{currentUser.user_metadata.watchlist
								.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
								.map((movie) => (
									<div key={movie.id} className='m-2 overflow-hidden rounded-md lg:m-5'>
										<div className='group relative text-[0]'>
											<div className='absolute bottom-0 z-10 hidden h-[13%] w-full items-center bg-slate-500 bg-opacity-80 group-hover:flex'>
												<Bookmark currentTitle={movie} />
											</div>
											<Link
												href={`/${movie.type}/${movie.id}-${`${movie.title}`
													.toLowerCase()
													.replace(/[ ]/g, "-")
													.replace(/[,:;']/g, "")}`}
											>
												<a>
													<Image
														width={600}
														height={900}
														quality={80}
														placeholder='blur'
														src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
														blurDataURL={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`}
													/>
												</a>
											</Link>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
