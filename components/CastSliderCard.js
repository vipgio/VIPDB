import Image from "next/image";
import Link from "next/link";
import blankImage from "./nullPic.jpg";
const CastSliderCard = ({ person }) => {
	return (
		<div className='mx-2 min-w-[120px] snap-center overflow-auto rounded-md shadow-2xl'>
			<Link
				href={`/person/${person.id}-${person.name.toLowerCase().replace(/[ ]/g, "-")}`}
			>
				<a>
					<div className='relative h-[180px] w-[120px]'>
						<Image
							src={
								person.profile_path
									? // `https://www.themoviedb.org/t/p/w138_and_h175_face${person.profile_path}`
									  //   `https://www.themoviedb.org/t/p/original${person.profile_path}`
									  `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${person.profile_path}`
									: blankImage
							}
							placeholder='blur'
							blurDataURL={
								person.profile_path
									? // ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${person.profile_path}`
									  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
									: blankImage
							}
							// width={138}
							// height={175}
							layout='fill'
							// quality={100}
							className='object-contain'
						/>
					</div>
				</a>
			</Link>
			<div className='m-2 flex flex-col'>
				<Link
					href={`/person/${person.id}-${person.name.toLowerCase().replace(/[ ]/g, "-")}`}
				>
					<a className='link font-extrabold text-slate-200'>{person.name}</a>
				</Link>
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
