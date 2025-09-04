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
import type { ICategory } from "@/interfaces/Product";
import type { IFormInputs } from "@/interfaces/FormInputs";
import { addProductSchema } from "@/validation/FormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "@/app/services/categoriesApi";
import { toaster } from "@/config/toaster";
import type { IError } from "@/interfaces/Error";
import { toCapitalize } from "@/utils";
import {
	usePostProductMutation,
	useUploadProductThumbnailFileMutation,
} from "@/app/services/productsApi";
import { useSelector } from "react-redux";
import { selectCategory } from "@/app/features/categorySlice";
import ThumbnailInputFile from "./ThumbnailInputFile";

interface Iprops {
	open: boolean;
	onClose: () => void;
}

const AddProductForm = ({ open, onClose }: Iprops) => {
	const { colorMode } = useColorMode();
	const selectedCategory: ICategory | null = useSelector(selectCategory);
	const { data: categories, isLoading: isLoadingCategories } =
		useGetCategoriesQuery({});
	const [triggerPostProduct, { isLoading: isLoadingPostProduct }] =
		usePostProductMutation();
	const [triggerUploadThumbnail, { isLoading: isLoadingUploadThumbnail }] =
		useUploadProductThumbnailFileMutation();

	const handleAddProduct = async (data: IFormInputs) => {
		const categoryId = categories?.data.find(
			(cat: ICategory) => cat.title === data.category,
		)?.id;
		try {
			const file = new FormData();
			file.append("files", data.thumbnail as File);
			const res = await triggerUploadThumbnail(file).unwrap();
			const productData = {
				data: {
					title: data.title,
					description: data.description,
					price: data.price,
					stock: data.stock,
					category: categoryId,
					thumbnail: res[0]?.id,
				},
			};
			await triggerPostProduct(productData).unwrap();
			toaster.success({
				title: "Success",
				description: "Product added successfully",
			});
			onClose();
			reset();
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: `${errorObj.data?.error?.status || 500} Error`,
				description: errorObj.data?.error?.message || "Failed to add product",
			});
		}
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(addProductSchema),
	});
	useEffect(() => {
		reset({
			title: "",
			description: "",
			price: 0,
			stock: 0,
			category: selectedCategory?.title || "",
			thumbnail: undefined,
		});
	}, [reset, selectedCategory]);

	return (
		<CustomeDialog
			open={open}
			description={"Please provide the product details below."}
			title={"Create a new Product"}>
			<form onSubmit={handleSubmit(handleAddProduct)}>
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
							setValue={setValue}
							isLoading={isLoadingUploadThumbnail}
							error={errors.thumbnail?.message}
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
						disabled={isLoadingPostProduct}
						_disabled={{ cursor: "not-allowed" }}>
						{isLoadingPostProduct && <Spinner size='sm' mr={2} />}
						{isLoadingPostProduct ? "Creating..." : "Create"}
					</Button>
				</Fieldset.Root>
			</form>
		</CustomeDialog>
	);
};

export default AddProductForm;
