/*import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { createClient } from "@supabase/supabase-js";
import { HiLockClosed } from "react-icons/hi";
import logo from "../public/logo.png";
import Image from "next/image";

import { LoginButton } from "../components/LoginButton";

export default function gql() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { getUser, currentUser, setCurrentUser } = useContext(UserContext);
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { user, session, error } = await supabase.auth.signUp(
				{ email, password },
				{
					data: {
						seen: [],
						liked: [],
						ratings: [],
						reviews: [],
					},
				}
			);
			if (error) throw error;
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			let { user, error } = await supabase.auth.signIn({
				email: email,
				password: password,
			});
			if (error) throw error;
			setCurrentUser(user);
			console.log(user);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};
	const handleGoogle = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const { user, session, error } = await supabase.auth.signIn({
				provider: "google",
			});
			if (error) throw error;
			setCurrentUser(user);
			console.log(user);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};
	const addData = async (e) => {
		e.preventDefault();
		try {
			const { user, error } = await supabase.auth.update({
				data: { hello: "worldddddd" },
			});
			console.log(user);
			// getData();
		} catch (err) {
			console.log(err);
		}
	};
	const getData = async (e) => {
		e.preventDefault();
		try {
			const user = await supabase.auth.user();
			console.log(user);
			alert(user.user_metadata);
		} catch (err) {
			console.log(err);
		}
	};
	const getContext = () => {
		getUser();
		console.log(currentUser);
	};

	// let [isOpen, setIsOpen] = useState(false);

	// function closeModal() {
	// 	setIsOpen(false);
	// }

	// function openModal() {
	// 	setIsOpen(true);
	// }
	// return (
	// 	<>
	// 		<div className='fixed inset-0 flex items-center justify-center'>
	// 			<button
	// 				type='button'
	// 				onClick={openModal}
	// 				className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
	// 			>
	// 				Open dialog
	// 			</button>
	// 		</div>

	// 		<Transition appear show={isOpen} as={Fragment}>
	// 			<Dialog
	// 				as='div'
	// 				className='fixed inset-0 z-10 overflow-y-auto'
	// 				// onClose={() => {}}
	// 				onClose={closeModal}
	// 			>
	// 				<div className='px-4 text-left'>
	// 					<Transition.Child
	// 						as={Fragment}
	// 						enter='ease-out duration-300'
	// 						enterFrom='opacity-0 scale-95'
	// 						enterTo='opacity-100 scale-100'
	// 						leave='ease-in duration-200'
	// 						leaveFrom='opacity-100 scale-100'
	// 						leaveTo='opacity-0 scale-95'
	// 					>
	// 						<div className='flex justify-center'>
	// 							<LoginModal closeModal={closeModal} />
	// 						</div>
	// 					</Transition.Child>
	// 				</div>
	// 			</Dialog>
	// 		</Transition>
	// 	</>
	// );
}*/
