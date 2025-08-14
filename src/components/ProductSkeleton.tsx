import { Box, Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
	return (
		<Card.Root width='320px'>
			<Card.Body gap='2'>
				<Skeleton height={"200px"} md={{ height: "250px" }} mx='auto' />
				<Card.Title mt='2'>
					<Skeleton height='20px' width='60%' />
				</Card.Title>
				<Card.Description>
					<SkeletonText noOfLines={3} gap='4' />
				</Card.Description>
				<Box mt='2' fontSize={"sm"}>
					<Skeleton height='20px' width='40%' />
				</Box>
				<Box fontSize={"xs"} color='gray.500'>
					<Skeleton height='16px' width='30%' />
				</Box>
			</Card.Body>
			<Card.Footer justifyContent='flex-end'>
				<Skeleton height='40px' width='100px' />
				<Skeleton height='40px' width='100px' />
			</Card.Footer>
		</Card.Root>
	);
};

export default ProductSkeleton;
