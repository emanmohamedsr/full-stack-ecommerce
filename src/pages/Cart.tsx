import {
	handleCartProducts,
	selectCartProducts,
} from "@/app/features/cartSlice";
import EmptyProductsState from "@/components/EmptyProductsState";
import ProductCell from "@/components/ProductCell";
import type { IProduct } from "@/interfaces/Product";
import {
	calcTotalPrice,
	handleDecreaseProductCartQuantity,
	handleIncreaseProductCartQuantity,
} from "@/utils";
import {
	HStack,
	IconButton,
	Table,
	Button,
	Stack,
	Text,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
	const navigate = useNavigate();
	const cartProducts = useSelector(selectCartProducts);
	const dispatch = useDispatch();
	if (cartProducts.length === 0) {
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
						<HStack alignItems={"center"}>
							Total Price:
							<Text borderRadius={"md"} bg={"teal.700"} color={"white"} p={1}>
								${calcTotalPrice(cartProducts).toFixed(2)}
							</Text>
						</HStack>

						<Button
							onClick={() => navigate("/checkout")}
							bg={"teal.700"}
							color={"white"}>
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
					{cartProducts.map((p: IProduct) => (
						<Table.Row key={p.id}>
							<Table.Cell p={4}>
								<ProductCell
									category={p.category}
									title={p.title}
									price={p.price}
									thumbnail={p.thumbnail.url}
								/>
							</Table.Cell>
							<Table.Cell textAlign={"center"} fontSize={"xl"} fontWeight={500}>
								{p.quantity || 1}
							</Table.Cell>
							<Table.Cell>
								<HStack gap={2} justifyContent={"center"}>
									<IconButton
										onClick={() =>
											dispatch(
												handleCartProducts(
													handleDecreaseProductCartQuantity(cartProducts, p),
												),
											)
										}
										size='xs'
										aria-label='decrease quantity'
										color={"red.700"}
										variant={"outline"}
										borderWidth={"1px"}
										borderColor={"red.700"}>
										<FaMinus />
									</IconButton>
									<IconButton
										onClick={() =>
											dispatch(
												handleCartProducts(
													handleIncreaseProductCartQuantity(cartProducts, p),
												),
											)
										}
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
