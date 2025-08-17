import ProductCell from "@/components/ProductCell";
import { Button, Flex, Table } from "@chakra-ui/react";

const items = [
	{
		id: 1,
		title: "Essence Mascara Lash Princess",
		description:
			"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
		price: 9.99,
		category: {
			title: "beauty",
		},
		thumbnail: {
			url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
		},
		stock: 99,
	},
	{
		id: 2,
		title: "Eyeshadow Palette with Mirror",
		description:
			"The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
		price: 19.99,
		category: {
			title: "beauty",
		},
		thumbnail: {
			url: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
		},
		stock: 34,
	},
	{
		id: 3,
		title: "Powder Canister",
		description:
			"The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
		price: 14.99,
		category: {
			title: "beauty",
		},
		thumbnail: {
			url: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
		},
		stock: 89,
	},
];

const AdminDashboardPage = () => {
	return (
		<Table.ScrollArea borderWidth='1px' borderTop={"none"} maxW='100%'>
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
					{items.map((item) => (
						<Table.Row key={item.id}>
							<Table.Cell>
								<ProductCell
									thumbnail={item.thumbnail.url}
									title={item.title}
									price={item.price}
									category={item.category.title}
								/>
							</Table.Cell>
							<Table.Cell>
								<Flex align='center' justify='center' gap={2} wrap={"wrap"}>
									<Button bg={"cyan.700"} color={"white"}>
										view
									</Button>
									<Button bg={"teal.700"} color={"white"}>
										Edit
									</Button>
									<Button bg={"red.700"} color={"white"}>
										Delete
									</Button>
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Table.ScrollArea>
	);
};

export default AdminDashboardPage;
