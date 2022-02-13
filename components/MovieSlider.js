import Link from "next/link";
import CastSliderCard from "./CastSliderCard";
import MovieSliderCard from "./MovieSliderCard";

const MovieSlider = ({ items }) => {
	console.log(items);
	return (
		<div className='my-4 mb-10 flex h-96 max-w-screen-2xl overflow-hidden rounded-xl'>
			{/* <div className='z-10 -mr-[46px] h-full w-12 rounded-xl bg-gradient-to-r from-white opacity-30'></div> */}
			<div className='relative flex w-full max-w-screen-2xl snap-x snap-mandatory overflow-y-hidden rounded-xl p-4'>
				{items.map((item) => (
					<MovieSliderCard item={item} key={item.id} type={item.media_type} />
				))}
			</div>
			{/* <div className='z-10 -ml-[18px] h-full w-5 rounded-xl bg-gradient-to-l from-white opacity-30'></div> */}
		</div>
	);
};

export default MovieSlider;
