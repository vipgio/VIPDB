import Head from "next/head";

const Meta = ({
	title,
	keywords = "Movie tracking, TV Show tracking, Movies, Television, Shows",
	description = "Track anything that you watch",
	robots,
}) => {
	return (
		<Head>
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<meta name='robots' content={robots} />
			<meta charSet='utf-8' />
			<link rel='icon' href='/favicon.ico' />
			<title>{title}</title>
		</Head>
	);
};

export default Meta;
