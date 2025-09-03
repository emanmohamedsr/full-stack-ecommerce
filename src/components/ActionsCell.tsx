import type { IProduct } from "@/interfaces/Product";
import { Button, Flex, HStack, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "@/app/services/productsApi";
import type { IError } from "@/interfaces/Error";
import { toaster } from "@/config/toaster";
import { useState } from "react";
import CustomeDialog from "./CustomeDialog";
import EditProductForm from "./EditProductForm";

interface Iprops {
	product: IProduct;
}

const ActionsCell = ({ product }: Iprops) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	/** STATES */
	const [deleteProduct, { isLoading: isLoadingDelete }] =
		useDeleteProductMutation();
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
	const handleView = () => navigate(`/products/${product.documentId}`);
	/** RENDER */
	return (
		<Flex align='center' justify='center' gap={2} wrap={"wrap"}>
			<Button
				onClick={() => setIsEditDialogOpen(true)}
				disabled={isLoadingDelete}
				_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
				bg={"teal.700"}
				color={"white"}>
				Edit
			</Button>
			<EditProductForm
				onClose={() => setIsEditDialogOpen(false)}
				open={isEditDialogOpen}
				product={product}
			/>
			<Button
				disabled={isLoadingDelete}
				_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
				onClick={handleView}
				bg={"cyan.700"}
				color={"white"}>
				View
			</Button>
			<Button
				onClick={() => setIsDeleteDialogOpen(true)}
				disabled={isLoadingDelete}
				_disabled={{ bg: "gray.500", cursor: "not-allowed" }}
				bg={"red.700"}
				color={"white"}>
				Delete
			</Button>
			<CustomeDialog
				open={isDeleteDialogOpen}
				title='🔔 Delete Product'
				description='Are you sure you want to delete this product?'>
				<HStack>
					<Button
						onClick={() => {
							handleDelete();
							setIsDeleteDialogOpen(false);
						}}
						disabled={isLoadingDelete}
						_disabled={{ cursor: "not-allowed" }}
						bg={"red.300"}
						color={"red.700"}
						variant={"outline"}
						border={"1px solid red.700"}>
						{isLoadingDelete && <Spinner size='sm' />}
						{isLoadingDelete ? "Deleting..." : "Delete"}
					</Button>
					<Button
						onClick={() => setIsDeleteDialogOpen(false)}
						variant='outline'>
						Cancel
					</Button>
				</HStack>
			</CustomeDialog>
		</Flex>
	);
};

export default ActionsCell;
