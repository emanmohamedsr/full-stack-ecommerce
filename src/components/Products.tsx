import { HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/services/productsApi";
import ProductsSkeleton from "./ProductsSkeleton";
import EmptyProductsState from "./EmptyProductsState";
import { VscEmptyWindow } from "react-icons/vsc";
import type { IProduct } from "@/interfaces/Product";

const Products = () => {
	const { isError, error, isLoading, data } = useGetProductsQuery({});
	const products = data?.data || [];
	if (isLoading) {
		return <ProductsSkeleton />;
	}

	if (isError) {
		throw error;
	}

	if (products.length === 0) {
		return (
			<EmptyProductsState
				title='No Products Found'
				description='Looks like there are no products available.'>
				<VscEmptyWindow />
			</EmptyProductsState>
		);
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
