import { useState } from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { IoStarHalfOutline, IoStarOutline, IoStar, IoStarHalf } from "react-icons/io5";
const StarRating = () => {
	const [rating, setRating] = useState(2.4);
	return (
		<>
			{/* <div>
				<Rating
					fractions={2}
					emptySymbol={<BsStar size={50} />}
					fullSymbol={<BsStarFill size={50} />}
					placeholderSymbol={<BsStarHalf size={50} />}
					initialRating={rating}
					// onClick={(value) => console.log("click", value)}
					onChange={(value) => setRating(value)}
					className='text-sky-400'
				/>
			</div> */}
			{/* <div>
				<Rating
					fractions={2}
					emptySymbol={<IoStarOutline size={50} />}
					fullSymbol={<IoStar size={50} />}
					placeholderSymbol={<IoStarHalfOutline size={50} />}
					initialRating={rating}
					// onClick={(value) => console.log("click", value)}
					onChange={(value) => setRating(value)}
					className='text-sky-400'
				/>
			</div> */}
			rating: {rating}
		</>
	);
};

export default StarRating;
