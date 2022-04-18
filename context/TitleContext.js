import { createContext, useState } from "react";

export const TitleContext = createContext();

const TitleContextProvider = (props) => {
	const [currentTitle, setCurrentTitle] = useState({});

	return (
		<TitleContext.Provider
			value={{
				currentTitle,
				setCurrentTitle,
			}}
		>
			{props.children}
		</TitleContext.Provider>
	);
};

export default TitleContextProvider;
