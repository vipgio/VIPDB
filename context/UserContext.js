import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const getUser = async () => {
		const user = await supabase.auth.user();
		setCurrentUser(user);
		console.log(user);
	};

	const handleLogin = async (email, password) => {
		try {
			setLoading(true);
			let { user, error } = await supabase.auth.signIn({
				email: email,
				password: password,
			});
			if (error) throw error;
			setCurrentUser(user);
			// console.log(user);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSignUp = async (email, password, closeModal) => {
		try {
			setLoading(true);
			console.log(email, password);
			const { user, session, error } = await supabase.auth.signUp(
				{ email: email, password: password },
				{
					data: {
						seen: [],
						liked: [],
						ratings: [],
						reviews: [],
						watchlist: [],
					},
				}
			);
			console.log(user, session, error);
			if (error) throw error;
			if (!error) {
				alert("User created successfully");
				closeModal();
				setCurrentUser(user);
			}
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const recovery = async (email, closeModal) => {
		try {
			setLoading(true);
			let { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
			console.log(data);
			if (error) throw error;
			if (!error) {
				alert("Password reset email sent");
				closeModal();
			}
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		try {
			setLoading(true);
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
			setCurrentUser(null);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const addData = async (data) => {
		try {
			const { user, error } = await supabase.auth.update({
				data: data,
			});
			// console.log(user);
			getUser();
		} catch (err) {
			console.log(err);
		}
	};

	const getSession = () => {
		console.log(supabase.auth.session());
	};

	const clearData = async () => {
		try {
			const { user, error } = await supabase.auth.update({
				data: {
					seen: [],
					liked: [],
					ratings: [],
					reviews: [],
					watchlist: [],
				},
			});
			getUser();
		} catch (err) {
			console.log(err);
		}
	};
	// const loadingValue = () => {
	// 	const defTasks = localStorage.getItem("localSession");
	// 	return defTasks ? JSON.parse(defTasks) : [];
	// };

	// useEffect(() => {
	// 	localStorage.setItem("localSession", JSON.stringify(tasks));
	// }, [currentUser]);
	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				getUser,
				handleSignUp,
				handleLogin,
				handleLogout,
				recovery,
				addData,
				getSession,
				clearData,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
