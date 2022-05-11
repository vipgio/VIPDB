import Meta from "../components/Meta";
import TitleSlider from "../HOC/TitleSlider";
import { server } from "../HOC/config";

export default function Home({ trends }) {
	console.log(trends);
	return (
		<div className='p-1'>
			<Meta title='Home | VIPDB' />

			<main>
				<h1 className='mt-2 text-4xl'>Trending Titles</h1>
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
	const res = await fetch(`${server}/api/trending`);
	const trends = await res.json();

	return {
		props: {
			trends,
		},
		revalidate: 100,
	};
}
