import { createNamedHook, useApi } from "@polkadot/react-hooks";
import { useLayoutEffect } from "react";
import registry from "@polkadot/react-api/typeRegistry";

/**
 * Override Api with CENNZnet values
 */
function useApiOverrideImpl() {
	const { api, isApiReady } = useApi();

	useLayoutEffect(() => {
		if (!api || !isApiReady) return;

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
	}, [api, isApiReady]);
}

export const useApiOverride = createNamedHook(
	"useApiOverride",
	useApiOverrideImpl
);
