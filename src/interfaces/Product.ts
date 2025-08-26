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
	category: ICategory;
	quantity: number;
}
