export default async function handler({ query: { query } }, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_KEY}&query=${query}`
	);
	const searchResult = await data.json();

	res.status(200).json(searchResult);
}
