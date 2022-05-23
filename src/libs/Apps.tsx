// Copyright 2017-2022 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {
	BareProps as Props,
	ThemeDef,
} from "@polkadot/react-components/types";

import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";

import { getSystemColor } from "@polkadot/apps-config/ui";
import AccountSidebar from "@polkadot/app-accounts/Sidebar";
import GlobalStyle from "@polkadot/react-components/styles";
import { useApi } from "@polkadot/react-hooks";
import Signer from "@polkadot/react-signer";

import ConnectingOverlay from "./overlays/Connecting";
import Content from "./Content";
import Menu from "./Menu";
import WarmUp from "./WarmUp";

import { useApiOverride } from "@/libs/hooks";

export const PORTAL_ID = "portals";

function Apps({ className = "" }: Props): React.ReactElement<Props> {
	const { theme } = useContext(ThemeContext as React.Context<ThemeDef>);
	const { systemChain } = useApi();

	const uiHighlight = useMemo(() => getSystemColor(systemChain), [systemChain]);

	useApiOverride();

	return (
		<>
			<GlobalStyle uiHighlight={uiHighlight || "#808080"} />
			<div className={`apps--Wrapper theme--${theme} ${className}`}>
				<Menu />
				<AccountSidebar>
					<Signer>
						<Content />
					</Signer>
					<ConnectingOverlay />
					<div id={PORTAL_ID} />
				</AccountSidebar>
			</div>
			<WarmUp />
		</>
	);
}

export default React.memo(styled(Apps)`
	background: var(--bg-page);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	.--hidden {
		display: none;
	}
`);
