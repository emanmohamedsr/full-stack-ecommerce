import { HStack, Skeleton, Table } from "@chakra-ui/react";
import ProductCellSkeleton from "./ProductCellSkeleton";
import ActionsCellSkeleton from "./ActionsCellSketeton";

const AdminTableSkeleton = () => {
	return (
		<Table.ScrollArea borderWidth='1px' borderTop={"none"} maxW='100%'>
			<Table.Root size='sm' variant='line' striped>
				<Table.Caption captionSide='top'>
					<HStack justifyContent='space-between' w='full' p={4}>
						<Skeleton height='40px' width='120px' rounded='md' />
						<Skeleton height='40px' width='200px' rounded='md' />
					</HStack>
				</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader minW='300px'>
							<Skeleton mx={"auto"} height='40px' width='120px' rounded='md' />
						</Table.ColumnHeader>
						<Table.ColumnHeader minW='200px'>
							<Skeleton mx={"auto"} height='40px' width='200px' rounded='md' />
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{Array.from({ length: 5 }, (_, index) => (
						<Table.Row key={index}>
							<Table.Cell>
								<ProductCellSkeleton />
							</Table.Cell>
							<Table.Cell>
								<ActionsCellSkeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Table.ScrollArea>
	);
};

export default AdminTableSkeleton;
