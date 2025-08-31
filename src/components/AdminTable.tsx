import { Button, HStack, Spinner, Table, Text } from "@chakra-ui/react";
import DrawerForm from "./DrawerForm";
import ActionsCell from "./ActionsCell";
import ProductCell from "./ProductCell";
import type { IProduct } from "@/interfaces/Product";
import type { IFormInputs } from "@/interfaces/FormInputs";

interface IProps {
	adminName?: string;
	data: Array<IProduct>;
	isLoadingAddProduct: boolean;
	onAddProduct: (data: IFormInputs) => Promise<void>;
}

const AdminTable = ({
	adminName = "Admin",
	data,
	isLoadingAddProduct,
	onAddProduct,
}: IProps) => {
	return (
		<Table.ScrollArea borderWidth='1px' borderTop={"none"} maxW='100%'>
			<Table.Root size='sm' variant='line' striped>
				<Table.Caption captionSide='top'>
					<HStack justifyContent='space-between' w='full' p={4}>
						<DrawerForm onSubmit={onAddProduct}>
							<Button
								disabled={isLoadingAddProduct}
								_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
								bg='teal.700'
								color='white'>
								{isLoadingAddProduct && <Spinner size='sm' />}
								{isLoadingAddProduct ? "Adding..." : "Add Product"}
							</Button>
						</DrawerForm>
						<Text fontSize='lg'>
							Welcome back, <strong>{adminName}</strong>
						</Text>
					</HStack>
				</Table.Caption>
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
									thumbnail={item.thumbnail.url}
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
