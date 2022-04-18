const SkeletonTitles = () => {
	return (
		<>
			<div className='mt-1 flex flex-col pt-2 sm:flex-row'>
				<div className='flex flex-col items-center'>
					<div className='mx-1 my-2 h-[450px] w-[300px] animate-pulse overflow-hidden rounded-md border border-white bg-gray-600 text-[0] sm:w-80'></div>
				</div>
				<section className='w-full sm:w-3/4 sm:pl-6'>
					<div>
						<h1>
							<span className='text-5xl'>title </span>
							<span className='text-3xl text-slate-300'></span>
						</h1>
						<div className='flex'></div>
						<p className='my-2 italic text-slate-300'>tagline</p>
						<h3 className='text-xl font-bold'>Overview</h3>
						<p className='text-md text-slate-200'>overview</p>
						<h2 className='mt-5 text-slate-300'></h2>
					</div>
				</section>
			</div>
			<div className='m-1 my-4 mb-10 flex h-fit animate-pulse snap-x snap-mandatory overflow-y-auto rounded-xl border-2 border-white bg-gray-600 p-4 md:w-[780px]'>
				{new Array(6).fill("").map((item, index) => (
					<div
						className='mx-2 min-w-[120px] snap-center overflow-auto rounded-md shadow-2xl'
						key={index}
					>
						<div className='relative h-[180px] w-[120px] bg-gray-500'></div>
					</div>
				))}
			</div>
		</>
	);
};

export default SkeletonTitles;
