import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Bookmark from "../../../components/Bookmark";
import CastSlider from "../../../HOC/CastSlider";
import Meta from "../../../components/Meta";
import Overview from "../../../components/Overview";
import StarRating from "../../../components/StarRating";
import { TitleContext } from "../../../context/TitleContext";
import Banner from "../../../HOC/Banner";
import BigPoster from "../../../HOC/BigPoster";
import NotFound from "../../404";

const axios = require("axios").default;

const Show = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const [userStuff, setUserStuff] = useState({
		like: true,
		watch: false,
		watchlist: false,
	});
	const { currentTitle, setCurrentTitle } = useContext(TitleContext);
	const query = router.query;

	useEffect(async () => {
		if (query.id) {
			if (String(currentTitle.id) === query.id.slice(0, query.id.search(/[-]/g))) {
				setIsLoading(false);
			} else {
				const options = {
					method: "GET",
					url: `https://api.themoviedb.org/3/tv/${
						query.id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
							? query.id
							: query.id.slice(0, query.id.search(/[-]/g))
					}?api_key=${
						process.env.TMDB_KEY
					}&append_to_response=aggregate_credits,release_dates`,
				};
				try {
					const data = await axios.request(options);
					setCurrentTitle(data.data);
					console.log(data.data);
				} catch (error) {
					console.log(error);
					setIs404(true);
				}
				setIsLoading(false);
			}
		}
	}, [query]);
	return isLoading ? (
		"loading" //loading template here
	) : !is404 ? (
		<>
			<Meta
				title={`${currentTitle.name} ${
					currentTitle.last_air_date
						? currentTitle.first_air_date.slice(0, 4) ===
						  currentTitle.last_air_date.slice(0, 4)
							? `(${currentTitle.first_air_date.slice(0, 4)})`
							: currentTitle.status === "Ended"
							? `(${currentTitle.first_air_date.slice(0, 4)}-${title.last_air_date.slice(
									0,
									4
							  )})`
							: `(${currentTitle.first_air_date.slice(0, 4)}-)`
						: `(${currentTitle.first_air_date.slice(0, 4)})`
				} | VIPDB`}
			/>
			<Banner path={currentTitle.backdrop_path} />

			<div className='mt-1 flex flex-col pt-2 sm:flex-row'>
				<div className='flex flex-col items-center'>
					<BigPoster path={currentTitle.poster_path} />
					{/* {user ? <Bookmark /> : <div>login to rate</div>} */}
				</div>
				<section className='w-full sm:w-3/4 sm:pl-6'>
					<Overview currentTitle={currentTitle} /> {/*title, runtime, release, overview*/}
					<div></div>
				</section>
			</div>
			<CastSlider cast={currentTitle.aggregate_credits.cast} />
			<StarRating />
			{/* {is404 && <DefaultErrorPage statusCode={404} />} */}
		</>
	) : (
		<>
			<Meta robots='noindex' />
			<NotFound />
		</>
	);
};

export default Show;
