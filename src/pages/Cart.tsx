import EmptyProductsState from "@/components/EmptyProductsState";
import { useColorMode } from "@/hooks/useColorMode";
import {
	Heading,
	HStack,
	IconButton,
	Table,
	Image,
	Center,
	Text,
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
	const { colorMode } = useColorMode();
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
								Total Price: 100$
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
						<Table.ColumnHeader textAlign={"center"} minW='250px'>
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
							<Table.Cell p={4}>
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
											_after={{
												transition: "all .3s ease",
												content: '""',
												w: "full",
												h: "full",
												pos: "absolute",
												top: 5,
												left: 0,
												backgroundImage: `url(${pro.thumbnail.url})`,
												filter: "blur(15px)",
												zIndex: -1,
											}}
											_groupHover={{
												_after: {
													filter: "blur(20px)",
												},
											}}>
											<Image
												rounded={"lg"}
												height={200}
												width={282}
												objectFit={"cover"}
												src={pro.thumbnail.url}
												alt='#'
											/>
										</Box>
										<Stack pt={10} align={"center"} maxW={"250px"}>
											<Text
												color={"gray.500"}
												fontSize={"sm"}
												textTransform={"uppercase"}>
												{pro.category.title}
											</Text>
											<Heading
												fontSize={"2xl"}
												fontFamily={"body"}
												fontWeight={500}
												textWrap={{ base: "wrap", md: "nowrap" }}
												textAlign={"center"}>
												{pro.title}
											</Heading>
											<Stack direction={"row"} align={"center"}>
												<Text
													fontWeight={600}
													fontSize={"xl"}
													color={"teal.600"}>
													${pro.price}
												</Text>
											</Stack>
										</Stack>
									</Box>
								</Center>
							</Table.Cell>
							<Table.Cell textAlign={"center"} fontSize={"xl"} fontWeight={500}>
								1
							</Table.Cell>
							<Table.Cell>
								<HStack gap={2} justifyContent={"center"}>
									<IconButton
										size='xs'
										aria-label='decrease quantity'
										color={"red.700"}
										variant={"outline"}
										borderWidth={"1px"}
										borderColor={"red.700"}>
										<FaMinus />
									</IconButton>
									<IconButton
										size='xs'
										aria-label='increase quantity'
										color='teal.600'
										variant={"outline"}
										borderWidth={"1px"}
										borderColor={"teal.600"}>
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
