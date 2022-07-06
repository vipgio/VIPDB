export default async function handler(req, res) {
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}`
	);
	const popular = await data.json();

	res.status(200).json(popular);
}
