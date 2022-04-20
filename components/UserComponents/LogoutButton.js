import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const LogoutButton = () => {
	const { handleLogout } = useContext(UserContext);
	return (
		<>
			<div className='flex items-center justify-center'>
				<button
					type='button'
					onClick={handleLogout}
					className='rounded-md bg-rose-600 py-2 px-4 text-slate-100 outline-rose-200 hover:bg-rose-400 focus:outline'
				>
					Logout
				</button>
			</div>
		</>
	);
};
