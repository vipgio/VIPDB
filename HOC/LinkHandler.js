import Link from "next/link";

export const LinkHandler = ({ type, id, name, style, func, component }) => {
	// console.log(type, id, name)
	return (
		<Link
			href={`/${type}/${id ? `${id}-` : ""}${name
				.toLowerCase()
				.replace(/[ ]/g, "-")
				.replace(/[,:;'.]/g, "")}`}
		>
			<a className={`hover:text-sky-400 ${style}`} onClick={func}>
				{component ? component : name}
			</a>
		</Link>
	);
};
