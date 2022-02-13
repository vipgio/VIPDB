import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TVIcon from "./TVIcon";

const MovieSliderCard = ({ item, type }) => {
	const [tvDetails, setTvDetails] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	useEffect(async () => {
		if (type === "tv") {
			setIsFetching(true);
			const data = await fetch(
				`https://api.themoviedb.org/3/tv/${item.id}?api_key=${process.env.TMDB_KEY}`
			);
			const show = await data.json();
			console.log(show);
			setTvDetails({
				dateFormat: show.last_air_date
					? show.first_air_date.slice(0, 4) === show.last_air_date.slice(0, 4)
						? `(${show.first_air_date.slice(0, 4)})`
						: show.status === "Ended"
						? `(${show.first_air_date.slice(0, 4)}-${show.last_air_date.slice(0, 4)})`
						: `(${show.first_air_date.slice(0, 4)}-)`
					: `(${show.first_air_date.slice(0, 4)})`,
			});
			setIsFetching(false);
		}
	}, []);
	return (
		<div className='relative mx-4 flex w-60 min-w-[150px] snap-center flex-col overflow-hidden rounded-md shadow-[0_10px_35px_-20px_rgba(0,0,0,0.3)] shadow-gray-500'>
			<div className='text-[0]'>
				<Link
					href={`/${type === "movie" ? "movie" : "tv"}/${item.id}-${`${
						type === "movie" ? item.title : item.name
					}`
						.toLowerCase()
						.replace(/[ ]/g, "-")}`}
				>
					<a>
						<Image
							src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
							// src={`https://www.themoviedb.org/t/p/original${movieData.poster_path}`}
							width={600}
							height={900}
							// quality={100}
							// sizes='1000px'
							placeholder='blur'
							blurDataURL={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path}`}
							// layout='fill'
						/>
					</a>
				</Link>
			</div>
			<div className='mx-1 max-h-20 overflow-auto p-1'>
				{type === "movie" ? (
					<Link
						href={`/movie/${item.id}-${item.title.toLowerCase().replace(/[ ]/g, "-")}`}
					>
						<a className='group hover:text-white'>
							<span className='font-bold text-gray-300 group-hover:text-white'>
								{item.title}{" "}
							</span>
							<span className='text-gray-400 group-hover:text-white'>
								({item.release_date.slice(0, 4)})
							</span>
						</a>
					</Link>
				) : (
					<Link href={`/tv/${item.id}-${item.name.toLowerCase().replace(/[ ]/g, "-")}`}>
						<a className='group hover:text-indigo-600'>
							<span className='font-bold'>{item.name} </span>
							<span className='text-gray-300 group-hover:text-indigo-600'>
								{isFetching
									? `(${item.first_air_date.slice(0, 4)}-)`
									: tvDetails.dateFormat}
							</span>
						</a>
					</Link>
				)}
			</div>
			{/* {type === "movie" ? <></> : <TVIcon />} */}
		</div>
	);
};

export default MovieSliderCard;
