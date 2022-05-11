export default async function handler(req, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_KEY}`
	);
	const trends = await data.json();

	res.status(200).json(trends);
}
