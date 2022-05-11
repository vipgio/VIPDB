import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Bookmark from "../../../components/Bookmark";
import CastSlider from "../../../HOC/CastSlider";
import Meta from "../../../components/Meta";
import Overview from "../../../components/Overview";
import StarRating from "../../../components/StarRating";
import Banner from "../../../HOC/Banner";
import BigPoster from "../../../HOC/BigPoster";
import NotFound from "../../404";
import Trailer from "../../../HOC/Trailer";
import SkeletonTitles from "../../../components/SkeletonTitles";
import { TitleContext } from "../../../context/TitleContext";
import { UserContext } from "../../../context/UserContext";
import { server } from "../../../HOC/config";
const axios = require("axios").default;

const Movie = ({ trend }) => {
	const { currentUser } = useContext(UserContext);

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const { currentTitle, setCurrentTitle } = useContext(TitleContext);
	const query = router.query;
	// console.log(trend);
	useEffect(async () => {
		if (query.id) {
			if (String(currentTitle.id) === query.id.slice(0, query.id.search(/[-]/g))) {
				setIsLoading(false);
			} else {
				const options = {
					method: "GET",
					url: `/api/movie/${
						query.id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
							? query.id
							: query.id.slice(0, query.id.search(/[-]/g))
					}`,
				};
				try {
					const data = await axios.request(options);
					setCurrentTitle(data.data);
					// console.log(data.data);
				} catch (error) {
					console.log(error);
					setIs404(true);
				}
				setIsLoading(false);
			}
		}
	}, [query]);

	return isLoading ? (
		<SkeletonTitles /> //loading template here
	) : !is404 ? (
		<>
			<Meta
				title={`${currentTitle.title} ${
					currentTitle.release_date && `(${currentTitle.release_date.slice(0, 4)})`
				} | VIPDB`}
			/>

			<Banner path={currentTitle.backdrop_path} />

			<div className='mt-1 flex flex-col pt-2 sm:flex-row'>
				<div className='flex flex-col items-center'>
					<BigPoster path={currentTitle.poster_path} titleName={currentTitle.title} />

					{currentUser ? (
						<Bookmark currentTitle={currentTitle} />
					) : (
						<div>login to review</div>
					)}
				</div>
				<section className='w-full sm:w-3/4 sm:pl-6'>
					<Overview currentTitle={currentTitle} /> {/*title, runtime, release, overview*/}
					{trend.title}
					<div>
						{currentTitle.videos.results.filter(
							(video) => video.official && video.type === "Trailer"
						).length > 0 && (
							<Trailer
								trailer={
									currentTitle.videos.results.filter(
										(video) => video.official && video.type === "Trailer"
										// &&
										// (video.name === "Official Trailer" ||
										// 	video.name === "Main Trailer")
									)[0]
								}
								key={
									currentTitle.videos.results.filter(
										(video) => video.official && video.type === "Trailer"
										// &&
										// (video.name === "Official Trailer" ||
										// 	video.name === "Main Trailer")
									)[0].id
								}
							/>
						)}
					</div>
				</section>
				{/* <div className='bg-slate-600'>
					<StarRating />
				</div> */}
			</div>
			<CastSlider cast={currentTitle.credits.cast} />
			{/* {is404 && <DefaultErrorPage statusCode={404} />} */}
		</>
	) : (
		<>
			<Meta robots='noindex' />
			<NotFound />
		</>
	);
};

export default Movie;

export async function getStaticPaths() {
	const res = await fetch(`${server}/api/trending`);
	const trends = await res.json();
	console.log(trends);
	const paths = trends.results.map((trend) => ({
		params: { id: trend.id.toString() },
	}));

	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	const res = await fetch(`${server}/api/movie/${params.id}`);
	const trend = await res.json();

	return { props: { trend } };
}
