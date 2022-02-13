import Meta from "./Meta";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Meta />
			<div className='relative mx-auto max-w-screen-2xl px-4'>
				<Navbar />
				{children}
			</div>
		</>
	);
};

export default Layout;
