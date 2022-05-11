import Image from "next/image";
import blankImage from "../components/nullPic.jpg";
export const ImageWrapper = ({ src, width, height }) => {
	return (
		<>
			<div className='relative h-full w-full text-[0px]'>
				<Image
					src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${src}` || blankImage}
					placeholder='blur'
					blurDataURL={
						"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
					}
					width={width}
					height={height}
					layout={`${width ? "" : "fill"}`}
				/>
			</div>
		</>
	);
};
