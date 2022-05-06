import Image from "next/image";
import Link from "next/link";
import blankImage from "./nullPic.jpg";
export const PersonProfileImage = ({ person }) => {
	return (
		<div className='mr-2 overflow-hidden rounded-md text-[0px]'>
			<Link
				href={`/person/${person.id}-${person.name
					.toLowerCase()
					.replace(/[ ]/g, "-")
					.replace(/[,:;'.]/g, "")}`}
			>
				<a>
					<Image
						src={
							person.profile_path
								? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${person.profile_path}`
								: blankImage
						}
						placeholder='blur'
						blurDataURL={
							"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
						}
						width={60}
						height={90}
						className='object-contain'
					/>
				</a>
			</Link>
		</div>
	);
};
