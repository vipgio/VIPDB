import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../../../context/TitleContext";
import Link from "next/link";
import Image from "next/image";
const axios = require("axios").default;
import blankImage from "../../../components/nullPic.jpg";

const Credtis = () => {
	const router = useRouter();
	const query = router.query;
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const { currentTitle, setCurrentTitle } = useContext(TitleContext);
	const [departments, setDepartments] = useState([]);
	// useEffect(() => {
	// 	console.log("id: ", query.id);
	// }, [query]);
	useEffect(async () => {
		if (currentTitle.title) {
			setDepartments(
				currentTitle.credits.crew
					.filter((value, index, self) => {
						return self.findIndex((v) => v.department === value.department) === index;
					})
					.map((person) => ({
						name: person.department,
						id: person.id,
					}))
			);
			setIsLoading(false);
		} else if (query.id) {
			const options = {
				method: "GET",
				url: `/api/movie/${
					query.id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
						? query.id
						: query.id.slice(0, query.id.search(/[-]/g))
				}`,
			};
			try {
				const data = await axios.request(options);
				setCurrentTitle(data.data);
				console.log(data.data);
				setDepartments(
					data.data.credits.crew
						.filter((value, index, self) => {
							return self.findIndex((v) => v.department === value.department) === index;
						})
						.map((person) => ({
							name: person.department,
							id: person.id,
						}))
				);
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
				title={`${currentTitle.title} (${currentTitle.release_date.slice(
					0,
					4
				)}) - Credits | VIPDB`}
			/>
			<div className='my-2'>
				<Link href={`/movie/${query.id}`}>
					<a className='hover:text-sky-400'>&larr; Back</a>
				</Link>
			</div>
			<div className='ml-2 mb-4 grid grid-cols-2 pt-2 text-3xl text-slate-200'>
				<div>
					<span>Cast </span>
					<span className='text-base text-slate-400'>
						{currentTitle.credits.cast.length}
					</span>
				</div>
				<div>
					<span>Crew </span>
					<span className='text-base text-slate-400'>
						{currentTitle.credits.crew.length}
					</span>
				</div>
			</div>
			<section className='grid grid-cols-2 text-slate-200'>
				<div>
					{currentTitle.credits.cast.map((person) => (
						<div key={person.id} className='shaodw-xl m-2 flex h-fit py-2'>
							<div className='mr-2 overflow-hidden rounded-md text-[0px]'>
								<Link
									href={`/person/${person.id}-${person.name
										.toLowerCase()
										.replace(/[ ]/g, "-")
										.replace(/[,:;']/g, "")}`}
								>
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
								<div className='text-lg hover:text-sky-400'>
									<Link
										href={`/person/${person.id}-${person.name
											.toLowerCase()
											.replace(/[ ]/g, "-")
											.replace(/[,:;']/g, "")}`}
									>
										<a>{person.name}</a>
									</Link>
								</div>
								<div className='text-sm text-slate-200'>{person.character}</div>
							</div>
						</div>
					))}
				</div>
				<div>
					{departments
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((department) => (
							<div className='mb-6 ml-2'>
								<div className='text-xl'>{department.name}</div>
								{currentTitle.credits.crew

									.filter((crew) => crew.department === department.name)
									.map((person) => (
										<div className='my-2 flex py-2' key={person.id + person.job}>
											<div className='mr-2 overflow-hidden rounded-md text-[0px]'>
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
											</div>
											<div>
												<div className='text-xl'>
													<Link
														href={`/person/${person.id}-${person.name
															.toLowerCase()
															.replace(/[ ]/g, "-")
															.replace(/[,:;']/g, "")}`}
													>
														<a>{person.name}</a>
													</Link>
												</div>
												<div className='text-sm'>{person.job}</div>
											</div>
										</div>
									))}
							</div>
						))}
				</div>
			</section>
		</>
	);
};

export default Credtis;
