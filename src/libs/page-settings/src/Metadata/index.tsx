// Copyright 2017-2022 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";

import { useApi } from "@polkadot/react-hooks";

import useChainInfo from "@polkadot/app-settings/useChainInfo";
import Extensions from "@polkadot/app-settings/Metadata/Extensions";
import NetworkSpecs from "@polkadot/app-settings/Metadata/NetworkSpecs";

export default function Metadata(): React.ReactElement {
	const { isDevelopment } = useApi();
	const chainInfo = useChainInfo();

	return (
		<>
			{!isDevelopment && (
				<>
					<Extensions chainInfo={chainInfo} />
				</>
			)}
			<NetworkSpecs chainInfo={chainInfo} />
		</>
	);
}
