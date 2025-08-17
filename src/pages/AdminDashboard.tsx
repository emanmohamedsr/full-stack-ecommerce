import { useColorMode } from "@/hooks/useColorMode";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Stack,
	Table,
	Text,
} from "@chakra-ui/react";

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
	const { colorMode } = useColorMode();
	return (
		<Table.ScrollArea borderWidth='1px' borderTop={"none"} maxW='100%'>
			<Table.Root size='sm' variant='line' striped>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader textAlign={"center"} minW='300px'>
							itemduct
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
												backgroundImage: `url(${item.thumbnail.url})`,
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
												height={"180px"}
												width={282}
												objectFit={"cover"}
												src={item.thumbnail.url}
												alt='#'
											/>
										</Box>
										<Stack pt={10} align={"center"} maxW={"250px"}>
											<Text
												color={"gray.500"}
												fontSize={"sm"}
												textTransform={"uppercase"}>
												{item.category.title}
											</Text>
											<Heading
												fontSize={"2xl"}
												fontFamily={"body"}
												fontWeight={500}
												textWrap={{ base: "wrap", lg: "nowrap" }}
												textAlign={"center"}>
												{item.title}
											</Heading>
											<Stack direction={"row"} align={"center"}>
												<Text
													fontWeight={600}
													fontSize={"xl"}
													color={"teal.600"}>
													${item.price}
												</Text>
											</Stack>
										</Stack>
									</Box>
								</Center>
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
