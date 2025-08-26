import type { IProduct } from "@/interfaces/Product";

export const addProductToCart = (
	product: IProduct,
	products: IProduct[],
): IProduct[] => {
	const existingProduct = products.find((p) => p.id === product.id);
	if (existingProduct)
		return products.map((p) =>
			p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
		);
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
		return cartProducts.filter((p) => p.id !== product.id);
	}
	return cartProducts.map((p) =>
		p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
	);
};

export const handleIncreaseProductCartQuantity = (
	cartProducts: IProduct[],
	product: IProduct,
) => {
	return cartProducts.map((p) =>
		p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
	);
};

export const toCapitalize = (word: string) => {
	return word[0].toUpperCase() + word.slice(1);
};
