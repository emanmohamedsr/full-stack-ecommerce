import { HStack, VStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/app/services/productsApi";
import ProductsSkeleton from "./ProductsSkeleton";
import EmptyProductsState from "./EmptyProductsState";
import { VscEmptyWindow } from "react-icons/vsc";
import type { IProduct } from "@/interfaces/Product";
import { useState } from "react";
import Paginator from "./ui/Paginator";
import type { IMeta } from "@/interfaces/meta";

const Products = () => {
	const [page, setPage] = useState(2);
	const { isError, error, isLoading, data } = useGetProductsQuery({ page });
	const products = data?.data || [];
	const meta: IMeta | undefined = data?.meta;

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
		<VStack>
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
