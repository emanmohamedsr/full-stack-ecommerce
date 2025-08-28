import { clearSession, setUserSession } from "@/app/features/authSlice";
import type { RootState } from "@/app/store";
import type { IUser } from "@/interfaces/User";
import { useLazyGetMeQuery } from "@/services/UserApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookieService from "@/services/Cookie";
import {
	useLazyGetProductsQuery,
	usePostProductMutation,
} from "@/services/productsApi";
import { useLazyGetOneCategoryQuery } from "@/services/categoriesApi";
import type { ICategory, IProduct } from "@/interfaces/Product";
import type { IError } from "@/interfaces/Error";
import { toaster } from "@/config/toaster";
import EmptyProductsState from "@/components/EmptyProductsState";
import { VscEmptyWindow } from "react-icons/vsc";
import { selectCategory } from "@/app/features/categorySlice";
import type { IFormInputs } from "@/interfaces/FormInputs";
import LoadingOverlay from "@/components/loading";
import AdminTableSkeleton from "@/components/AdminTableSkeleton";
import AdminTable from "@/components/AdminTable";
const AdminDashboardPage = () => {
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
	const [triggerGetMe, { isLoading: isLoadingAdmin, isError, error }] =
		useLazyGetMeQuery();
	const [validAdmin, setValidAdmin] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const selectedCategory = useSelector(selectCategory);
	const [triggerPostProduct, { isLoading: isLoadingPostProduct }] =
		usePostProductMutation();

	const handleAddProduct = async (data: IFormInputs) => {
		try {
			await triggerPostProduct({
				...data,
			}).unwrap();
			toaster.success({
				title: "Success",
				description: "Product added successfully",
			});
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: `${errorObj.data?.error?.status || 500} Error`,
				description: errorObj.data?.error?.message || "Failed to add product",
			});
		}
	};

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
		const getOneCategoryProducts = async () => {
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
			getOneCategoryProducts();
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
		if (data && data.length > 0)
			return (
				<AdminTable
					data={data}
					currentCategory={currentCategory}
					isLoadingAddProduct={isLoadingPostProduct}
					adminName={user?.username}
					onAddProduct={handleAddProduct}
				/>
			);
		if (data && data?.length <= 0)
			return (
				<EmptyProductsState
					title='No products found'
					description='Try adjusting your filters or adding new products.'>
					<VscEmptyWindow />
				</EmptyProductsState>
			);
	}
	return null;
};

export default AdminDashboardPage;
