// Copyright 2017-2022 @polkadot/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from "react";

import { useApi } from "@polkadot/react-hooks";

import useChainInfo from "@/libs/page-settings/useChainInfo";
import Extensions from "@/libs/page-settings/Metadata/Extensions";
import NetworkSpecs from "@/libs/page-settings/Metadata/NetworkSpecs";

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
