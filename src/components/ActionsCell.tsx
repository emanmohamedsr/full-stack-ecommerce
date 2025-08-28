import type { IProduct } from "@/interfaces/Product";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import DrawerForm from "./DrawerForm";
import DialogComponent from "./ui/Dialog";
import { useNavigate } from "react-router-dom";
import {
	useDeleteProductMutation,
	usePutProductMutation,
} from "@/services/productsApi";
import type { IError } from "@/interfaces/Error";
import { toaster } from "@/config/toaster";
import type { IFormInputs } from "@/interfaces/FormInputs";

interface Iprops {
	product: IProduct;
}

const ActionsCell = ({ product }: Iprops) => {
	/** STATES */
	const [deleteProduct, { isLoading: isLoadingDelete }] =
		useDeleteProductMutation();
	const [putProduct, { isLoading: isLoadingPut }] = usePutProductMutation();
	const navigate = useNavigate();
	/** HANDLERS */
	const handleDelete = async () => {
		try {
			await deleteProduct(product.documentId).unwrap();
			toaster.success({
				title: "Success",
				description: "Product deleted successfully",
			});
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: errorObj?.data?.error?.status || "Error",
				description: errorObj?.data?.error?.message || "An error occurred",
			});
		}
	};
	const handleEdit = async (data: IFormInputs) => {
		try {
			await putProduct({
				...data,
				documentId: product?.documentId,
			}).unwrap();
			toaster.success({
				title: "Success",
				description: "Product updated successfully",
			});
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: errorObj?.data?.error?.status || "Error",
				description: errorObj?.data?.error?.message || "An error occurred",
			});
		}
	};
	const handleView = () => navigate(`/products/${product.documentId}`);
	/** RENDER */
	return (
		<Flex align='center' justify='center' gap={2} wrap={"wrap"}>
			<DrawerForm onSubmit={handleEdit} product={product}>
				<Button
					disabled={isLoadingPut || isLoadingDelete}
					_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
					bg={"teal.700"}
					color={"white"}>
					Edit
				</Button>
			</DrawerForm>
			<Button
				disabled={isLoadingPut || isLoadingDelete}
				_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
				onClick={handleView}
				bg={"cyan.700"}
				color={"white"}>
				View
			</Button>
			<DialogComponent
				title='🔔 Delete Product'
				description='Are you sure you want to delete this product?'
				deleteTheme
				onSubmit={handleDelete}>
				<Button
					disabled={isLoadingDelete || isLoadingPut}
					_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
					bg={"red.700"}
					color={"white"}>
					{isLoadingDelete && <Spinner size='sm' />}
					{isLoadingDelete ? "Deleting..." : "Delete"}
				</Button>
			</DialogComponent>
		</Flex>
	);
};

export default ActionsCell;
