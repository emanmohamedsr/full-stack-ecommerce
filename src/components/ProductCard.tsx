import { Box, Button, Card, Image } from "@chakra-ui/react";

const ProductCard = () => {
	return (
		<Card.Root width='250px' md={{ width: "320px" }}>
			<Card.Body gap='2'>
				<Image
					borderRadius='md'
					src='https://tse2.mm.bing.net/th/id/OIP.a-YDWw7IcFGxYeuz_1wUrgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
					alt='product-image'
				/>
				<Card.Title mt='2'>Nue Camp</Card.Title>
				<Card.Description>
					This is the card body. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
					Curabitur nec odio vel dui euismod fermentum.
				</Card.Description>
				<Box mt='2' fontSize={"sms"}>
					$99.99
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
