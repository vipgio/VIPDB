module.exports = {
	reactStrictMode: true,
	env: {
		TMDB_KEY: process.env.TMDB_KEY,
		GRAPHCMS_ENDPOINT: process.env.GRAPHCMS_ENDPOINT,
		GRAPHCMS_API_KEY: process.env.GRAPHCMS_API_KEY,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
		SUPABASE_URL: process.env.SUPABASE_URL,
	},
	images: {
		domains: ["www.themoviedb.org", "cdn.discordapp.com", "image.tmdb.org"],
	},
};
