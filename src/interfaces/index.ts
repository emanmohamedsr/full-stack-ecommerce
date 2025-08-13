import type { ColorMode } from "@/types";

export interface UseColorModeReturn {
	colorMode: ColorMode;
	setColorMode: (colorMode: ColorMode) => void;
	toggleColorMode: () => void;
}

export interface IProduct {
	id: number;
	title: string;
	description: string;
	thumbnail: {
		url: string;
	};
	stock: number;
	price: number;
	category: string;
}

export interface IAxiosError {
	response: {
		data: {
			message: string;
		};
	};
}

export interface IThumbnail {
	formats: {
		thumbnail: {
			url: string;
		};
	};
}
