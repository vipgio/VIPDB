import Image from "next/image";
const Banner = ({ path }) => {
	return (
		<>
			<div className='fixed left-0 -z-10 hidden w-screen justify-center lg:flex'>
				<div className='banner fixed top-0 -z-10 -ml-2 w-fit max-w-screen-2xl opacity-70'>
					<Image
						src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII='
						width={1920}
						height={1080}
					/>
				</div>
				<div className='banner fixed top-0 -z-20 w-fit max-w-screen-2xl opacity-50'>
					<Image
						width={1920}
						height={1080}
						placeholder='blur'
						blurDataURL={
							path
								? `https://image.tmdb.org/t/p/w780${path}`
								: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
						}
						src={
							path
								? `https://image.tmdb.org/t/p/w1280${path}`
								: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
						}
					/>
				</div>
			</div>
		</>
	);
};

export default Banner;
