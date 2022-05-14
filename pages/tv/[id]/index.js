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
import { UserContext } from "../../../context/UserContext";
import { server } from "../../../HOC/config";
const axios = require("axios").default;

const Show = ({ show }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const { currentUser } = useContext(UserContext);
	const { currentTitle, setCurrentTitle } = useContext(TitleContext);
	const query = router.query;

	useEffect(() => {
		if (router.isFallback) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
			show.success === false && setIs404(true);
			show && setCurrentTitle(show);
		}
	}, [router]);

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
							? `(${currentTitle.first_air_date.slice(
									0,
									4
							  )}-${currentTitle.last_air_date.slice(0, 4)})`
							: `(${currentTitle.first_air_date.slice(0, 4)}-)`
						: `(${currentTitle.first_air_date.slice(0, 4)})`
				} | VIPDB`}
			/>
			<Banner path={currentTitle.backdrop_path} />

			<div className='mt-1 flex flex-col pt-2 sm:flex-row'>
				<div className='flex flex-col items-center'>
					<BigPoster path={currentTitle.poster_path} />
					{currentUser ? (
						<Bookmark currentTitle={currentTitle} />
					) : (
						<div>login to review</div>
					)}
				</div>
				<section className='w-full sm:w-3/4 sm:pl-6'>
					<Overview currentTitle={currentTitle} /> {/*title, runtime, release, overview*/}
					<div></div>
				</section>
			</div>
			<CastSlider cast={currentTitle.aggregate_credits.cast} />
			{/* <StarRating /> */}
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

export async function getStaticPaths() {
	const res = await fetch(`${server}/api/trending`);
	const trends = await res.json();

	const paths = trends.results.map((trend) => ({
		params: {
			id: `${trend.id}-${
				trend.name &&
				trend.name
					.toLowerCase()
					.replace(/[ ]/g, "-")
					.replace(/[,:;'.]/g, "")
			}`,
		},
	}));

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const res = await fetch(`${server}/api/tv/${params.id}`);
	const show = await res.json();

	return {
		props: {
			show,
		},
		revalidate: 100,
	};
}
