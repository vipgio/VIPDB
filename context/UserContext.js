import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
	const supabase = createClient(supabaseUrl, supabaseKey);
	const [loading, setLoading] = useState(false);
	const [modalType, setModalType] = useState("");
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const user = localStorage.getItem("user");
		setCurrentUser(user ? JSON.parse(user) : null);
	}, []);

	const getUser = async () => {
		const user = await supabase.auth.user();
		setCurrentUser(user);
		localStorage.setItem("user", JSON.stringify(user));
	};

	const handleLogin = async (email, password) => {
		try {
			setLoading(true);
			let { user, error } = await supabase.auth.signIn(
				{
					email: email,
					password: password,
				},
				{
					redirectTo: "https://vipdb.vercel.app/",
				}
			);
			if (error) throw error;
			setCurrentUser(user);
			localStorage.setItem("user", JSON.stringify(user));
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSignUp = async (email, password, closeModal) => {
		try {
			setLoading(true);
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
			if (error) throw error;
			if (!error) {
				alert("User created successfully");
				closeModal();
				setCurrentUser(user);
				localStorage.setItem("user", JSON.stringify(user));
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
			localStorage.setItem("user", null);
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
			getUser();
		} catch (err) {
			console.log(err);
		}
	};
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
				loading,
				setModalType,
				modalType,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
