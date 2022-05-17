import { createNamedHook, useApi } from "@polkadot/react-hooks";
import { useCallback } from "react";
import registry from "@polkadot/react-api/typeRegistry";

/**
 * Override Api with CENNZnet values
 */
function useApiOverrideImpl(): () => void {
	const { state, setState } = useApi();

	return useCallback(() => {
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
}

export const useApiOverride = createNamedHook(
	"useApiOverride",
	useApiOverrideImpl
);