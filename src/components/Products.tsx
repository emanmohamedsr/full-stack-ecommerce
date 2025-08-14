import { HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/services/products";
import type { IProduct } from "@/interfaces";

const Products = () => {
	const { isError, isLoading, data } = useGetProductsQuery({});
	const products = data?.data || [];
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		throw new Error("Failed to fetch products");
	}

	if (products.length === 0) {
		return <div>No products available</div>;
	}
	return (
		<HStack flexWrap={"wrap"} justifyContent='center' gap={4} p={4}>
			{products.map((item: IProduct) => (
				<ProductCard key={item.id} product={item} />
			))}
		</HStack>
	);
};

export default Products;
