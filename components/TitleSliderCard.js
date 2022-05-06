import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import blankImage from "./nullPic.jpg";
const TitleSliderCard = ({ item, type }) => {
	const [tvDetails, setTvDetails] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	useEffect(async () => {
		if (type === "tv") {
			setIsFetching(true);
			const data = await fetch(
				`https://api.themoviedb.org/3/tv/${item.id}?api_key=${process.env.TMDB_KEY}`
			);
			const show = await data.json();
			// console.log(show);
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
		<li className='relative mx-4 flex w-60 min-w-[150px] max-w-[150px] snap-center flex-col overflow-hidden rounded-md shadow-lg'>
			<div className='text-[0]'>
				<Link
					href={`/${type === "movie" ? "movie" : "tv"}/${item.id}-${`${
						type === "movie" ? item.title : item.name
					}`
						.toLowerCase()
						.replace(/[ ]/g, "-")
						.replace(/[,:;'.]/g, "")}`}
				>
					<a>
						<Image
							src={
								item.poster_path
									? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
									: blankImage
							}
							width={600}
							height={900}
							placeholder='blur'
							blurDataURL={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path}`}
						/>
					</a>
				</Link>
			</div>
			<div className='mx-1 max-h-80 overflow-auto p-1'>
				{type === "movie" ? (
					<Link
						href={`/movie/${item.id}-${item.title
							.toLowerCase()
							.replace(/[ ]/g, "-")
							.replace(/[,:;'.]/g, "")}`}
					>
						<a className='group'>
							<span className='font-bold text-slate-200 group-hover:text-sky-400'>
								{item.title}{" "}
							</span>
							{item.release_date && (
								<span className='text-slate-300 group-hover:text-sky-400'>
									({item.release_date.slice(0, 4)})
								</span>
							)}
						</a>
					</Link>
				) : (
					<Link
						href={`/tv/${item.id}-${item.name
							.toLowerCase()
							.replace(/[ ]/g, "-")
							.replace(/[,:;'.]/g, "")}`}
					>
						<a className='group'>
							<span className='font-bold group-hover:text-sky-400'>{item.name} </span>
							<span className='text-slate-300 group-hover:text-sky-400'>
								{isFetching
									? `(${item.first_air_date.slice(0, 4)}-)`
									: tvDetails.dateFormat}
							</span>
						</a>
					</Link>
				)}
			</div>
		</li>
	);
};

export default TitleSliderCard;
