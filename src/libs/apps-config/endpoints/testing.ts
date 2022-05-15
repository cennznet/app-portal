// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "../types";
import type { LinkOption } from "./types";

import { expandEndpoints } from "./util";

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

export function createTesting(
	t: TFunction,
	firstOnly: boolean,
	withSort: boolean
): LinkOption[] {
	return expandEndpoints(
		t,
		[
			{
				info: "rata",
				text: t("rpc.test.rata", "CENNZnet Rata", { ns: "apps-config" }),
				providers: {
					CENNZnet: "wss://rata.centrality.me/public/ws",
				},
			},
			{
				info: "nikau",
				text: t("rpc.test.nikau", "CENNZnet Nikau", { ns: "apps-config" }),
				providers: {
					CENNZnet: "wss://nikau.centrality.me/public/ws",
				},
			},
		],
		firstOnly,
		withSort
	);
}
