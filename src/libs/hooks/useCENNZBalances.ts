import type { Balance } from "@cennznet/types";

import { createNamedHook, useApi, useCallMulti } from "@polkadot/react-hooks";

/**
 * Gets CENNZ balances for account
 *
 * @param accountAddress The account address of which balance is to be returned
 * @returns CENNZ balances
 */
function useCENNZBalancesImpl(accountAddress: string) {
	const { api, systemChain } = useApi();

	const isAzalea = systemChain.includes("Azalea");
	const CENNZ = isAzalea ? "1" : "16000";
	const CPAY = isAzalea ? "2" : "16001";

	return useCallMulti<Balance[]>([
		[api.query?.genericAsset?.freeBalance, [CENNZ, accountAddress]],
		[api.query?.genericAsset?.freeBalance, [CPAY, accountAddress]],
	]);
}

export const useCENNZBalances = createNamedHook(
	"useCENNZBalances",
	useCENNZBalancesImpl
);
