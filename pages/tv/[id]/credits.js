import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../../../context/TitleContext";
import Link from "next/link";
import Image from "next/image";
const axios = require("axios").default;
import blankImage from "../../../components/nullPic.jpg";

const credtis = () => {
	const router = useRouter();
	const query = router.query;
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const { currentTitle, setCurrentTitle } = useContext(TitleContext);
	console.log("currentTitle ", currentTitle);
	// useEffect(() => {
	// 	console.log("id: ", query.id);
	// }, [query]);
	useEffect(async () => {
		if (currentTitle.title) {
			setIsLoading(false);
		} else if (query.id) {
			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/tv/${
					query.id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
						? query.id
						: query.id.slice(0, query.id.search(/[-]/g))
				}?api_key=${
					process.env.TMDB_KEY
				}&append_to_response=aggregate_credits,release_dates`,
			};
			try {
				const data = await axios.request(options);
				// console.log(data.data);
				setCurrentTitle(data.data);
			} catch (error) {
				console.log("credits error ", error);
			}
			setIsLoading(false);
		}
	}, [query]);
	return isLoading ? (
		<div>Loading...</div> //skeleton
	) : (
		<>
			<Meta
				title={`${currentTitle.name} (${currentTitle.first_air_date.slice(
					0,
					4
				)}) - Credits | `}
			/>
			<div className='my-2'>
				<Link href={`/tv/${query.id}`}>
					<a>&larr; Back</a>
				</Link>
			</div>
			<section className='grid grid-cols-2'>
				<div>
					{currentTitle.aggregate_credits.cast.map((person) => (
						<div key={person.id} className='shaodw-xl m-2 flex h-fit border p-2'>
							<div className='mr-2 overflow-hidden rounded-md text-[0px]'>
								<Link href={`/person/${person.id}`}>
									<a>
										<Image
											src={
												person.profile_path
													? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${person.profile_path}`
													: blankImage
											}
											placeholder='blur'
											blurDataURL={
												"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAcAAIcAgit25/8AAAAASUVORK5CYII="
											}
											width={60}
											height={90}
											className='object-contain'
										/>
									</a>
								</Link>
							</div>
							<div>
								<div className='text-lg'>
									<Link href={`/person/${person.id}`}>
										<a>{person.name}</a>
									</Link>
								</div>
								<div className='text-sm text-slate-200'>{person.roles[0].character}</div>
							</div>
						</div>
					))}
				</div>
				<div>
					{currentTitle.aggregate_credits.crew
						.filter((value, index, self) => {
							return (
								self.findIndex(
									(v) => v.known_for_department === value.known_for_department
								) === index
							);
						})
						.map((person) => (
							<div className='border' key={person.id}>
								<div className='font-bold'>{person.known_for_department}</div>
							</div>
						))}
				</div>
			</section>
		</>
	);
	{
		/* <div key={index} className='border'>
							<div>{person.name}</div>
							<div>Dep: {person.known_for_department}</div>
							<div>Job: {person.job}</div>
						</div> */
	}
};

export default credtis;
