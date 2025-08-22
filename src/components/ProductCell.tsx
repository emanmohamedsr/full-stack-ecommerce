import { useColorMode } from "@/hooks/useColorMode";
import type { ICategory, IProduct } from "@/interfaces/Product";
import {
	Badge,
	Box,
	Center,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";

interface Iprops {
	product: IProduct;
}

const ProductCell = ({
	product: { categories, title, price, thumbnail },
}: Iprops) => {
	const { colorMode } = useColorMode();
	return (
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
						backgroundImage: `url(${import.meta.env.VITE_API_URL}${
							thumbnail.url
						})`,
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
						src={`${import.meta.env.VITE_API_URL}${thumbnail.url}`}
						alt='#'
					/>
				</Box>
				<Stack pt={10} align={"center"} maxW={"250px"}>
					<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
						{categories.length > 0 ? (
							categories.map((category: ICategory) => (
								<Badge key={category.id} colorScheme='teal'>
									{category.title}
								</Badge>
							))
						) : (
							<Badge colorScheme='teal'>Uncategorized</Badge>
						)}
					</Text>
					<Heading
						fontSize={"2xl"}
						fontFamily={"body"}
						fontWeight={500}
						textWrap={{ base: "wrap", lg: "nowrap" }}
						textAlign={"center"}>
						{title}
					</Heading>
					<Stack direction={"row"} align={"center"}>
						<Text fontWeight={600} fontSize={"xl"} color={"teal.600"}>
							${price}
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
};

export default ProductCell;
