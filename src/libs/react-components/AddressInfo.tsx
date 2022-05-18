// Copyright 2017-2022 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {
	DeriveBalancesAll,
	DeriveDemocracyLock,
	DeriveStakingAccount,
} from "@polkadot/api-derive/types";
import type { Voting } from "@polkadot/types/interfaces";
import type { BN } from "@polkadot/util";
import type { Balance, Codec } from "@cennznet/types";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FormatBalance } from "@polkadot/react-query";

import Label from "@polkadot/react-components/Label";
import { useTranslation } from "@polkadot/react-components/translate";

import { useCENNZBalances } from "@/libs/hooks";

// true to display, or (for bonded) provided values [own, ...all extras]
export interface BalanceActiveType {
	available?: boolean;
	bonded?: boolean | BN[];
	extraInfo?: [React.ReactNode, React.ReactNode][];
	locked?: boolean;
	redeemable?: boolean;
	reserved?: boolean;
	total?: boolean;
	unlocking?: boolean;
	vested?: boolean;
}

export interface CryptoActiveType {
	crypto?: boolean;
	nonce?: boolean;
}

export interface ValidatorPrefsType {
	unstakeThreshold?: boolean;
	validatorPayment?: boolean;
}

interface Props {
	address: string;
	balancesAll?: DeriveBalancesAll;
	children?: React.ReactNode;
	className?: string;
	democracyLocks?: DeriveDemocracyLock[];
	extraInfo?: [string, string][];
	stakingInfo?: DeriveStakingAccount;
	votingOf?: Voting;
	withBalance?: boolean | BalanceActiveType;
	withBalanceToggle?: false;
	withExtended?: boolean | CryptoActiveType;
	withHexSessionId?: (string | null)[];
	withValidatorPrefs?: boolean | ValidatorPrefsType;
	withLabel?: boolean;
}

// auxiliary component that helps aligning balances details, fills up the space when no icon for a balance is specified
function IconVoid(): React.ReactElement {
	return <span className="icon-void">&nbsp;</span>;
}

function AddressInfo(props: Props): React.ReactElement<Props> {
	const { t } = useTranslation();
	const [lockedCENNZ, setLockedCENNZ] = useState<number>();

	const { children, className = "", withBalanceToggle } = props;

	const withBalance = props.withBalance as {
		total?: boolean;
		locked?: boolean;
	};
	const cennzBalances = useCENNZBalances(
		props.address,
		withBalance?.locked ? "locked" : "free"
	);

	useEffect(() => {
		if (!withBalance?.locked || !cennzBalances) return;
		let cennzLocked = (cennzBalances as Codec)?.toJSON() as {
			amount?: number;
		}[];
		setLockedCENNZ(cennzLocked[0]?.amount);
	}, [withBalance, cennzBalances]);

	return (
		<div
			className={`ui--AddressInfo ${className}${
				withBalanceToggle ? " ui--AddressInfo-expander" : ""
			}`}
		>
			<div className={`column${withBalanceToggle ? " column--expander" : ""}`}>
				{withBalance.total &&
					(cennzBalances as Balance[])?.map((balance, index) => (
						<React.Fragment key={index}>
							<Label label={t<string>(["CENNZ", "CPAY"][index])} />
							<FormatBalance
								className="result"
								formatIndex={0}
								labelPost={<IconVoid />}
								value={balance}
							/>
						</React.Fragment>
					))}
				{withBalance.locked && (
					<React.Fragment>
						<Label label={t<string>("CENNZ")} />
						<FormatBalance
							className="result"
							formatIndex={0}
							labelPost={<IconVoid />}
							value={lockedCENNZ}
						/>
					</React.Fragment>
				)}
			</div>
			{children && <div className="column">{children}</div>}
		</div>
	);
}

export default styled(AddressInfo)`
	align-items: flex-start;
	display: flex;
	flex: 1;
	white-space: nowrap;

	&:not(.ui--AddressInfo-expander) {
		justify-content: flex-end;
	}

	.column {
		max-width: 260px;
		&.column--expander {
			width: 17.5rem;

			.ui--Expander {
				width: 100%;

				.summary {
					display: inline-block;
					text-align: right;
					min-width: 12rem;
				}
			}
		}

		&:not(.column--expander) {
			flex: 1;
			display: grid;
			column-gap: 0.75rem;
			row-gap: 0.5rem;
			opacity: 1;

			div.inner {
				margin-top: 0.25rem;

				&:first-child {
					margin-top: 0;
				}
			}

			label {
				grid-column: 1;
				padding-right: 0.5rem;
				text-align: right;
				vertical-align: middle;

				.help.circle.icon {
					display: none;
				}
			}

			.result {
				grid-column: 2;
				text-align: right;

				.ui--Icon,
				.icon-void {
					margin-left: 0.25rem;
					margin-right: 0;
					padding-right: 0 !important;
				}

				.icon-void {
					float: right;
					width: 1em;
				}
			}
		}
	}
`;
