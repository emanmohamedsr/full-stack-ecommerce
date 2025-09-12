import {
	Box,
	Button,
	CloseButton,
	Drawer,
	Flex,
	HStack,
	Icon,
	Portal,
	Skeleton,
	Text,
	VStack,
	type FlexProps,
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import {
	useGetCategoryProductsQuery,
	useGetProductsQuery,
} from "@/app/services/productsApi";
import ProductsSkeleton from "./ProductsSkeleton";
import EmptyProductsState from "./EmptyProductsState";
import { MdOutlineSignalWifiConnectedNoInternet4 } from "react-icons/md";
import type { ICategory, IProduct } from "@/interfaces/Product";
import { useEffect, useState } from "react";
import Paginator from "./ui/Paginator";
import type { IMeta } from "@/interfaces/meta";
import { selectNetworkStatus } from "@/app/features/networkSlice";
import { useSelector } from "react-redux";
import { VscEmptyWindow } from "react-icons/vsc";
import { BiCategoryAlt } from "react-icons/bi";
import { LuEyeClosed } from "react-icons/lu";
import { GiHeartBottle } from "react-icons/gi";
import { PiShirtFoldedThin } from "react-icons/pi";
import { BsWatch } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { BiHappyBeaming } from "react-icons/bi";
import { GiSunglasses } from "react-icons/gi";
import { LuShirt } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { PiDressThin } from "react-icons/pi";
import { GiEarrings } from "react-icons/gi";
import { PiHighHeelThin } from "react-icons/pi";
import { GiPocketWatch } from "react-icons/gi";
import type { IconType } from "react-icons";
import { useGetCategoriesQuery } from "@/app/services/categoriesApi";
import { useColorMode } from "@/hooks/useColorMode";
import { toCapitalize } from "@/utils";

interface LinkItemProps {
	id: number | null;
	name: string | null;
	icon: IconType;
	documentId: string | null;
}
interface NavItemProps extends FlexProps {
	selectedCat: ICategory | null;
	setSelectedCat: (category: ICategory | null) => void;
	icon: IconType;
	category?: ICategory | null;
}
const NavItem = ({
	selectedCat,
	setSelectedCat,
	icon,
	category,
	...rest
}: NavItemProps) => {
	const { colorMode } = useColorMode();
	const isActive =
		selectedCat?.documentId === category?.documentId ||
		(selectedCat === null && category === null);

	return (
		<Box
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
			onClick={() => {
				setSelectedCat(category || null);
			}}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				bg={isActive ? "teal.700" : "transparent"}
				color={isActive ? "white" : "inherit"}
				_hover={{
					bg: `${
						!isActive && (colorMode === "light" ? "teal.100" : "gray.800")
					}`,
					color: `${!isActive && (colorMode === "light" ? "black" : "white")}`,
				}}
				{...rest}>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						color={isActive ? "white" : "inherit"}
						as={icon}
					/>
				)}
				{category ? (
					<Text>{toCapitalize(category.title)}</Text>
				) : (
					<Text>All</Text>
				)}
			</Flex>
		</Box>
	);
};

const Products = () => {
	const isOnline = useSelector(selectNetworkStatus);
	const [selectedCat, setSelectedCat] = useState<ICategory | null>(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [selectedCat]);

	const { data: categoriesData, isLoading: isLoadingCategories } =
		useGetCategoriesQuery({});
	const CategoriesIcons: Array<IconType> = [
		LuEyeClosed,
		GiHeartBottle,
		PiShirtFoldedThin,
		GiRunningShoe,
		BiHappyBeaming,
		GiSunglasses,
		LuShirt,
		BsHandbag,
		PiDressThin,
		BsWatch,
		GiEarrings,
		PiHighHeelThin,
		GiPocketWatch,
	];
	const LinkItems = (): Array<LinkItemProps> => {
		const defaultCategory =
			categoriesData?.data?.map((category: ICategory, index: number) => ({
				id: category.id ?? null,
				name: category.title ?? null,
				icon: CategoriesIcons[index] || BiCategoryAlt,
				documentId: category.documentId ?? null,
			})) || [];
		return [
			{
				name: "All",
				icon: BiCategoryAlt,
				documentId: null,
				id: null,
			},
			...defaultCategory,
		];
	};

	const {
		isError: isProductsError,
		error: productsError,
		isLoading: isProductsLoading,
		data: productsData,
	} = useGetProductsQuery({ page }, { skip: !!selectedCat });
	const {
		isError: isCategoryError,
		error: categoryError,
		isLoading: isCategoryLoading,
		data: categoryProductsData,
	} = useGetCategoryProductsQuery(
		{ page, categoryId: selectedCat?.documentId },
		{ skip: !selectedCat },
	);

	const products: IProduct[] = selectedCat
		? categoryProductsData?.data
		: productsData?.data || [];
	const meta: IMeta = selectedCat
		? categoryProductsData?.meta
		: productsData?.meta;

	if (!isOnline) {
		return (
			<EmptyProductsState
				title='No Internet Connection'
				description='Please check your network settings and try again.'>
				<MdOutlineSignalWifiConnectedNoInternet4 />
			</EmptyProductsState>
		);
	}
	if (isProductsLoading || isCategoryLoading) {
		return <ProductsSkeleton />;
	}

	if (isProductsError || isCategoryError) {
		throw productsError || categoryError;
	}
	const placement: "start" | "end" | "top" | "bottom" = "start";
	return (
		<VStack
			width='full'
			gap={4}
			p={4}
			alignItems={{ base: "center", md: "flex-start" }}>
			<Drawer.Root placement={placement}>
				<Drawer.Trigger asChild>
					<Button variant='outline' colorPalette={"teal"}>
						Select Category
					</Button>
				</Drawer.Trigger>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title>Select a Category</Drawer.Title>
							</Drawer.Header>
							<Drawer.Body>
								<NavItem
									selectedCat={selectedCat}
									setSelectedCat={setSelectedCat}
									icon={BiCategoryAlt}
									category={null}
								/>

								{isLoadingCategories
									? Array.from({ length: 4 }, (_, index) => (
											<Skeleton
												key={index}
												variant='shine'
												height='4'
												m={6}
												p={6}
												css={{
													"--start-color": "colors.gray.600",
													"--end-color": "colors.gray.300",
												}}
											/>
									  ))
									: LinkItems()
											.filter((link) => link.name !== "All")
											.map((link) => (
												<NavItem
													selectedCat={selectedCat}
													setSelectedCat={setSelectedCat}
													key={link.name}
													icon={link.icon}
													category={
														link.documentId && link.name && link.id
															? {
																	id: link.id,
																	title: link.name,
																	documentId: link.documentId,
															  }
															: null
													}
												/>
											))}
							</Drawer.Body>
							<Drawer.CloseTrigger asChild>
								<CloseButton size='sm' />
							</Drawer.CloseTrigger>
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>
			{products.length > 0 ? (
				<VStack gap={4} width='full' justifyContent='center'>
					<HStack flexWrap={"wrap"} justifyContent='center' gap={4} p={4}>
						{products.map((item: IProduct) => (
							<ProductCard key={item.id} product={item} />
						))}
					</HStack>
					{meta && (
						<Paginator
							currentPage={page}
							total={meta.pagination.total}
							pageSize={meta.pagination.pageSize}
							pageCount={meta.pagination.pageCount}
							onPageChange={setPage}
						/>
					)}
				</VStack>
			) : (
				<EmptyProductsState
					title='No Products Found'
					description='Looks like there are no products available.'>
					<VscEmptyWindow />
				</EmptyProductsState>
			)}
		</VStack>
	);
};

export default Products;
