// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Routes } from '@/libs/Routes/types';

import accounts from '@/libs/Routes/accounts';
import addresses from '@/libs/Routes/addresses';
import explorer from '@/libs/Routes/explorer';
import extrinsics from '@/libs/Routes/extrinsics';
import files from '@/libs/Routes/files';
import js from '@/libs/Routes/js';
import rpc from '@/libs/Routes/rpc';
import settings from '@/libs/Routes/settings';
import signing from '@/libs/Routes/signing';
import sudo from '@/libs/Routes/sudo';

export default function create (t: TFunction): Routes {
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
    settings(t)
  ];
}
