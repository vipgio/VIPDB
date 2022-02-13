import Image from "next/image";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import CastSlider from "../../../components/CastSlider";
import Bookmark from "../../../components/Bookmark";
import { useUser } from "@auth0/nextjs-auth0";
import Meta from "../../../components/Meta";
import Head from "next/head";
import NotFound from "../../404";

const axios = require("axios").default;

const Movie = () => {
	const { user } = useUser();
	const router = useRouter();
	const [movieData, setMovieData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const [userStuff, setUserStuff] = useState({
		like: true,
		watch: false,
		watchlist: false,
	});
	const query = router.query;

	useEffect(async () => {
		if (query.id) {
			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/movie/${
					query.id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
						? query.id
						: query.id.slice(0, query.id.search(/[-]/g))
				}?api_key=${process.env.TMDB_KEY}&append_to_response=credits`,
			};
			try {
				const data = await axios.request(options);
				setMovieData(data.data);
				// console.log(data.data);
			} catch (error) {
				console.log(error);
				setIs404(true);
			}
			setIsLoading(false);
		}
	}, [query]);
	// useEffect(() => {
	// 	if (isLoading === false)
	// 		// console.log(movieData);
	// 		console.log(movieData.credits.crew.filter((person) => person.job === "Director"));
	// 	    setDirector(movieData.credits.crew.filter((person) => person.job === "Director"));
	// }, [movieData]);
	return isLoading ? (
		"loading" //loading template here
	) : !is404 ? (
		<>
			<Meta
				title={`${movieData.title} (${movieData.release_date.slice(0, 4)}) | VIPDB`}
			/>

			{/* <div className='hidden md:block'> */}
			<div className='fixed left-0 -z-10 hidden w-screen justify-center md:flex'>
				<div className='fixed top-0 -z-10 -ml-2 w-fit max-w-screen-2xl opacity-70'>
					<Image
						src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
						width={1920}
						height={900}
					/>
				</div>
				<div className='banner fixed top-0 -z-20 -ml-2 w-fit max-w-screen-2xl opacity-70'>
					<Image
						src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path}`}
						width={1920}
						height={900}
					/>
				</div>
			</div>

			<div className='flex flex-col pt-2 sm:flex-row'>
				<div className='flex flex-col items-center'>
					<div className='m-3 h-[450px] w-[300px] overflow-hidden rounded-md border border-white text-[0] sm:h-fit sm:w-80'>
						<Image
							src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
							// src={`https://www.themoviedb.org/t/p/original${movieData.poster_path}`}
							width={1200}
							height={1800}
							quality={100}
							// sizes='1000px'
							placeholder='blur'
							blurDataURL={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${movieData.poster_path}`}
							// layout='fill'
						/>
					</div>

					{user ? <Bookmark /> : <div>login to rate</div>}
				</div>
				<div className='m-3 w-full sm:w-3/4 sm:pl-6'>
					<h1 className='text-5xl'>
						{movieData.title} ({movieData.release_date.slice(0, 4)})
					</h1>
					<h2 className='my-2'>
						Directed by:{" "}
						{movieData.credits.crew
							.filter((person) => person.job === "Director")
							.map((director, index) => (
								<Link href={`/person/${director.id}`} key={index}>
									{index ? (
										<a className='text-indigo-600'>, {director.name}</a>
									) : (
										<a className='text-indigo-600'>{director.name}</a>
									)}
								</Link>
							))}
					</h2>
					<p className='text-xl'>{movieData.overview}</p>
				</div>
			</div>
			<CastSlider cast={movieData.credits.cast} movieId={movieData.id} />
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
