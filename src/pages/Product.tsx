import {
	Badge,
	Box,
	Button,
	Card,
	Image,
	Tabs,
	VStack,
} from "@chakra-ui/react";
import { GiMoneyStack } from "react-icons/gi";
import { BsStack } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import Product from "../assets/product.svg";
import { useGetOneProductQuery } from "@/services/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import ProductPageSkeleton from "@/components/ProductPageSkeleton";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import type { ICategory } from "@/interfaces/Product";
const ProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		isLoading,
		isError,
		error,
		data: product,
	} = useGetOneProductQuery(id!);
	const { title, description, thumbnail, categories, price, stock } =
		product || {};
	const thumbnailUrl = thumbnail?.url
		? `${import.meta.env.VITE_API_URL}${thumbnail.url}`
		: Product;

	if (isLoading) {
		return <ProductPageSkeleton />;
	}
	if (isError) {
		throw error;
	}
	return (
		<VStack>
			<Button variant={"ghost"} onClick={() => navigate(-1)}>
				<MdOutlineArrowBackIosNew />
				Go Back
			</Button>
			<Card.Root
				flexDirection='column'
				overflow='hidden'
				w='full'
				md={{ flexDirection: "row" }}>
				<Image
					objectFit='cover'
					maxWidth={"250px"}
					mx='auto'
					src={thumbnailUrl}
					alt={title}
				/>
				<Box>
					<Card.Body>
						<Card.Title mb='2'>{title}</Card.Title>
						<Card.Description>{description}</Card.Description>
						<Tabs.Root defaultValue='price'>
							<Tabs.List>
								<Tabs.Trigger value='stock'>
									<BsStack />
									Stock
								</Tabs.Trigger>
								<Tabs.Trigger value='price'>
									<GiMoneyStack />
									Price
								</Tabs.Trigger>
								<Tabs.Trigger value='category'>
									<TbCategory2 />
									Category
								</Tabs.Trigger>
							</Tabs.List>
							<Tabs.Content value='stock'>
								<Badge>{stock}</Badge>
							</Tabs.Content>
							<Tabs.Content value='price'>
								<Badge>{price}$</Badge>
							</Tabs.Content>
							<Tabs.Content value='category'>
								<Box spaceX='2'>
									{categories.map((cat: ICategory) => (
										<Badge key={cat.id}>{cat.title}</Badge>
									))}
								</Box>
							</Tabs.Content>
						</Tabs.Root>
					</Card.Body>
					<Card.Footer>
						<Button>Buy {title}</Button>
					</Card.Footer>
				</Box>
			</Card.Root>
		</VStack>
	);
};

export default ProductPage;
