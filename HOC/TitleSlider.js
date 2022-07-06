import TitleSliderCard from "../components/TitleSliderCard";

const TitleSlider = ({ items }) => {
	return (
		<div className='my-2 mb-10 flex h-fit max-w-screen-2xl rounded-xl'>
			<ul className='relative flex w-full max-w-screen-2xl snap-x snap-mandatory overflow-y-hidden rounded-xl p-4'>
				{items.map((item) => (
					<TitleSliderCard item={item} key={item.id} type={item.name ? "tv" : "movie"} />
				))}
			</ul>
		</div>
	);
};

export default TitleSlider;
