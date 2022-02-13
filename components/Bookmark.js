import {
	IoHeartOutline,
	IoHeartDislike,
	IoHeart,
	IoEyeOutline,
	IoEyeOffOutline,
} from "react-icons/io5";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { useState } from "react";
const Bookmark = () => {
	const [userInfo, setUserInfo] = useState({
		like: true,
		watch: false,
		watchlist: false,
	});
	console.log(userInfo);
	return (
		<>
			<div className='flex w-full justify-evenly'>
				<div>
					{userInfo.watch ? (
						<IoEyeOutline
							size={"24px"}
							className='cursor-pointer'
							onMouseDown={(e) => e.preventDefault()}
							color='green'
							onClick={() => {
								setUserInfo({
									...userInfo,
									watch: false,
								});
							}}
						/>
					) : (
						<IoEyeOffOutline
							size={"24px"}
							className='cursor-pointer'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								setUserInfo({
									...userInfo,
									watch: true,
								});
							}}
						/>
					)}
				</div>
				<div>
					{userInfo.like ? (
						<div className='text-blue-400'>
							<IoHeart
								color='red'
								size={"24px"}
								className='cursor-pointer'
								onClick={() => {
									setUserInfo({
										...userInfo,
										like: false,
									});
								}}
								onMouseDown={(e) => e.preventDefault()}
							/>
						</div>
					) : (
						<div className='text-white hover:text-[#ff0000]'>
							<IoHeartOutline
								size={"24px"}
								className='cursor-pointer'
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => {
									setUserInfo({
										...userInfo,
										like: true,
									});
								}}
							/>
						</div>
					)}
				</div>
				<div>
					{userInfo.watchlist ? (
						<BsBookmarkFill
							size={"22px"}
							className='cursor-pointer'
							onMouseDown={(e) => e.preventDefault()}
							color={"#22d3ee"}
							onClick={() => {
								setUserInfo({
									...userInfo,
									watchlist: false,
								});
							}}
						/>
					) : (
						<div className='text-gray-300 hover:text-cyan-400'>
							<BsBookmarkPlus
								size={"22px"}
								className='cursor-pointer'
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => {
									setUserInfo({
										...userInfo,
										watchlist: true,
									});
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Bookmark;
