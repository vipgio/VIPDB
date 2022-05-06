import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Meta from "../../../components/Meta";
import Overview from "../../../components/Overview";
import StarRating from "../../../components/StarRating";
import TitleSlider from "../../../HOC/TitleSlider";
import BigPoster from "../../../HOC/BigPoster";
import NotFound from "../../404";
import { PersonTitlesList } from "../../../components/PersonTitlesList";

const axios = require("axios").default;

const Person = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [is404, setIs404] = useState(false);
	const [currentPerson, setCurrentPerson] = useState({});
	const [showMore, setShowMore] = useState(false);
	const query = router.query;

	useEffect(async () => {
		if (query.id) {
			const options = {
				method: "GET",
				url: `/api/person/${
					query.id.search(/[-]/g) === -1 // if '-' doesn't exist, then don't slice
						? query.id
						: query.id.slice(0, query.id.search(/[-]/g))
				}`,
			};
			try {
				const data = await axios.request(options);
				setCurrentPerson(data.data);
				console.log(data.data);
			} catch (error) {
				console.log(error);
				setIs404(true);
			}
			setIsLoading(false);
		}
	}, [query]);
	return isLoading ? (
		"loading" //loading template here
	) : !is404 ? (
		<>
			<Meta title={`${currentPerson.name} | VIPDB`} />
			<div className='mt-4 flex w-full flex-col text-slate-200 sm:flex-row'>
				<div className='mx-2'>
					<div className='flex flex-col items-center'>
						<BigPoster path={currentPerson.profile_path} titleName={currentPerson.name} />
						<h2 className='block text-3xl sm:hidden'>{currentPerson.name}</h2>
					</div>

					<section className='my-5'>
						<h3 className='text-2xl font-bold'>Personal Info</h3>
						<section>
							<p>
								<span className='mt-2 block text-lg font-semibold'>Known For</span>
								{currentPerson.known_for_department}
							</p>
							<p>
								<span className='mt-2 block text-lg font-semibold'>Gender</span>
								{currentPerson.gender === 0
									? "-"
									: currentPerson.gender === 1
									? "Female"
									: "Male"}
							</p>

							<p>
								<span className='mt-2 block text-lg font-semibold'>Birthday</span>
								{currentPerson.birthday ? (
									<>
										{currentPerson.birthday}
										{!currentPerson.deathday && (
											<>
												{" "}
												(
												{new Date().getFullYear() -
													Number(currentPerson.birthday.slice(0, 4))}{" "}
												years old)
											</>
										)}
									</>
								) : (
									"-"
								)}
							</p>
							{currentPerson.deathday && (
								<p>
									<span className='mt-2 block text-lg font-semibold'>Day of Death</span>
									{currentPerson.deathday} (
									{currentPerson.deathday.slice(0, 4) -
										currentPerson.birthday.slice(0, 4)}{" "}
									years old)
								</p>
							)}
							<p>
								<span className='mt-2 block text-lg font-semibold'>Place of Birth</span>
								{currentPerson.place_of_birth || "-"}
							</p>
						</section>
					</section>
				</div>
				<div className='mx-2 flex flex-col overflow-hidden'>
					<h1 className='mb-8 hidden text-4xl font-bold sm:block'>
						{currentPerson.name}
					</h1>
					<div>
						<span className='mb-2 block text-2xl font-bold'>Biography</span>
						<div
							className={`whitespace-pre-wrap ${
								showMore ? "max-h-[500px]" : "max-h-[230px]"
							} relative overflow-hidden transition-all duration-200`}
						>
							<p className='mr-6'>{currentPerson.biography}</p>
							{!showMore && currentPerson.biography.length > 1250 && (
								<div>
									<div className='absolute bottom-0 right-0 w-full bg-gradient-to-r from-transparent to-slate-800 text-right'>
										<button
											className='m-1 bg-slate-800 px-5 hover:text-sky-400'
											onClick={() => setShowMore(true)}
										>
											Show More &rarr;
										</button>
									</div>
								</div>
							)}
						</div>

						{!currentPerson.biography && "We don't have a biography for this person yet."}
					</div>
					<div className=''>
						<TitleSlider
							items={currentPerson.combined_credits[
								`${currentPerson.known_for_department === "Acting" ? "cast" : "crew"}`
							]
								.sort((a, b) => b.vote_count - a.vote_count)
								.filter((value, index, self) => {
									return self.findIndex((v) => v.id === value.id) === index;
								})
								.slice(0, 7)}
						/>
					</div>

					<div>
						<PersonTitlesList person={currentPerson} />
					</div>
				</div>
			</div>
		</>
	) : (
		<>
			<Meta robots='noindex' />
			<NotFound />
		</>
	);
};

export default Person;
