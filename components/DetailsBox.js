import StarRating from "./StarRating";
import { server } from "../HOC/config";
import { useState, useRef } from "react";
import { IoClipboard } from "react-icons/io5";
import { useRouter } from "next/router";
const DetailsBox = () => {
	const [showShare, setShowShare] = useState(false);
	const { asPath } = useRouter();
	const copyToClipboard = (copyMe) => {
		inputRef.current.select();
		navigator.clipboard.writeText(copyMe);
		console.log("copied");
	};
	const inputRef = useRef(null);
	return (
		<div className='mt-3 flex h-fit w-2/3 max-w-sm flex-col divide-y rounded-md bg-slate-500 px-2'>
			<StarRating />
			<div className='p-1'>Review</div>
			<div className='p-1'>Rate</div>
			<div
				className='group flex max-w-sm justify-center'
				onClick={() => setShowShare(true)}
				onMouseLeave={() => {
					setTimeout(() => {
						setShowShare(false);
					}, 1000);
				}}
			>
				<div className='flex max-w-sm items-center overflow-hidden'>
					<input
						type='text'
						value={server + asPath}
						readOnly
						className={`transition-all duration-500 ${
							showShare ? "w-60 bg-slate-800 p-1" : "w-0 bg-slate-500"
						} z-10 my-2 ml-1 rounded-l-md md:max-w-none`}
						ref={inputRef}
					/>
					{showShare && (
						<IoClipboard
							className='m-2 ml-auto h-8 w-8 cursor-pointer rounded-r-md bg-slate-700 p-1 text-slate-200 shadow-lg focus-within:bg-red-800 hover:bg-slate-600'
							onClick={() => {
								copyToClipboard(server + asPath);
								console.log(window);
							}}
						/>
					)}
				</div>
				{!showShare && (
					<span className='link my-2 cursor-pointer p-1 text-white'>Share</span>
				)}
			</div>
		</div>
	);
};

export default DetailsBox;
