// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sanitize } from "@polkadot/apps-config/ui/util";
import { chainColors } from "@polkadot/apps-config/ui/colors";

export * from "./logos";

export function getSystemIcon(
	_systemName: string,
	_specName: string
): "beachball" {
	return "beachball";
}

export function getSystemColor(systemChain: string): string | undefined {
	return chainColors[sanitize(systemChain)];
}
