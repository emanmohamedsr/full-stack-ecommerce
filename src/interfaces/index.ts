import type { ColorMode } from "@/types";

export interface UseColorModeReturn {
	colorMode: ColorMode;
	setColorMode: (colorMode: ColorMode) => void;
	toggleColorMode: () => void;
}

export interface ICategory {
	id: number;
	documentId: string;
	title: string;
}
export interface IProduct {
	documentId: string;
	id: number;
	title: string;
	description: string;
	thumbnail: {
		url: string;
	};
	stock: number;
	price: number;
	category: ICategory[];
}

export interface IError {
	data: {
		error?: {
			status?: number;
			message?: string;
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
