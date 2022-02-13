module.exports = {
	reactStrictMode: true,
	env: {
		TMDB_KEY: process.env.TMDB_KEY,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_SECRET: process.env.AUTH0_SECRE,
		AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
		AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
	},
	images: {
		domains: ["www.themoviedb.org", "cdn.discordapp.com"],
	},
};
