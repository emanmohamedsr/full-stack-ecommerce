import { Flex, Skeleton } from "@chakra-ui/react";

const ActionsCellSkeleton = () => {
	return (
		<Flex align='center' justify='center' gap={2} wrap={"wrap"}>
			<Skeleton height='40px' width='80px' rounded='md' />
			<Skeleton height='40px' width='80px' rounded='md' />
			<Skeleton height='40px' width='100px' rounded='md' />
		</Flex>
	);
};

export default ActionsCellSkeleton;
