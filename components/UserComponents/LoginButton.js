import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { UserContext } from "../../context/UserContext";
export const LoginButton = () => {
	let [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);
	// const { modalType, setModalType } = useContext(UserContext);
	const [modalType, setModalType] = useState("login");
	const changeModal = (type) => {
		setModalType(type);
	};
	return (
		<>
			<div className='flex items-center justify-center'>
				<button
					type='button'
					onClick={() => {
						setModalType("login");
						openModal();
					}}
					className='my-button rounded-md bg-sky-600 py-2 px-4 text-slate-100 outline-sky-200 hover:bg-sky-400 focus:outline'
				>
					Sign in
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 z-10 overflow-y-auto'
					onClose={() => {}}
					// onClose={closeModal}
				>
					<Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
					<div className='px-4 text-left'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<div className='flex justify-center'>
								{modalType === "register" && (
									<RegisterModal closeModal={closeModal} setModalType={setModalType} />
								)}
								{modalType === "login" && (
									<LoginModal closeModal={closeModal} setModalType={setModalType} />
								)}
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
