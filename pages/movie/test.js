import Head from "next/head";
const axios = require("axios").default;

export async function getServerSideProps() {
  const movieID = 550;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.TMDB_KEY}`
  );
  const data = await res.json();

  return {
    props: { movie: data },
  };
}
const Movie = ({ movie }) => {
  console.log(movie);

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div>
        <p>ID: {movie.id}</p>
      </div>

      <img
        src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
      />
      <img
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
      />
    </>
  );
};

export default Movie;
