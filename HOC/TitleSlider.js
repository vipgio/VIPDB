import TitleSliderCard from "../components/TitleSliderCard";

const TitleSlider = ({ items }) => {
	console.log(items);
	return (
		<div className='my-2 mb-10 flex h-fit max-w-screen-2xl rounded-xl'>
			{/* <div className='z-10 -mr-[46px] h-full w-12 rounded-xl bg-gradient-to-r from-white opacity-30'></div> */}
			<ul className='relative flex w-full max-w-screen-2xl snap-x snap-mandatory overflow-y-hidden rounded-xl p-4'>
				{items.map((item) => (
					<TitleSliderCard item={item} key={item.id} type={item.media_type} />
				))}
			</ul>
			{/* <div className='z-10 -ml-[18px] h-full w-5 rounded-xl bg-gradient-to-l from-white opacity-30'></div> */}
		</div>
	);
};

export default TitleSlider;
