// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sanitize } from "./util";
import { chainColours } from "@/libs/constants";

export * from "./logos";

export function getSystemIcon(
	_systemName: string,
	_specName: string
): "beachball" {
	return "beachball";
}

export function getSystemColor(systemChain: string): string | undefined {
	return chainColours[sanitize(systemChain)];
}
