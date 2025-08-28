import { useColorMode } from "@/hooks/useColorMode";
import { Box, Center, Stack, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductCellSkeleton = () => {
	const { colorMode } = useColorMode();

	return (
		<Center py={12}>
			<Box
				role={"group"}
				p={6}
				maxW={"250px"}
				w={"full"}
				bg={colorMode === "light" ? "white" : "gray.800"}
				boxShadow={"2xl"}
				rounded={"lg"}
				pos={"relative"}
				zIndex={1}>
				<Box
					rounded={"lg"}
					mt={-12}
					pos={"relative"}
					height={"150px"}
					opacity={0.4}>
					<Skeleton rounded={"lg"} height={"180px"} width={282} />
				</Box>

				<Stack pt={10} align={"center"} maxW={"250px"} gap={3}>
					<Skeleton height='20px' width='60px' rounded='md' />
					<SkeletonText noOfLines={2} gap='3' height='4' />
					<Skeleton height='20px' width='50px' rounded='md' />
				</Stack>
			</Box>
		</Center>
	);
};

export default ProductCellSkeleton;
