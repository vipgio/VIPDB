// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	// res.status(200).json({ name: "John Doe" });
	const config = await fetch(
		`https://api.themoviedb.org/3/configuration?api_key=${process.env.TMDB_KEY}`
	);
	const imagesConfig = await config.json();

	res.status(200).json(imagesConfig);
}
