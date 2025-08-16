import EmptyProductsState from "@/components/EmptyProductsState";
import {
	Heading,
	HStack,
	IconButton,
	Table,
	VStack,
	Image,
	Badge,
	Highlight,
	Button,
	Box,
	Stack,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
const cartProducts = [
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

const CartPage = () => {
	if (cartProducts.length <= 0) {
		return (
			<Stack justifyContent={"center"} alignItems={"center"}>
				<EmptyProductsState
					title='Your Cart is Empty'
					description='Add items to your cart to see them here.'>
					<AiOutlineShoppingCart />
				</EmptyProductsState>
			</Stack>
		);
	}
	return (
		<Table.ScrollArea borderWidth='1px' maxW='100%'>
			<Table.Root size='sm' variant='outline'>
				<Table.Caption fontSize={"lg"}>
					<HStack justify={"space-between"} alignItems={"center"} py={3} px={6}>
						<Box>
							<Highlight
								query='Total Price'
								styles={{ px: "0.5", bg: "teal.subtle", color: "teal.fg" }}>
								Total Price: 100.
							</Highlight>
						</Box>
						<Button bg={"teal.700"} color={"white"}>
							<IoBagCheckOutline />
							Checkout
						</Button>
					</HStack>
				</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader textAlign={"center"} minW='200px'>
							Product
						</Table.ColumnHeader>
						<Table.ColumnHeader textAlign={"center"} minW='100px'>
							Quantity
						</Table.ColumnHeader>
						<Table.ColumnHeader textAlign={"center"} minW='100px'>
							Actions
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{cartProducts.map((pro) => (
						<Table.Row key={pro.id}>
							<Table.Cell>
								<VStack>
									<Heading size='sm'>{pro.title}</Heading>
									<Image
										src={pro.thumbnail.url}
										alt={pro.title}
										boxSize='100px'
										objectFit='cover'
									/>
									<HStack justifyContent={"space-evenly"}>
										<Badge colorPalette={"blue"}>{pro.price}$</Badge>
										<Badge colorPalette={"pink"}>{pro.category.title}</Badge>
									</HStack>
								</VStack>
							</Table.Cell>
							<Table.Cell textAlign={"center"}>1</Table.Cell>
							<Table.Cell>
								<HStack gap={2} justifyContent={"center"}>
									<IconButton
										size='xs'
										aria-label='decrease quantity'
										color={"red.700"}>
										<FaMinus />
									</IconButton>
									<IconButton
										size='xs'
										aria-label='increase quantity'
										color='teal.600'>
										<FaPlus />
									</IconButton>
								</HStack>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Table.ScrollArea>
	);
};

export default CartPage;
