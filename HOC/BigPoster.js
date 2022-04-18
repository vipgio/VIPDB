import Image from "next/image";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { Fragment, useState } from "react";

const BigPoster = ({ path, titleName }) => {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	return (
		<>
			<div className='relative mx-1 my-2 h-[450px] w-[300px] overflow-hidden rounded-md border border-slate-400 text-[0] sm:h-fit sm:w-80'>
				<div
					className='absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 text-base opacity-0 transition hover:bg-opacity-70 hover:opacity-100'
					onClick={openModal}
				>
					Show full size poster
				</div>
				<Image
					width={1200}
					height={1800}
					quality={80}
					placeholder='blur'
					src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${path}`}
					blurDataURL={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${path}`}
				/>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 z-10 overflow-y-hidden'
					onClose={closeModal}
				>
					<div className='flex justify-center px-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-70' />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						{/* <span className='inline-block h-screen align-middle' aria-hidden='true'>
							&#8203;
						</span> */}
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<div className='h-screen p-3'>
								<div className='flex h-full transform flex-col rounded-md border border-slate-400 bg-slate-800 p-2 shadow-xl transition-all'>
									<div className='relative aspect-[2/3] h-full'>
										<Image
											alt={`${titleName} Original poster`}
											width={2000}
											height={3000}
											quality={100}
											placeholder='blur'
											src={`https://image.tmdb.org/t/p/original${path}`}
											blurDataURL={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${path}`}
										/>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
// 	const [showPopup, setShowPopup] = useState(false);
// 	return (
// 		<div className='relative mx-1 my-2 h-[450px] w-[300px] overflow-hidden rounded-md border border-slate-300 text-[0] sm:h-fit sm:w-80'>
// 			<div
// 				className='absolute left-0 top-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 text-base opacity-0 transition hover:bg-opacity-70 hover:opacity-100'
// 				onClick={() => setShowPopup(true)}
// 			>
// 				Show full size poster
// 			</div>
// 			<Image
// 				width={1200}
// 				height={1800}
// 				quality={80}
// 				placeholder='blur'
// 				src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${path}`}
// 				blurDataURL={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${path}`}
// 			/>
// 		</div>
// 	);
// };

export default BigPoster;
