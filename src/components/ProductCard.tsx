import type { IProduct } from "@/interfaces";
import { Box, Button, Card, Image } from "@chakra-ui/react";
import Product from "../assets/product.svg";

interface IProps {
	product: IProduct;
}

const ProductCard = ({
	product: { title, description, thumbnail, stock, price },
}: IProps) => {
	const thumbnailUrl = thumbnail?.url
		? `${import.meta.env.VITE_API_URL}${thumbnail.url}`
		: Product;
	return (
		<Card.Root width='250px' md={{ width: "320px" }}>
			<Card.Body gap='2'>
				<Image borderRadius='md' src={thumbnailUrl} alt={title} />
				<Card.Title mt='2'>{title}</Card.Title>
				<Card.Description>{description}</Card.Description>
				<Box mt='2' fontSize={"sms"}>
					${price}
				</Box>
				<Box fontSize={"xs"} color='gray.500'>
					{stock > 0 ? `${stock} in stock` : "Out of stock"}
				</Box>
			</Card.Body>
			<Card.Footer justifyContent='flex-end'>
				<Button colorPalette={"gray"} variant='outline'>
					View
				</Button>
				<Button colorPalette={"teal"} _hover={{ bg: "teal.focusRing" }}>
					Add To Cart
				</Button>
			</Card.Footer>
		</Card.Root>
	);
};
export default ProductCard;
