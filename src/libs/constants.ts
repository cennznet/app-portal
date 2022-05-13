import { AzaleaSVG, NikauSVG, RataSVG, CENNZEmptySVG } from "@/libs/assets";

export const CUSTOM_ENDPOINT_KEY = "app-portal-custom-endpoints";

export const namedLogos: Record<string, unknown> = {
	azalea: AzaleaSVG,
	nikau: NikauSVG,
	rata: RataSVG,
	empty: CENNZEmptySVG,
};

export const chainLogos: Record<string, unknown> = {
	"cennznet azalea": AzaleaSVG,
	"cennznet nikau": NikauSVG,
	"cennznet rata": RataSVG,
	"development": CENNZEmptySVG,
};
