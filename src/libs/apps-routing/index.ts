// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from "i18next";
import type { Routes } from "@polkadot/apps-routing/types";

import accounts from "@polkadot/apps-routing/accounts";
import addresses from "@polkadot/apps-routing/addresses";
import explorer from "@polkadot/apps-routing/explorer";
import extrinsics from "@polkadot/apps-routing/extrinsics";
import files from "@polkadot/apps-routing/files";
import js from "@polkadot/apps-routing/js";
import rpc from "@polkadot/apps-routing/rpc";
import settings from "@polkadot/apps-routing/settings";
import signing from "@polkadot/apps-routing/signing";
import sudo from "@polkadot/apps-routing/sudo";

export default function create(t: TFunction): Routes {
	return [
		accounts(t),
		addresses(t),
		explorer(t),
		extrinsics(t),
		rpc(t),
		signing(t),
		sudo(t),
		files(t),
		js(t),
		settings(t),
	];
}
