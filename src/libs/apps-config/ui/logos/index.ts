// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint sort-keys: ["error", "asc", { caseSensitive: false }] */

// The mapping here is done on the actual chain name (system.chain RPC) or
// the actual RPC node it is corrected to (system.name RPC)

// anything for a specific chain, most would probably fit into the node category (but allow for chain-specific)
import { sanitize } from "@/libs/apps-config/ui/util";
import emptyLogo from "@/libs/apps-config/ui/logos/empty.svg";
import extensionCENNZnet from "@/libs/apps-config/ui/logos/extensions/cennznet.svg";
import extensionPolkadotJs from "@/libs/apps-config/ui/logos/extensions/polkadot-js.svg";
import chainCENNZnet from "@/libs/apps-config/ui/logos/chains/cennznet.svg";
import chainDevelopment from "@/libs/apps-config/ui/logos/chains/development.svg";
import chainAzalea from "@/libs/apps-config/ui/logos/chains/azalea.svg";
import chainNikau from "@/libs/apps-config/ui/logos/chains/nikau.svg";
import chainRata from "@/libs/apps-config/ui/logos/chains/rata.svg";

// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via system.chain RPC
export const chainLogos = Object.entries({
	"cennznet azalea": chainCENNZnet,
	"cennznet nikau": chainCENNZnet,
	"cennznet rata": chainCENNZnet,
	"development": chainDevelopment,
}).reduce<Record<string, unknown>>(
	(logos, [chain, logo]) => ({
		...logos,
		[sanitize(chain)]: logo,
	}),
	{}
);

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via system.name RPC
export const nodeLogos = Object.entries({}).reduce<Record<string, unknown>>(
	(logos, [node, logo]) => ({
		...logos,
		[sanitize(node)]: logo,
	}),
	{}
);

// Alphabetical overrides based on the actual specName
export const specLogos = Object.entries({}).reduce<Record<string, unknown>>(
	(logos, [spec, logo]) => ({
		...logos,
		[sanitize(spec)]: logo,
	}),
	{}
);

// Alphabetical overrides when we pass an explicit logo name
// NOTE: Matches with what is defined as "info" in settings/endpoints.ts
// (Generally would be the 'network' key in the known ss58 as per
// https://github.com/polkadot-js/common/blob/master/packages/networks/src/index.ts)
export const namedLogos: Record<string, unknown> = {
	azalea: chainAzalea,
	nikau: chainNikau,
	rata: chainRata,
	local: chainDevelopment,
};

// extension logos
export const extensionLogos: Record<string, unknown> = {
	"cennznet": extensionCENNZnet,
	"polkadot-js": extensionPolkadotJs,
};

// external logos, i.e. for explorers
export const externalLogos: Record<string, unknown> = {};

// empty logos
export const emptyLogos: Record<string, unknown> = {
	empty: emptyLogo,
};

// preload all
[
	chainLogos,
	extensionLogos,
	externalLogos,
	namedLogos,
	nodeLogos,
	emptyLogos,
].forEach((imageSet): void => {
	Object.values(imageSet).forEach((src): void => {
		new Image().src = src as string;
	});
});
