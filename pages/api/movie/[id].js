export default async function handler({ query: { id } }, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
	);
	const movie = await data.json();
	console.log(movie);

	res.status(200).json(movie);
}
