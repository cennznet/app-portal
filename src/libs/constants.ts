import { AzaleaSVG, NikauSVG, RataSVG, CENNZGreySVG } from "@/libs/assets";

export const CUSTOM_ENDPOINT_KEY = "app-portal-custom-endpoints";

export const namedLogos: Record<string, unknown> = {
	azalea: AzaleaSVG,
	nikau: NikauSVG,
	rata: RataSVG,
	default: CENNZGreySVG,
};

export const chainLogos: Record<string, unknown> = {
	"cennznet azalea": AzaleaSVG,
	"cennznet nikau": NikauSVG,
	"cennznet rata": RataSVG,
};
