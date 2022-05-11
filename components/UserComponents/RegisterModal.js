import { HiLockClosed, HiX } from "react-icons/hi";
import logo from "../../public/logo.png";
import Image from "next/image";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const RegisterModal = ({ closeModal, setModalType }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { handleSignUp } = useContext(UserContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSignUp(email, password, closeModal);
	};
	return (
		<div className='relative mt-32 flex min-h-full w-96 justify-center rounded-lg bg-gray-200 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md space-y-4'>
				<div>
					<div className='flex w-full'>
						<div className='mx-auto text-[0]'>
							<Image src={logo} width={50} height={50} alt='VIPDB Logo' />
						</div>
					</div>
					<h2 className='mt-2 text-center text-3xl font-extrabold text-gray-900'>
						Create your account
					</h2>
					<p className='mt-3 text-center text-sm text-gray-600'>
						Already have an account?{" "}
						<button
							className='font-medium text-indigo-600 hover:text-indigo-500'
							onClick={() => setModalType("login")}
						>
							Sign in
						</button>
					</p>
				</div>
				<form className='mt-1 space-y-6' onSubmit={handleSubmit}>
					<div className='-space-y-px rounded-md shadow-sm'>
						<label htmlFor='email-address' className='sr-only'>
							Email address
						</label>
						<input
							id='email-address'
							name='email'
							type='email'
							autoComplete='email'
							required
							className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
							placeholder='Email address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor='password' className='sr-only'>
							Password
						</label>
						<input
							id='password'
							name='password'
							type='password'
							autoComplete='current-password'
							required
							className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div>
						<button
							type='submit'
							className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
								<HiLockClosed
									className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
									aria-hidden='true'
								/>
							</span>
							Sign up
						</button>
					</div>
				</form>
			</div>
			<button
				type='button'
				className='absolute top-0 right-0 z-10 mt-3 mr-3 flex items-center justify-center border border-transparent text-gray-400 transition duration-150 ease-in-out hover:text-indigo-500 focus:text-indigo-600 focus:ring-2 focus:ring-indigo-500'
				onClick={closeModal}
			>
				<HiX size={40} />
			</button>
		</div>
	);
};

export default RegisterModal;
