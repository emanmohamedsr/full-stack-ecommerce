import { HStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const Products = () => {
	return (
		<HStack flexWrap={"wrap"} justifyContent='center' gap={4} p={4}>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</HStack>
	);
};

export default Products;
