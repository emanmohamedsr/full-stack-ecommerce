import type { ICategory } from "./Product";

export interface IFormInputs {
	title: string;
	description: string;
	thumbnail: string;
	price: number;
	stock: number;
	category: string;
}

export interface IDataPayLoad
	extends Omit<IFormInputs, "category" | "thumbnail"> {
	category: ICategory | null;
	thumbnail: { url: string } | null;
}
