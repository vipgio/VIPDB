import Head from "next/head";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import CastSlider from "../components/CastSlider";
const axios = require("axios").default;

const Movie = () => {
	const router = useRouter();
	const [movieData, setMovieData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const [director, setDirector] = useState();
	// const query = router.query;
	const { id } = router.query;

	useEffect(() => {
		if (!id) {
			return;
		}
		const fetchMovie = async () => {
			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/movie/${
					id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
						? id
						: id.slice(0, id.search(/[-]/g))
				}?api_key=${process.env.TMDB_KEY}&append_to_response=credits`,
			};
			try {
				const data = await axios.request(options);
				setMovieData(data.data);
				console.log(data.data);
			} catch (error) {
				console.log(error);
				setIs404(true);
			}
			setIsLoading(false);
		};
		fetchMovie();
	}, [id]);
	// useEffect(() => {
	// 	if (isLoading === false)
	// 		// console.log(movieData);
	// 		console.log(movieData.credits.crew.filter((person) => person.job === "Director"));
	// 	    setDirector(movieData.credits.crew.filter((person) => person.job === "Director"));
	// }, [movieData]);
	return (
		<>
			{isLoading ? (
				"loading"
			) : (
				<>
					<Head>
						<title>
							{movieData.title} ({movieData.release_date.slice(0, 4)})
						</title>
					</Head>

					<div className='relative hidden md:block'>
						<div className='fixed top-0 left-0 -z-10 opacity-70'>
							<Image
								src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
								width={1920}
								height={900}
							/>
						</div>
						<div className='fixed left-0 top-0 -z-20 opacity-10'>
							<Image
								src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path}`}
								width={1920}
								height={900}
							/>
						</div>
					</div>

					<div className='container flex flex-col pt-2 sm:flex-row'>
						<div className='m-3 h-[450px] w-[300px] overflow-hidden rounded-md border border-white sm:h-fit sm:w-80'>
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
												<a className='text-pink-400'>, {director.name}</a>
											) : (
												<a className='text-pink-400'>{director.name}</a>
											)}
										</Link>
									))}
							</h2>
							<p className='text-xl'>{movieData.overview}</p>
						</div>
					</div>
					<CastSlider cast={movieData.credits.cast} movieId={movieData.id} />
				</>
			)}
			{is404 && <DefaultErrorPage statusCode={404} />}
		</>
	);
};

export default Movie;
