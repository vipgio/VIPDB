import Link from "next/link";

export const LinkHandler = ({ type, id, name }) => {
	// console.log(type, id, name)
	return (
		<Link
			href={`/${type}/${id}-${name
				.toLowerCase()
				.replace(/[ ]/g, "-")
				.replace(/[,:;'.]/g, "")}`}
		>
			<a className='hover:text-sky-400'>{name}</a>
		</Link>
	);
};
