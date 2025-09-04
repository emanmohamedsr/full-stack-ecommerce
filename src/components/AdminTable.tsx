import { Table } from "@chakra-ui/react";
import ActionsCell from "./ActionsCell";
import ProductCell from "./ProductCell";
import type { IProduct } from "@/interfaces/Product";

interface IProps {
	data: Array<IProduct>;
}

const AdminTable = ({ data }: IProps) => {
	return (
		<Table.ScrollArea
			borderWidth='1px'
			borderTop={"none"}
			maxW='100%'
			minH='400px'>
			<Table.Root size='sm' variant='line' striped>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader textAlign={"center"} minW='300px'>
							Product
						</Table.ColumnHeader>
						<Table.ColumnHeader textAlign={"center"} minW='200px'>
							Actions
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data.map((item) => (
						<Table.Row key={item.id}>
							<Table.Cell>
								<ProductCell
									category={item.category}
									title={item.title}
									price={item.price}
									thumbnail={item.thumbnail?.url}
								/>
							</Table.Cell>
							<Table.Cell>
								<ActionsCell product={item} />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Table.ScrollArea>
	);
};

export default AdminTable;
