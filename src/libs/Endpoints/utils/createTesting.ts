import { TFunction } from "@polkadot/apps-config/types";
import { LinkOption } from "@polkadot/apps-config/endpoints/types";
import { expandEndpoints } from "@polkadot/apps-config/endpoints/util";

export default function createTesting(
	t: TFunction,
	firstOnly: boolean,
	withSort: boolean
): LinkOption[] {
	return expandEndpoints(
		t,
		[
			{
				info: "rata",
				text: t("rpc.test.rata", "CENNZnet Rata", { ns: "apps-config" }),
				providers: {
					CENNZnet: "wss://rata.centrality.me/public/ws",
				},
			},
			{
				info: "nikau",
				text: t("rpc.test.nikau", "CENNZnet Nikau", { ns: "apps-config" }),
				providers: {
					CENNZnet: "wss://nikau.centrality.me/public/ws",
				},
			},
		],
		firstOnly,
		withSort
	);
}
