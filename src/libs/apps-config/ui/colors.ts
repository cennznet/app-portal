// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint sort-keys: ["error", "asc", { caseSensitive: false }] */

import { sanitize } from "@/libs/apps-config/ui/util";

// The mapping here is done on the actual chain name (system.chain RPC) or
// the actual RPC node it is corrected to (system.name RPC)

// defaults
const emptyColor = "#99999";

export { emptyColor };

const cennzAzalea = "#1130FF";
const cennzNikau = "#05b210";
const cennzRata = "#9847FF";

// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via the system.chain RPC
export const chainColors: Record<string, string> = Object.entries({
	"CENNZnet Azalea": cennzAzalea,
	"CENNZnet Nikau": cennzNikau,
	"CENNZnet Rata": cennzRata,
}).reduce<Record<string, string>>(
	(colors, [node, color]) => ({
		...colors,
		[sanitize(node)]: color,
	}),
	{}
);

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via the system.name RPC
// export const specColors = Object.entries({}).reduce<Record<string, string>>((colors, [spec, color]) => ({
//   ...colors,
//   [sanitize(spec)]: color
// }), {});
