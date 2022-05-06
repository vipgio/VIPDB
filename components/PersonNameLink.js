import Image from "next/image";
import Link from "next/link";

export const PersonNameLink = ({ person }) => {
	return (
		<div className='text-lg'>
			<Link
				href={`/person/${person.id}-${person.name
					.toLowerCase()
					.replace(/[ ]/g, "-")
					.replace(/[,:;'.]/g, "")}`}
			>
				<a className='hover:text-sky-400'>{person.name}</a>
			</Link>
		</div>
	);
};
