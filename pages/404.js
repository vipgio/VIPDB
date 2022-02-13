import Link from "next/link";
import Meta from "../components/Meta";

const NotFound = () => {
	return (
		<>
			<Meta title='Page not Found | VIPDB' robots='noindex' />
			<div>
				That page cannot be found. Return to the{" "}
				<Link href='/'>
					<a className='underline'>Homepage</a>
				</Link>
			</div>
		</>
	);
};

export default NotFound;
