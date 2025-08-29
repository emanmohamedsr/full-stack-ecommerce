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

export interface ILocationInputs {
	country: string;
	street_address: string;
	city: string;
	state: string;
	postal_code: string;
}

export interface IPaymentInputs {
	card_name: string;
	card_number: string;
	expiration_date: string;
	cvv: string;
	payment_method: string;
}

export interface ICheckoutData {
	location?: ILocationInputs;
	payment?: IPaymentInputs;
}
