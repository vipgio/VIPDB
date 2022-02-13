import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import logo from "../public/logo.png";
import Image from "next/image";
import { useState } from "react";
import SearchBox from "./SearchBox";

const Navbar = () => {
	const { user } = useUser();
	const [showBurger, setShowBurger] = useState(false);
	return (
		<nav className='flex items-center border-b-2 border-white text-white'>
			<div className='my-2 border-r pr-4'>
				<Link href='/'>
					<a>
						<Image src={logo} width={30} height={30} />
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
					showBurger ? "no-scrollbar h-[165px] overflow-y-scroll" : "h-0 overflow-hidden"
					// showBurger ? "opacity-100" : "opacity-0"
				} absolute top-3 right-0 z-10 flex-col rounded-xl bg-white transition-all duration-300 sm:hidden`}
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
					{user && (
						<div className='flex'>
							<img src={user.picture} height={20} width={20} className='rounded-full' />
							<span>{user.nickname}</span>
						</div>
					)}
					<div className='mb-2 flex flex-col items-center'>
						<Link href='/'>
							<a className='mb-2 text-gray-800' onClick={() => setShowBurger(false)}>
								Home
							</a>
						</Link>

						<Link href='/ninjas/'>
							<a className='mb-2 text-gray-800' onClick={() => setShowBurger(false)}>
								Ninja Listing
							</a>
						</Link>

						<Link href='/search'>
							<a className='mb-2 text-gray-800' onClick={() => setShowBurger(false)}>
								Search
							</a>
						</Link>

						<Link href='/profile'>
							<a className='mb-2 text-gray-800' onClick={() => setShowBurger(false)}>
								Profile
							</a>
						</Link>
					</div>
				</div>
			</div>

			<>
				{/* normal navbar */}
				<div className='hidden items-center sm:flex sm:w-full'>
					{user && (
						<div className='flex'>
							<img src={user.picture} height={20} width={20} className='rounded-full' />
							<span>{user.nickname}</span>
						</div>
					)}
					<div className='my-2 flex items-center'>
						<Link href='/'>
							<a className='ml-3 text-white'>Home</a>
						</Link>

						<Link href='/ninjas/'>
							<a className='ml-3 text-white'>Ninja Listing</a>
						</Link>

						<Link href='/search'>
							<a className='ml-3 text-white'>Search</a>
						</Link>

						<Link href='/profile'>
							<a className='ml-3 text-white'>Profile</a>
						</Link>

						{user ? (
							<a
								href='/api/auth/logout'
								className='ml-3 bg-red-600 py-2 px-8 text-white outline-red-500 hover:bg-red-700 focus:outline focus:outline-4'
							>
								Logout
							</a>
						) : (
							<a
								href='/api/auth/login'
								className='ml-3 bg-indigo-600 py-2 px-8 text-white outline-indigo-400 hover:bg-indigo-700 focus:outline focus:outline-4'
							>
								Login
							</a>
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

export default Navbar;
