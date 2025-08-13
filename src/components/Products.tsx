import { HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import type { IProduct } from "@/interfaces";

interface IProps {
	products: IProduct[];
}

const Products = ({ products }: IProps) => {
	return (
		<HStack flexWrap={"wrap"} justifyContent='center' gap={4} p={4}>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</HStack>
	);
};

export default Products;
