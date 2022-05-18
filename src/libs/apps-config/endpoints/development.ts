// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "@/libs/apps-config/types";
import type { LinkOption } from "@/libs/apps-config/endpoints/types";

import { CUSTOM_ENDPOINT_KEY } from "@/constants";

export function createOwn(t: TFunction): LinkOption[] {
	try {
		// this may not be available, e.g. when running via script
		const storedItems =
			typeof localStorage === "object" &&
			typeof localStorage.getItem === "function"
				? localStorage.getItem(CUSTOM_ENDPOINT_KEY)
				: null;

		if (storedItems) {
			const items = JSON.parse(storedItems) as string[];

			return items.map((textBy) => ({
				info: "local",
				text: t("rpc.dev.custom.own", "Custom", { ns: "apps-config" }),
				textBy,
				value: textBy,
			}));
		}
	} catch (e) {
		console.error(e);
	}

	return [];
}

export function createDev(t: TFunction): LinkOption[] {
	return [
		{
			dnslink: "local",
			info: "local",
			text: t("rpc.dev.local", "Local Node", { ns: "apps-config" }),
			textBy: "127.0.0.1:9944",
			value: "ws://127.0.0.1:9944",
		},
	];
}
