// Copyright 2017-2022 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import type { Balance } from "@cennznet/types";

import React from 'react';

import FormatBalance from './FormatBalance';

import { useCENNZBalances } from "@/libs/hooks";

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function BalanceFree ({ children, className = '', label, params }: Props): React.ReactElement<Props> {
  const [, cpayBalance] = useCENNZBalances(params as string, "free") as Balance[];

  return (
    <FormatBalance
      className={className}
      label={label}
      value={cpayBalance}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(BalanceFree);
