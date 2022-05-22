import { createNamedHook, useApi } from "@polkadot/react-hooks";
import { useLayoutEffect } from "react";
import registry from "@polkadot/react-api/typeRegistry";

/**
 * Override Api with CENNZnet values
 */
function useApiOverrideImpl() {
	const { api, state, setState } = useApi();

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

		registry.setSignedExtensions(api.registry.signedExtensions, {
			ChargeTransactionPayment: {
				extrinsic: {
					tip: "Compact<Balance>",
					feeExchange: "Option<u32>",
				},
				payload: {},
			},
		});
	}, [state, api]);
}

export const useApiOverride = createNamedHook(
	"useApiOverride",
	useApiOverrideImpl
);
