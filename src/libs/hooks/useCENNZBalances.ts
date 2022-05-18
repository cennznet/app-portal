import type { Balance, Codec } from "@cennznet/types";

import {
	createNamedHook,
	useApi,
	useCall,
	useCallMulti,
} from "@polkadot/react-hooks";

/**
 * Gets CENNZ balances for account
 *
 * @param accountAddress The account address of which balance is to be returned
 * @param type The type of balance to return
 * @returns CENNZ balances
 */
function useCENNZBalancesImpl(
	accountAddress: string,
	type: "free" | "locked"
	// @ts-ignore
): Pick<Balance[], Codec> {
	const { api, systemChain } = useApi();

	const isAzalea = systemChain.includes("Azalea");
	const CENNZ = isAzalea ? "1" : "16000";
	const CPAY = isAzalea ? "2" : "16001";

	if (type === "locked")
		return useCall<any>(api.query.genericAsset.locks, [CENNZ, accountAddress]);

	return useCallMulti<Balance[]>(
		[CENNZ, CPAY].map((assetId) => [
			api.query.genericAsset.freeBalance,
			[assetId, accountAddress],
		])
	);
}

export const useCENNZBalances = createNamedHook(
	"useCENNZBalances",
	useCENNZBalancesImpl
);
