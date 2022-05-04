export default async function handler({ query: { id } }, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=combined_credits`
	);
	const person = await data.json();

	res.status(200).json(person);
}
