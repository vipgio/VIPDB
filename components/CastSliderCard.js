import Image from "next/image";
import Link from "next/link";
import { LinkHandler } from "../HOC/LinkHandler";
import blankImage from "./nullPic.jpg";
const CastSliderCard = ({ person }) => {
	return (
		<div className='mx-2 min-w-[120px] snap-center overflow-auto rounded-md shadow-2xl'>
			<LinkHandler
				type='person'
				id={person.id}
				name={person.name}
				component={
					<div className='relative h-[180px] w-[120px]'>
						<Image
							src={
								person.profile_path
									? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${person.profile_path}`
									: blankImage
							}
							placeholder='blur'
							blurDataURL={
								person.profile_path
									? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
									: blankImage
							}
							layout='fill'
							className='object-contain'
							alt={person.name}
						/>
					</div>
				}
			/>

			<div className='m-2 flex flex-col'>
				<LinkHandler
					type='person'
					id={person.id}
					name={person.name}
					style='text-slate-200 font-extrabold'
				/>
				{typeof person.character === "string" ? (
					<span className='text-sm font-light text-slate-200'>{person.character}</span>
				) : (
					<>
						<span className='text-sm font-light text-slate-200'>
							{person.roles[0].character}
						</span>
						<div className='text-sm text-slate-300'>
							{person.total_episode_count}{" "}
							{`${person.total_episode_count === 1 ? "Episode" : "Episodes"}`}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CastSliderCard;
