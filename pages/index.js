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
				<h1 className='mt-2 text-4xl'>Popular</h1>
				{/* <TitleSlider items={popular.results} /> */}
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const trendsRes = await axios.request({
		method: "GET",
		url: `${server}/api/trending`,
	});
	const trends = trendsRes.data;

	const popularRes = await axios.request({
		method: "GET",
		url: `${server}/api/popular`,
	});
	const popular = popularRes.data;

	return {
		props: {
			trends,
			popular,
		},
		revalidate: 100,
	};
}
