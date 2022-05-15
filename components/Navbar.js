import Link from "next/link";
import logo from "../public/logo.png";
import Image from "next/image";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import SearchBox from "./SearchBox";
import { LoginButton } from "./UserComponents/LoginButton";
import { LogoutButton } from "./UserComponents/LogoutButton";
export const Navbar = () => {
	const [showBurger, setShowBurger] = useState(false);
	const { currentUser, getUser, getSession, clearData } = useContext(UserContext);
	return (
		<nav className='flex items-center border-b-2 border-white text-white'>
			<div className='my-2 border-r pr-4'>
				<Link href='/'>
					<a>
						<Image src={logo} width={30} height={30} alt='logo' />
					</a>
				</Link>
			</div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='my-2 ml-auto block h-6 w-6 cursor-pointer sm:hidden' // Burger icon
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				onClick={() => setShowBurger(true)}
				onMouseDown={(e) => e.preventDefault()}
				color={`${showBurger && "#1f2937"}`}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M4 6h16M4 12h16M4 18h16'
				/>
			</svg>

			<div
				className={`${
					showBurger
						? "no-scrollbar max-h-[300px] overflow-y-scroll"
						: "h-0 overflow-hidden"
					// showBurger ? "opacity-100" : "opacity-0"
				} absolute top-3 right-0 z-20 flex-col rounded-xl bg-white transition-all duration-300 sm:hidden`}
			>
				<div className='m-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='m-2 ml-auto block h-6 w-6 cursor-pointer sm:hidden'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						onClick={() => setShowBurger(false)}
						onMouseDown={(e) => e.preventDefault()}
						color='#1f2937'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
					{/*user && (
						<div className='flex'>
							<img src={user.picture} height={20} width={20} className='rounded-full' />
							<span>{user.nickname}</span>
						</div>
					)*/}
					<div className='mb-2 flex flex-col items-center'>
						<Link href='/'>
							<a className='mb-2 text-slate-800' onClick={() => setShowBurger(false)}>
								Home
							</a>
						</Link>

						{/* <Link href='/ninjas/'>
							<a className='mb-2 text-slate-800' onClick={() => setShowBurger(false)}>
								Ninja Listing
							</a>
						</Link> */}

						<Link href='/search'>
							<a className='mb-2 text-slate-800' onClick={() => setShowBurger(false)}>
								Search
							</a>
						</Link>

						{currentUser ? (
							<>
								<Link href='/profile'>
									<a className='mb-2 text-slate-800' onClick={() => setShowBurger(false)}>
										Profile
									</a>
								</Link>
								<div>
									<LogoutButton />
								</div>
							</>
						) : (
							<div className='flex flex-col'>
								<span onClick={() => setShowBurger(false)}>
									<LoginButton />
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<>
				{/* normal navbar */}
				<div className='hidden items-center sm:flex sm:w-full'>
					{currentUser && (
						<div className='flex'>
							{/* <img src={user.picture} height={20} width={20} className='rounded-full' /> */}
							<span>{currentUser.email}</span>
						</div>
					)}
					<div className='my-2 flex items-center'>
						<Link href='/'>
							<a className='link ml-3 text-slate-100'>Home</a>
						</Link>

						<Link href='/search'>
							<a className='link ml-3 text-slate-100'>Search</a>
						</Link>

						{currentUser && (
							<Link href='/profile'>
								<a className='link ml-3 text-slate-100'>Profile</a>
							</Link>
						)}

						{/* <StarRating /> */}
						{currentUser ? (
							<div className='mx-2 flex'>
								<LogoutButton />
								{/* <button onClick={getUser}>Get Data</button> */}
								{/* <button onClick={getSession}>Get Session</button> */}
								{/* <button onClick={clearData}>Clear Data</button> */}
							</div>
						) : (
							<div className='flex'>
								<span className='ml-3'>
									<LoginButton />
								</span>
							</div>
						)}
					</div>
					<div className='ml-auto'>
						<SearchBox />
					</div>
				</div>
			</>
		</nav>
	);
};
