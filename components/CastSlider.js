import Link from "next/link";
import CastSliderCard from "./CastSliderCard";

const CastSlider = ({ cast, movieId }) => {
	return (
		<>
			<div className='my-4 mb-10 flex h-fit overflow-y-auto rounded-xl border-2 border-white bg-gray-800 p-4 md:w-[780px]'>
				{cast.slice(0, 8).map((person) => (
					<CastSliderCard person={person} key={person.id} />
				))}
				<div className='flex h-[257px] flex-col justify-center p-4 text-center text-gray-200'>
					<Link href={`/movie/${movieId}/credits`}>
						<a className='text-white'>
							<div className='w-[75px] items-center justify-center align-middle hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'>
								Show all credits &rarr;
							</div>
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CastSlider;
