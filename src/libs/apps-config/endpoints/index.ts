// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "../types";
import type { LinkOption } from "./types";

import { defaultT } from "../util";
import { createDev, createOwn } from "./development";
import { createProduction } from "./production";
import { createTesting } from "./testing";

export { CUSTOM_ENDPOINT_KEY } from "./development";

export function createWsEndpoints(
	t: TFunction = defaultT,
	firstOnly = false,
	withSort = true
): LinkOption[] {
	return [
		{
			isDisabled: false,
			isHeader: true,
			isSpaced: true,
			text: t("rpc.header.live", "Live networks", { ns: "apps-config" }),
			textBy: "",
			value: "",
		},
		...createProduction(t, firstOnly, withSort),
		{
			isDisabled: false,
			isHeader: true,
			text: t("rpc.header.test", "Test networks", { ns: "apps-config" }),
			textBy: "",
			value: "",
		},
		...createTesting(t, firstOnly, withSort),
		{
			isDevelopment: true,
			isDisabled: false,
			isHeader: true,
			isSpaced: true,
			text: t("rpc.header.dev", "Development", { ns: "apps-config" }),
			textBy: "",
			value: "",
		},
		...createDev(t),
		...createOwn(t),
	].filter(({ isDisabled }) => !isDisabled);
}
