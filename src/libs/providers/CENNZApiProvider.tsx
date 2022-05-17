import React, { createContext, useLayoutEffect, useContext, ReactNode } from "react";
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
	const { state, setState } = useApi();

	// once state is initialized, update with our values
	useLayoutEffect(() => {
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

		const tokenSymbol = registry.createType("Text", "");
		const tokenDecimals = [registry.createType("u32", 4)];
		const ss58Format = registry.chainSS58;
		registry.setChainProperties(
			registry.createType("ChainProperties", {
				ss58Format,
				tokenDecimals,
				tokenSymbol,
			})
		);
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
