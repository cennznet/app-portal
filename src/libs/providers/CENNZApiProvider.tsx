import React, { createContext, useEffect, useContext, ReactNode } from "react";
import { useApi } from "@polkadot/react-hooks";
import registry from "@polkadot/react-api/typeRegistry";

type CENNZApiContextType = {};

const CENNZApiContext = createContext<CENNZApiContextType>(
	{} as CENNZApiContextType
);

interface CENNZApiProviderProps {
	children: ReactNode;
}

function CENNZApiProvider({
	children,
}: CENNZApiProviderProps): React.ReactElement {
	const { isApiInitialized, state, setState } = useApi();

	useEffect(() => {
		if (!isApiInitialized) return;

		const tokenSymbol = registry.createType("Text", "");
		const tokenDecimals = [registry.createType("u32", 4)];
		const ss58Format = registry.chainSS58;
		console.log("setting new chain properties");
		registry.setChainProperties(
			registry.createType("ChainProperties", {
				ss58Format,
				tokenDecimals,
				tokenSymbol,
			})
		);
	}, [isApiInitialized]);

	useEffect(() => {
		if (!state?.systemChain || !state?.systemName) return;
		if (
			!state.systemChain.includes("CENNZnet") ||
			!state.systemName.includes("CENNZnet")
		)
			return;

		const removeCENNZnet = (str: string) => str.replace("CENNZnet ", "");

		setState({
			...state,
			systemChain: removeCENNZnet(state.systemChain),
			systemName: removeCENNZnet(state.systemName),
		});
	}, [state]);

	return (
		<CENNZApiContext.Provider value={{} as CENNZApiContextType}>
			{children}
		</CENNZApiContext.Provider>
	);
}

export default CENNZApiProvider;

export function useCENNZApi(): CENNZApiContextType {
	return useContext(CENNZApiContext);
}
