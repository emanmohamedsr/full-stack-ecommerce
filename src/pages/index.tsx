import Products from "@/components/Products";
import axiosInstance from "@/config/axios.config";
import type { IProduct } from "@/interfaces";
import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HomePage = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	console.log("Products:", products);
	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get(
				"/products?populate=thumbnail&populate=categories",
			);
			if (response.status === 200) {
				setProducts(response.data.data);
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<HStack>{products.length > 0 && <Products products={products} />}</HStack>
	);
};

export default HomePage;
