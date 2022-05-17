// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "i18next";
import type { Routes } from "@/libs/apps-routing/types";

import accounts from "@/libs/apps-routing/accounts";
import addresses from "@/libs/apps-routing/addresses";
import explorer from "@/libs/apps-routing/explorer";
import extrinsics from "@/libs/apps-routing/extrinsics";
import files from "@/libs/apps-routing/files";
import js from "@/libs/apps-routing/js";
import rpc from "@/libs/apps-routing/rpc";
import settings from "@/libs/apps-routing/settings";
import signing from "@/libs/apps-routing/signing";
import storage from "@polkadot/apps-routing/storage";
import sudo from "@/libs/apps-routing/sudo";

export default function create(t: TFunction): Routes {
	return [
		accounts(t),
		addresses(t),
		explorer(t),
		storage(t),
		extrinsics(t),
		rpc(t),
		signing(t),
		sudo(t),
		files(t),
		js(t),
		settings(t),
	];
}
