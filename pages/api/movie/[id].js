export default async function handler({ query: { id } }, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=credits,release_dates,videos`
	);
	const movie = await data.json();

	res.status(200).json(movie);
}
