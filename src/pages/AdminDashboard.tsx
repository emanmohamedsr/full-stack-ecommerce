import { clearSession, setUserSession } from "@/app/features/authSlice";
import type { RootState } from "@/app/store";
import type { IUser } from "@/interfaces/User";
import { useLazyGetMeQuery } from "@/app/services/UserApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookieService from "@/services/Cookie";
import {
	useGetCategoryProductsQuery,
	useGetProductsQuery,
} from "@/app/services/productsApi";
import type { IProduct } from "@/interfaces/Product";
import EmptyProductsState from "@/components/EmptyProductsState";
import { VscEmptyWindow } from "react-icons/vsc";
import { selectCategory } from "@/app/features/categorySlice";
import LoadingOverlay from "@/components/loading";
import AdminTableSkeleton from "@/components/AdminTableSkeleton";
import AdminTable from "@/components/AdminTable";
import type { IMeta } from "@/interfaces/meta";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import Paginator from "@/components/ui/Paginator";
import AddProductForm from "@/components/AddProductForm";

const AdminDashboardPage = () => {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const selectedCategory = useSelector(selectCategory);
	const [page, setPage] = useState<number>(1);

	const { data: productsData, isLoading: isLoadingProducts } =
		useGetProductsQuery({ page }, { skip: !!selectedCategory });
	const { data: categoryProductsData, isLoading: isLoadingCategoryProducts } =
		useGetCategoryProductsQuery(
			{ categoryId: selectedCategory?.documentId, page },
			{ skip: !selectedCategory },
		);

	const data: IProduct[] = selectedCategory
		? categoryProductsData?.data
		: productsData?.data;
	const meta: IMeta = selectedCategory
		? categoryProductsData?.meta
		: productsData?.meta;

	const { token, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const [triggerGetMe, { isLoading: isLoadingAdmin, isError, error }] =
		useLazyGetMeQuery();
	const [validAdmin, setValidAdmin] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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
		return () => {
			isMounted = false;
		};
	}, [dispatch, token, user, triggerGetMe, selectedCategory, page]);

	useEffect(() => {
		setPage(1);
	}, [selectedCategory]);

	if (isCheckingAuth || isLoadingAdmin) {
		return (
			<LoadingOverlay
				isOpen={isCheckingAuth || isLoadingAdmin}
				description='Checking authentication...'
			/>
		);
	}
	if (isError) {
		throw error;
	}
	if (validAdmin) {
		if (isLoadingProducts || isLoadingCategoryProducts)
			return <AdminTableSkeleton />;

		return (
			<Box>
				<HStack justifyContent='space-between' w='full' p={4}>
					<Button
						onClick={() => setIsAddDialogOpen(true)}
						_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
						bg='teal.700'
						color='white'>
						Create Product
					</Button>
					<AddProductForm
						onClose={() => setIsAddDialogOpen(false)}
						open={isAddDialogOpen}
					/>
					<Text fontSize='lg'>
						Welcome back, <strong>{user?.username}</strong>
					</Text>
				</HStack>
				{data && data.length > 0 ? (
					<Box w='100%' h='full'>
						<AdminTable data={data} />
						{meta && (
							<Flex justifyContent='center' alignItems='center' pt={4} pb={4}>
								<Paginator
									currentPage={page}
									total={meta.pagination.total}
									pageCount={meta.pagination.pageCount}
									pageSize={meta.pagination.pageSize}
									onPageChange={setPage}
								/>
							</Flex>
						)}
					</Box>
				) : (
					<EmptyProductsState
						title='No products found'
						description='Try adjusting your filters or adding new products.'>
						<VscEmptyWindow />
					</EmptyProductsState>
				)}
			</Box>
		);
	}
	return null;
};

export default AdminDashboardPage;
