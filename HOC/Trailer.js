import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { Fragment, useState } from "react";

const Trailer = ({ trailer }) => {
	return (
		<Popover className='relative'>
			{() => (
				<>
					<Popover.Button>
						<span className='flex items-center hover:text-sky-400'>
							<BsPlayFill className='' />
							Play Trailer
						</span>
					</Popover.Button>

					<Popover.Overlay className='fixed inset-0 z-10 bg-black opacity-70' />

					<Transition
						as={Fragment}
						enter='transition ease-out duration-300'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						<Popover.Panel className='fixed top-10 left-1/2 z-10 flex w-[90vw] -translate-x-1/2 transform justify-center md:w-[60vw]'>
							<div className='z-20 mx-auto w-full'>
								<div className='flex cursor-auto rounded-t-md bg-slate-600'>
									<div>Trailer</div>
									<div className='z-10 ml-auto flex aspect-square w-[5%] overflow-hidden rounded-tr-md bg-sky-600 focus-within:ring focus-within:ring-sky-400 focus:ring focus:ring-red-600'>
										<Popover.Button onClick={() => console.log("button")}>
											<IoCloseOutline
												className='h-full w-full'
												size={30}
												title='close icon'
											/>
										</Popover.Button>
									</div>
								</div>
								<div className='relative mt-px aspect-video overflow-hidden rounded-b-md'>
									<div className='h-full w-[calc(100%_-_1px)] animate-pulse rounded-b-md bg-gray-600'></div>
									<iframe
										src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
										title='YouTube video player'
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										className='absolute bottom-0 right-0 h-full w-full'
									></iframe>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default Trailer;
