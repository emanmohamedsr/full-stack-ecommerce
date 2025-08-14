import { HStack } from "@chakra-ui/react";
import ProductSkeleton from "./ProductSkeleton";

interface IProps {
	count?: number;
}

const ProductsSkeleton = ({ count = 6 }: IProps) => {
	return (
		<HStack flexWrap={"wrap"} justifyContent='center' gap={4} p={4}>
			{Array.from({ length: count }).map((_, idx) => (
				<ProductSkeleton key={idx} />
			))}
		</HStack>
	);
};

export default ProductsSkeleton;
