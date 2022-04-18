import Meta from "../components/Meta";
import TitleSlider from "../HOC/TitleSlider";

export default function Home({ trends }) {
	// console.log(trends);
	return (
		<div className='p-1'>
			<Meta title='Home | VIPDB' />

			<main>
				<h1 className='mt-2 text-4xl'>Trending</h1>
				<TitleSlider
					items={trends.results.filter(
						(trend) => trend.media_type === "tv" || trend.media_type === "movie"
					)}
				/>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_KEY}`
	);
	const trends = await res.json();

	return {
		props: {
			trends,
		},
		revalidate: 100,
	};
}
