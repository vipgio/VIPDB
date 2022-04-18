import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Image from "next/image";

export default function Profile() {
	const { currentUser, isLoading } = useContext(UserContext);
	if (isLoading) return <div>Loading...</div>;

	return (
		currentUser && (
			<div>
				<div className='grid grid-cols-4'>
					{currentUser.user_metadata.watchlist.map((movie) => (
						<div key={movie.id}>
							<Image
								width={1200}
								height={1800}
								quality={80}
								placeholder='blur'
								src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster}`}
								blurDataURL={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${movie.poster}`}
							/>
						</div>
					))}
				</div>
			</div>
		)
	);
}
