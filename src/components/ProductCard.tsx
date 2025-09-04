import {
	Badge,
	Box,
	Button,
	Card,
	HStack,
	Image,
	Text,
} from "@chakra-ui/react";
import Product from "../assets/product.svg";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "@/interfaces/Product";
import { useDispatch, useSelector } from "react-redux";
import {
	handleCartProducts,
	selectCartProducts,
} from "@/app/features/cartSlice";
import { addProductToCart, textSlice } from "@/utils";

interface IProps {
	product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
	const { documentId, title, description, thumbnail, stock, price, category } =
		product;
	const dispatch = useDispatch();
	const productsCartState = useSelector(selectCartProducts);
	const navigate = useNavigate();
	const thumbnailUrl = thumbnail?.url ? `${thumbnail.url}` : Product;
	return (
		<Card.Root width='250px' height='550px' md={{ width: "320px" }}>
			<Card.Body gap='2'>
				<Box boxSize={{ base: "200px", md: "250px" }}>
					<Image
						borderRadius='md'
						src={thumbnailUrl}
						alt={title}
						maxW={"100%"}
						mx='auto'
						objectFit='cover'
					/>
				</Box>
				<Card.Title mt='2'>{title}</Card.Title>
				<Card.Description>{textSlice(description, 100)}</Card.Description>
				<Badge colorPalette={"teal"} mt='2' fontSize={"sm"} width='fit-content'>
					{category.title}
				</Badge>
				<HStack justifyContent='space-between'>
					<Text fontWeight={"bold"}>${price}</Text>
					<Text>{stock > 0 ? `${stock} in stock` : "Out of stock"}</Text>
				</HStack>
			</Card.Body>
			<Card.Footer justifyContent='flex-end'>
				<Button
					colorPalette={"gray"}
					variant='outline'
					onClick={() => navigate(`/products/${documentId}`)}>
					View
				</Button>
				<Button
					onClick={() =>
						dispatch(
							handleCartProducts(addProductToCart(product, productsCartState)),
						)
					}
					colorPalette={"teal"}
					_hover={{ bg: "teal.focusRing" }}>
					Add To Cart
				</Button>
			</Card.Footer>
		</Card.Root>
	);
};
export default ProductCard;
