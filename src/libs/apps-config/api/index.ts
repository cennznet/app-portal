// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleType } from "@polkadot/types/types";

import typesChain from "@/libs/apps-config/api/chain";

export * from "@/libs/apps-config/api/constants";
export * from "@/libs/apps-config/api/params";

export function getChainTypes(
	_specName: string,
	chainName: string
): Record<string, string | Record<string, unknown>> {
	return {
		...(typesChain[chainName as keyof typeof typesChain] || {}),
	};
}

export const typesBundle: OverrideBundleType = {};

export { typesChain };
