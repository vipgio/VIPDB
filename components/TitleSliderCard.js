import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LinkHandler } from "../HOC/LinkHandler";
import blankImage from "./nullPic.jpg";
const TitleSliderCard = ({ item, type }) => {
	const [tvDetails, setTvDetails] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			if (type === "tv") {
				setIsFetching(true);
				const data = await fetch(`/api/tv/${item.id}`);
				const show = await data.json();
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
		};
		fetchData();
	}, []);
	return (
		<li className='relative mx-4 flex w-60 min-w-[150px] max-w-[150px] snap-center flex-col overflow-hidden rounded-md shadow-lg'>
			<div className='text-[0]'>
				<LinkHandler
					type={type}
					id={item.id}
					name={item.title || item.name}
					component={
						<Image
							src={
								item.poster_path
									? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}`
									: blankImage
							}
							width={600}
							height={900}
							placeholder='blur'
							blurDataURL={
								item.poster_path
									? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path}`
									: blankImage
							}
							alt={item.title || item.name}
						/>
					}
				/>
			</div>
			<div className='mx-1 max-h-80 overflow-auto p-1'>
				{type === "movie" ? (
					<LinkHandler
						type='movie'
						id={item.id}
						name={item.title}
						component={
							<>
								<span className='font-bold text-slate-200 group-hover:text-sky-400'>
									{item.title}{" "}
								</span>
								{item.release_date && (
									<span className='text-slate-300 group-hover:text-sky-400'>
										({item.release_date.slice(0, 4)})
									</span>
								)}
							</>
						}
						style='group'
					/>
				) : (
					<LinkHandler
						type='tv'
						id={item.id}
						name={item.name}
						component={
							<>
								<span className='font-bold group-hover:text-sky-400'>{item.name} </span>
								<span className='text-slate-300 group-hover:text-sky-400'>
									{isFetching
										? `(${item.first_air_date.slice(0, 4)}-)`
										: tvDetails.dateFormat}
								</span>
							</>
						}
						style='group'
					/>
				)}
			</div>
		</li>
	);
};

export default TitleSliderCard;
