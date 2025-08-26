import { clearSession, setUserSession } from "@/app/features/authSlice";
import type { RootState } from "@/app/store";
import type { IUser } from "@/interfaces/User";
import { useLazyGetMeQuery } from "@/services/UserApi";
import {
	Box,
	Button,
	Flex,
	HStack,
	Spinner,
	Table,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookieService from "@/services/Cookie";
import ErrorHandler from "@/components/error/ErrorHandler";
import { useLazyGetProductsQuery } from "@/services/productsApi";
import { useLazyGetOneCategoryQuery } from "@/services/categoriesApi";
import type { ICategory, IProduct } from "@/interfaces/Product";
import type { IError } from "@/interfaces/Error";
import { toaster } from "@/config/toaster";
import ProductCell from "@/components/ProductCell";
import EmptyProductsState from "@/components/EmptyProductsState";
import { VscEmptyWindow } from "react-icons/vsc";
import DrawerForm from "@/components/DrawerForm";
import { useNavigate } from "react-router-dom";
import { selectCategory } from "@/app/features/categorySlice";
const AdminDashboardPage = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<Array<IProduct>>();
	const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
		null,
	);

	const [triggerGetProducts, { isLoading: isLoadingProducts }] =
		useLazyGetProductsQuery();
	const [triggerGetCategoryProducts, { isLoading: isLoadingCategoryProducts }] =
		useLazyGetOneCategoryQuery();
	const { token, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const [triggerGetMe, { isLoading, isError, error }] = useLazyGetMeQuery();
	const [validAdmin, setValidAdmin] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const selectedCategory = useSelector(selectCategory);

	useEffect(() => {
		let isMounted = true;

		const checkAuth = async () => {
			if (token && user) {
				if (isMounted) {
					setValidAdmin(user.role?.name === "Admin");
					setIsCheckingAuth(false);
				}
				return;
			}
			const cookieToken = cookieService.get("ma7al_jwt");
			if (cookieToken) {
				try {
					const res: IUser = await triggerGetMe(cookieToken).unwrap();
					if (isMounted) {
						dispatch(
							setUserSession({
								token: cookieToken,
								user: res,
							}),
						);
						setValidAdmin(res.role?.name === "Admin");
					}
				} catch (error) {
					console.error("Auth check failed:", error);
					cookieService.remove("ma7al_jwt");
					dispatch(clearSession());
					if (isMounted) {
						setValidAdmin(false);
					}
				}
			} else if (isMounted) {
				setValidAdmin(false);
			}
			if (isMounted) setIsCheckingAuth(false);
		};

		checkAuth();

		const getAllProducts = async () => {
			try {
				const res = await triggerGetProducts({}).unwrap();
				if (res) {
					setData(res.data);
				}
			} catch (error) {
				const errorObj = error as IError;
				toaster.error({
					title: `${errorObj.data?.error?.status || 500} Error`,
					description:
						errorObj.data?.error?.message || "Failed to fetch products",
				});
			}
		};
		const getOneCategryProducts = async () => {
			try {
				const res = await triggerGetCategoryProducts(
					selectedCategory?.documentId,
				).unwrap();
				if (res) {
					setData(res.data.products);
					setCurrentCategory(res.data);
				}
			} catch (error) {
				const errorObj = error as IError;
				toaster.error({
					title: `${errorObj.data?.error?.status || 500} Error`,
					description:
						errorObj.data?.error?.message || "Failed to fetch products",
				});
			}
		};
		if (!selectedCategory) {
			getAllProducts();
		} else {
			getOneCategryProducts();
		}
		return () => {
			isMounted = false;
		};
	}, [
		dispatch,
		token,
		user,
		triggerGetMe,
		triggerGetProducts,
		triggerGetCategoryProducts,
		selectedCategory,
	]);

	if (isCheckingAuth || isLoading) {
		return (
			<HStack overflow={"hidden"}>
				<VStack
					bg='gray.600'
					colorPalette='teal'
					gap={4}
					align='center'
					justify='center'>
					<Spinner color='teal.600' size='xl' />
					<Text color='teal.600'>Checking authentication...</Text>
				</VStack>
			</HStack>
		);
	}
	if (isError) {
		throw error;
	}
	if (validAdmin) {
		return isLoadingProducts || isLoadingCategoryProducts ? (
			<Spinner />
		) : data && data.length > 0 ? (
			<Table.ScrollArea borderWidth='1px' borderTop={"none"} maxW='100%'>
				<Table.Root size='sm' variant='line' striped>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader textAlign={"center"} minW='300px'>
								Product
							</Table.ColumnHeader>
							<Table.ColumnHeader textAlign={"center"} minW='200px'>
								Actions
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{data.map((item) => (
							<Table.Row key={item.id}>
								<Table.Cell>
									<ProductCell
										category={item.category || currentCategory}
										title={item.title}
										price={item.price}
										thumbnail={item.thumbnail.url}
									/>
								</Table.Cell>
								<Table.Cell>
									<Flex align='center' justify='center' gap={2} wrap={"wrap"}>
										<DrawerForm product={item}>
											<Button bg={"teal.700"} color={"white"}>
												Edit
											</Button>
										</DrawerForm>
										<Button
											onClick={() => navigate(`/products/${item.documentId}`)}
											bg={"cyan.700"}
											color={"white"}>
											view
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
		) : (
			<EmptyProductsState
				title='No products found'
				description='Try adjusting your filters or adding new products.'>
				<VscEmptyWindow />
			</EmptyProductsState>
		);
	}
	return (
		<Box
			position='absolute'
			top={-64}
			left={{ base: 0, md: -60 }}
			right={0}
			bottom={0}>
			<ErrorHandler
				defaultTitle='access denied'
				defaultStatusCode={403}
				showHome></ErrorHandler>
		</Box>
	);
};

export default AdminDashboardPage;
