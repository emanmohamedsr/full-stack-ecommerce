import { Skeleton, Stack, Box, VStack } from "@chakra-ui/react";

const ProductPageSkeleton = () => {
	return (
		<VStack>
			<Skeleton height='35px' width='30%' />
			<Stack
				width='full'
				as={Stack}
				direction={"column"}
				md={{ flexDirection: "row" }}>
				<Skeleton height='200px' w={"full"} md={{ width: "200px" }} />
				<Box height='200px' w={"full"} flex={1}>
					<Stack gap={3} p={0} md={{ padding: "15px" }}>
						<Skeleton height='25px' width='30%' />
						<Skeleton height='20px' width='95%' />

						<Stack direction={"row"} gap={"4px"}>
							<Skeleton height='15px' width='20%' />
							<Skeleton height='15px' width='20%' />
							<Skeleton height='15px' width='20%' />
						</Stack>
						<Skeleton height='20px' width='15%' />
						<Skeleton height='35px' width='30%' />
					</Stack>
				</Box>
			</Stack>
		</VStack>
	);
};

export default ProductPageSkeleton;
