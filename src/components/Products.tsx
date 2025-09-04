import { HStack, VStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/app/services/productsApi";
import ProductsSkeleton from "./ProductsSkeleton";
import EmptyProductsState from "./EmptyProductsState";
import { MdOutlineSignalWifiConnectedNoInternet4 } from "react-icons/md";
import type { IProduct } from "@/interfaces/Product";
import { useState } from "react";
import Paginator from "./ui/Paginator";
import type { IMeta } from "@/interfaces/meta";
import { selectNetworkStatus } from "@/app/features/networkSlice";
import { useSelector } from "react-redux";
import { VscEmptyWindow } from "react-icons/vsc";

const Products = () => {
	const isOnline = useSelector(selectNetworkStatus);
	const [page, setPage] = useState(1);
	const { isError, error, isLoading, data } = useGetProductsQuery({ page });
	const products = data?.data || [];
	const meta: IMeta | undefined = data?.meta;
	if (!isOnline) {
		return (
			<EmptyProductsState
				title='No Internet Connection'
				description='Please check your network settings and try again.'>
				<MdOutlineSignalWifiConnectedNoInternet4 />
			</EmptyProductsState>
		);
	}
	if (isLoading) {
		return <ProductsSkeleton />;
	}

	if (isError) {
		throw error;
	}

	if (products.length === 0) {
		return (
			<EmptyProductsState
				title='No Products Found'
				description='Looks like there are no products available.'>
				<VscEmptyWindow />
			</EmptyProductsState>
		);
	}
	return (
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
	);
};

export default Products;
