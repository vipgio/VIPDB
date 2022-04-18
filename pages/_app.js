import "../styles/globals.css";
import Layout from "../components/Layout";
import TitleContextProvider from "../context/TitleContext";
import UserContextProvider from "../context/UserContext";

function MyApp({ Component, pageProps }) {
	return (
		<UserContextProvider>
			<Layout>
				<TitleContextProvider>
					<Component {...pageProps} />
				</TitleContextProvider>
			</Layout>
		</UserContextProvider>
	);
}

export default MyApp;
