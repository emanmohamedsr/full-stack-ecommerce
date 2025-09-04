import { toaster } from "@/config/toaster";
import type { IProduct } from "@/interfaces/Product";

export const addProductToCart = (
	product: IProduct,
	products: IProduct[],
): IProduct[] => {
	const existingProduct = products.find((p) => p.id === product.id);
	if (existingProduct) {
		toaster.create({
			description: "Product quantity increased",
			type: "info",
			closable: true,
		});
		return products.map((p) =>
			p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
		);
	}
	toaster.create({
		description: "Product added to cart",
		type: "info",
		closable: true,
	});
	return [...products, { ...product, quantity: 1 }];
};

export const calcTotalPrice = (cartProducts: IProduct[]): number => {
	return cartProducts.reduce((acc, product) => {
		return acc + product.price * (product.quantity || 1);
	}, 0);
};

export const handleDecreaseProductCartQuantity = (
	cartProducts: IProduct[],
	product: IProduct,
) => {
	if (product.quantity === 1) {
		toaster.create({
			description: "Product removed from cart",
			type: "info",
			closable: true,
		});
		return cartProducts.filter((p) => p.id !== product.id);
	}
	toaster.create({
		description: "Product quantity decreased",
		type: "info",
		closable: true,
	});
	return cartProducts.map((p) =>
		p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
	);
};

export const handleIncreaseProductCartQuantity = (
	cartProducts: IProduct[],
	product: IProduct,
) => {
	toaster.create({
		description: "Product quantity increased",
		type: "info",
		closable: true,
	});
	return cartProducts.map((p) =>
		p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
	);
};

export const toCapitalize = (word: string) => {
	return word[0].toUpperCase() + word.slice(1);
};

export const textSlice = (text: string, length: number) => {
	if (text.length <= length) return text;
	return text.slice(0, length) + "...";
};
