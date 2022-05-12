import {TFunction} from "@polkadot/apps-config/types";
import {LinkOption} from "@polkadot/apps-config/endpoints/types";
import {expandEndpoints} from "@polkadot/apps-config/endpoints/util";

export default function createProduction (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [
    {
      info: 'azalea',
      text: t('rpc.prod.azalea', 'CENNZnet Azalea', { ns: 'apps-config' }),
      providers: {
        'CENNZnet': 'wss://cennznet.unfrastructure.io/public/ws'
      }
    },
  ], firstOnly, withSort);
}
