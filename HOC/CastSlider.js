import Link from "next/link";
import { useRouter } from "next/router";
import CastSliderCard from "../components/CastSliderCard";

const CastSlider = ({ cast }) => {
	const { asPath } = useRouter();
	// console.log(cast);
	return (
		<>
			<div className='m-1 my-4 mb-10 flex h-fit snap-x snap-mandatory overflow-y-auto rounded-xl border-2 border-slate-400 bg-slate-800 p-4 md:w-[780px]'>
				{cast.slice(0, 8).map((person) => (
					<CastSliderCard person={person} key={person.id} />
				))}
				<div className='flex flex-col justify-center p-4 text-center'>
					<Link href={`${asPath}/credits`}>
						<a className='w-[75px] justify-center align-middle font-semibold text-slate-200 hover:text-sky-400'>
							Show all credits &rarr;
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CastSlider;
