import Image from "next/image";
import Link from "next/link";
import blankImage from "./nullPic.jpg";
const CastSliderCard = ({ person }) => {
	return (
		<div className='mx-2 min-w-[120px] overflow-auto rounded-md shadow-2xl'>
			<Link href={`/person/${person.id}`}>
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
									  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsaOCpBwAEIQGNgcT93QAAAABJRU5ErkJggg=="
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
				<Link href={`/person/${person.id}`}>
					<a className='font-extrabold text-white'>{person.name}</a>
				</Link>
				<div>as {person.character}</div>
			</div>
		</div>
	);
};

export default CastSliderCard;
