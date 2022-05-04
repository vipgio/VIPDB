export default async function handler({ query: { id } }, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=aggregate_credits,release_dates,videos`
	);
	const tv = await data.json();

	res.status(200).json(tv);
}
