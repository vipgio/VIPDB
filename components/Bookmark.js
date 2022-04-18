import { IoHeartOutline, IoHeart, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Bookmark = ({ currentTitle }) => {
	const { currentUser, addData } = useContext(UserContext);
	return (
		<>
			<div className='mt-2 grid w-full grid-cols-3 justify-evenly'>
				<div>
					{currentUser.user_metadata.seen.some(
						(movie) => movie.id === currentTitle.id
					) ? (
						<div //if the user has seen this movie
							className='group flex cursor-pointer flex-col items-center text-green-500 hover:text-slate-300'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								addData({
									...currentUser.user_metadata,
									seen: [
										...currentUser.user_metadata.seen.filter(
											(movie) => movie.id !== currentTitle.id
										),
									],
								});
							}}
						>
							<IoEyeOutline size={"24px"} />
							<p className='text-slate-300 after:content-["Watched"] group-hover:text-white group-hover:after:content-["Remove"]'></p>
						</div>
					) : (
						<div //if the user has not seen this movie
							className='group flex cursor-pointer flex-col items-center text-slate-300'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								addData({
									...currentUser.user_metadata,
									seen: [
										...currentUser.user_metadata.seen,
										{
											title: currentTitle.title,
											type: currentTitle.title ? "movie" : "tv",
											year: currentTitle.release_date.slice(0, 4),
											poster: currentTitle.poster_path,
											rating: currentTitle.vote_average,
											id: currentTitle.id,
											dateAdded: new Date().toISOString(),
										},
									],
								});
							}}
						>
							<IoEyeOffOutline size={"24px"} className='group-hover:text-green-500' />
							<p className='group-hover:text-white'>Watch</p>
						</div>
					)}
				</div>

				<div>
					{currentUser.user_metadata.liked.some(
						(movie) => movie.id === currentTitle.id
					) ? (
						<div //if the user has liked this movie
							className='group flex cursor-pointer flex-col items-center text-[#ff0000] hover:text-slate-300'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								addData({
									...currentUser.user_metadata,
									liked: [
										...currentUser.user_metadata.liked.filter(
											(movie) => movie.id !== currentTitle.id
										),
									],
								});
							}}
						>
							<IoHeart size={"24px"} />
							<p className='text-slate-300 after:content-["Liked"] group-hover:text-white group-hover:after:content-["Remove"]'></p>
						</div>
					) : (
						<div //if the user has not liked this movie
							className='group flex cursor-pointer flex-col items-center text-slate-300'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								addData({
									...currentUser.user_metadata,
									liked: [
										...currentUser.user_metadata.liked,
										{
											title: currentTitle.title,
											type: currentTitle.title ? "movie" : "tv",
											year: currentTitle.release_date.slice(0, 4),
											poster: currentTitle.poster_path,
											rating: currentTitle.vote_average,
											id: currentTitle.id,
											dateAdded: new Date().toISOString(),
										},
									],
								});
							}}
						>
							<IoHeartOutline size={"24px"} className='group-hover:text-red-500' />
							<p className='text-slate-300 group-hover:text-white'>Like</p>
						</div>
					)}
				</div>

				<div>
					{currentUser.user_metadata.watchlist.some(
						(movie) => movie.id === currentTitle.id
					) ? (
						<div //if the user has added this movie to their watchlist
							className='group flex cursor-pointer flex-col items-center text-cyan-500 hover:text-slate-300'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								addData({
									...currentUser.user_metadata,
									watchlist: [
										...currentUser.user_metadata.watchlist.filter(
											(movie) => movie.id !== currentTitle.id
										),
									],
								});
							}}
						>
							<BsBookmarkFill size={"22px"} />
							<p className='text-slate-300 after:content-["Watchlist"] group-hover:text-white group-hover:after:content-["Remove"]'></p>
						</div>
					) : (
						<div //if the user has not added this movie to their watchlist
							className='group flex cursor-pointer flex-col items-center text-slate-300'
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								addData({
									...currentUser.user_metadata,
									watchlist: [
										...currentUser.user_metadata.watchlist,
										{
											title: currentTitle.title,
											type: currentTitle.title ? "movie" : "tv",
											year: currentTitle.release_date.slice(0, 4),
											poster: currentTitle.poster_path,
											rating: currentTitle.vote_average,
											id: currentTitle.id,
											dateAdded: new Date().toISOString(),
										},
									],
								});
							}}
						>
							<BsBookmarkPlus size={"22px"} className='group-hover:text-cyan-500' />
							<p className='text-slate-300 group-hover:text-white'>Watchlist</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Bookmark;
