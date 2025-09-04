import { useColorMode } from "@/hooks/useColorMode";
import {
	Button,
	Field,
	Fieldset,
	For,
	Input,
	NativeSelect,
	Spinner,
} from "@chakra-ui/react";
import CustomeDialog from "./CustomeDialog";
import type { ICategory, IProduct } from "@/interfaces/Product";
import { editProductSchema } from "@/validation/FormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "@/app/services/categoriesApi";
import { toaster } from "@/config/toaster";
import type { IError } from "@/interfaces/Error";
import { toCapitalize } from "@/utils";
import {
	usePutProductMutation,
	useUploadProductThumbnailFileMutation,
} from "@/app/services/productsApi";
import ThumbnailInputFile from "./ThumbnailInputFile";

interface Iprops {
	open: boolean;
	onClose: () => void;
	product: IProduct;
}

export interface IEditFormInputs {
	title: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	thumbnail?: File;
}

const EditProductForm = ({ open, onClose, product }: Iprops) => {
	const { colorMode } = useColorMode();
	const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
	const [thumbnailError, setThumbnailError] = useState<string | undefined>(
		undefined,
	);
	const [triggerPutProduct, { isLoading: isLoadingPut }] =
		usePutProductMutation();
	const { data: categories, isLoading: isLoadingCategories } =
		useGetCategoriesQuery({});
	const [triggerUploadThumbnail, { isLoading: isLoadingUploadThumbnail }] =
		useUploadProductThumbnailFileMutation();
	const handleEdit = async (data: IEditFormInputs) => {
		if (thumbnail && !(thumbnail instanceof File)) {
			setThumbnailError("Invalid file");
			return;
		} else if (thumbnail && thumbnail instanceof File) {
			if (
				thumbnail.type !== "image/jpeg" &&
				thumbnail.type !== "image/png" &&
				thumbnail.type !== "image/jpg"
			) {
				setThumbnailError("Invalid file type");
				return;
			} else {
				setThumbnailError(undefined);
			}
		}
		const categoryId = categories?.data.find(
			(cat: ICategory) => cat.title === data.category,
		)?.id;
		try {
			let res;
			let productData;
			if (thumbnail) {
				const file = new FormData();
				file.append("files", thumbnail as File);
				res = await triggerUploadThumbnail(file).unwrap();
				productData = {
					data: {
						title: data.title,
						description: data.description,
						price: data.price,
						stock: data.stock,
						category: categoryId,
						thumbnail: res[0]?.id,
					},
				};
			} else {
				productData = {
					data: {
						title: data.title,
						description: data.description,
						price: data.price,
						stock: data.stock,
						category: categoryId,
					},
				};
			}
			await triggerPutProduct({
				productDocumentId: product.documentId,
				productData,
			}).unwrap();
			toaster.success({
				title: "Success",
				description: "Product updated successfully",
			});
			onClose();
			reset();
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: errorObj?.data?.error?.status || "Error",
				description: errorObj?.data?.error?.message || "An error occurred",
			});
		}
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IEditFormInputs>({
		resolver: yupResolver(editProductSchema),
	});
	useEffect(() => {
		reset({
			title: product?.title ?? "",
			description: product?.description ?? "",
			price: product?.price ?? 0,
			stock: product?.stock ?? 0,
			category: product?.category.title ?? "",
		});
	}, [product, reset]);
	return (
		<CustomeDialog
			open={open}
			description={"Please provide the product details below."}
			title='Update a Product'>
			<form onSubmit={handleSubmit(handleEdit)}>
				<Fieldset.Root mx={"auto"} size='sm' maxW='md' colorPalette={"teal"}>
					<Fieldset.Content spaceY={2}>
						<Field.Root>
							<Field.Label>Title</Field.Label>
							<Input {...register("title")} />
							{errors.title && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.title.message}
								</Field.HelperText>
							)}
						</Field.Root>

						<Field.Root>
							<Field.Label>Description</Field.Label>
							<Input {...register("description")} />
							{errors.description && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.description.message}
								</Field.HelperText>
							)}
						</Field.Root>

						<ThumbnailInputFile
							setThumbnail={setThumbnail}
							isLoading={isLoadingUploadThumbnail}
							error={thumbnailError}
						/>

						<Field.Root>
							<Field.Label>Price</Field.Label>
							<Input {...register("price")} />
							{errors.price && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.price.message}
								</Field.HelperText>
							)}
						</Field.Root>

						<Field.Root>
							<Field.Label>Stock</Field.Label>
							<Input {...register("stock")} />
							{errors.stock && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.stock.message}
								</Field.HelperText>
							)}
						</Field.Root>

						<Field.Root
							disabled={isLoadingCategories}
							_disabled={{ backgroundColor: "gray.200" }}>
							<Field.Label>
								{isLoadingCategories && <Spinner size='sm' />}
								{isLoadingCategories ? "loading..." : "Category"}
							</Field.Label>

							<NativeSelect.Root>
								<NativeSelect.Field {...register("category")}>
									<For each={[...(categories?.data ?? [])]}>
										{(cat: ICategory) => (
											<option key={cat.id} value={cat.title}>
												{toCapitalize(cat.title)}
											</option>
										)}
									</For>
								</NativeSelect.Field>
								<NativeSelect.Indicator />
							</NativeSelect.Root>
							{errors.category && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.category.message}
								</Field.HelperText>
							)}
						</Field.Root>
					</Fieldset.Content>

					<Button variant='outline' onClick={onClose}>
						Cancel
					</Button>
					<Button
						type='submit'
						disabled={isLoadingPut}
						_disabled={{ cursor: "not-allowed" }}>
						{isLoadingPut && <Spinner size='sm' mr={2} />}
						{isLoadingPut
							? product
								? "Updating..."
								: "Creating..."
							: product
							? "Update"
							: "Create"}
					</Button>
				</Fieldset.Root>
			</form>
		</CustomeDialog>
	);
};

export default EditProductForm;
