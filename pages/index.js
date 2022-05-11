import Meta from "../components/Meta";
import TitleSlider from "../HOC/TitleSlider";
import { server } from "../HOC/config";
import axios from "axios";
export default function Home({ trends }) {
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
	const options = {
		method: "GET",
		url: `${server}/api/trending`,
		// url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_KEY}`,
	};
	const res = await axios.request(options);
	const trends = res.data;

	return {
		props: {
			trends,
		},
		revalidate: 100,
	};
}
