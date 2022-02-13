const config = ({ imagesConfig }) => {
	console.log(imagesConfig);
	return (
		<>
			<div>blah</div>
		</>
	);
};

export default config;

export async function getStaticProps() {
	const res = await fetch(
		`https://api.themoviedb.org/3/configuration?api_key=${process.env.TMDB_KEY}`
	);
	const imagesConfig = await res.json();

	return {
		props: {
			imagesConfig,
		},
	};
}
