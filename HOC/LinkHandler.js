import Link from "next/link";

export const LinkHandler = ({ type, id, name, style, func, component }) => {
	return (
		<Link
			href={`/${type}/${id ? `${id}-` : ""}${name
				.toLowerCase() // lowercase
				.normalize("NFD") // remove accents
				.replace(/[\u0300-\u036f]/g, "") // remove diacritics
				.replace(/[ ]/g, "-") // replace spaces with -
				.replace(/[,:;'.]/g, "")}`} // remove ,:;'
		>
			<a className={`hover:text-sky-400 ${style}`} onClick={func}>
				{component ? component : name}
			</a>
		</Link>
	);
};
