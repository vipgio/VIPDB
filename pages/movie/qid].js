import Head from "next/head";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
const axios = require("axios").default;

const Movie = () => {
  const router = useRouter();
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [is404, setIs404] = useState(false);
  const [director, setDirector] = useState();
  const query = router.query;

  useEffect(async () => {
    if (query.id) {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=credits`,
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
  useEffect(() => {
    console.log(
      movieData.credits.crew.filter((person) => person.job === "Director")
    );
    setDirector(
      movieData.credits.crew.filter((person) => person.job === "Director")
    );
  }, [movieData]);
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

          <div className="relative">
            {/* <div className='fixed top-0 z-1 bg-gray-700 opacity-70'></div> */}
            <div className="fixed top-0 -z-10 opacity-10">
              <Image
                src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path}`}
                width={1920}
                height={800}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-80 overflow-hidden rounded-xl border border-white">
              <Image
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieData.poster_path}`}
                width={300}
                height={450}
                layout="responsive"
              />
            </div>
            <div className="w-3/4 pl-6">
              <h1 className="text-5xl">
                {movieData.title} ({movieData.release_date.slice(0, 4)})
              </h1>
              <h2>
                Directed by:
                <Link href={`/person/${director[0].id}`}>
                  <a className="text-red-500">{director[0].name}</a>
                </Link>
              </h2>
              <p className="text-xl">{movieData.overview}</p>
            </div>
          </div>
        </>
      )}
      {is404 && <DefaultErrorPage statusCode={404} />}
    </>
  );
};

export default Movie;
