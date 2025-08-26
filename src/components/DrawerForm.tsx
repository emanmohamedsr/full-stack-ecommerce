import { selectCategory } from "@/app/features/categorySlice";
import { toaster } from "@/config/toaster";
import { useColorMode } from "@/hooks/useColorMode";
import type { IError } from "@/interfaces/Error";
import type { ICategory, IProduct } from "@/interfaces/Product";
import { useGetCategoriesQuery } from "@/services/categoriesApi";
import { usePutProductMutation } from "@/services/productsApi";
import { toCapitalize } from "@/utils";
import { ProductSchema } from "@/validation/FormSchema";
import {
	Button,
	CloseButton,
	Drawer,
	Field,
	Fieldset,
	For,
	Input,
	NativeSelect,
	Portal,
	Spinner,
	Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface Iprops {
	product?: IProduct | null;
	children: ReactNode;
}

interface IFormInputs {
	title: string;
	description: string;
	thumbnail: string;
	price: number;
	stock: number;
	category: string;
}

const DrawerForm = ({ product, children }: Iprops) => {
	const [open, setOpen] = useState(false);
	const selectedCat: ICategory | null = useSelector(selectCategory);
	const { data: categories, isLoading: isLoadingCategories } =
		useGetCategoriesQuery({});
	const [putProduct, { isLoading: isLoadingPut }] = usePutProductMutation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(ProductSchema),
	});

	useEffect(() => {
		if (product || selectedCat) {
			const defaultCategory = selectedCat ?? product?.category;
			reset({
				title: product?.title ?? "",
				description: product?.description ?? "",
				thumbnail: product?.thumbnail?.url ?? "",
				price: product?.price ?? 0,
				stock: product?.stock ?? 0,
				category: defaultCategory?.title ?? "",
			});
		}
	}, [product, selectedCat, reset]);

	const handlePostProductSubmit = (data: IFormInputs) => {
		console.log(data);
	};

	const handlePutProductSubmit = async (data: IFormInputs) => {
		try {
			const res = await putProduct({
				...data,
				documentId: product?.documentId,
			}).unwrap();
			setOpen(false);
			console.log(res);
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

	const handleFormSubmit = (data: IFormInputs) => {
		if (product) {
			handlePutProductSubmit(data);
		} else {
			handlePostProductSubmit(data);
		}
	};
	const { colorMode } = useColorMode();

	return (
		<Drawer.Root
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			size={"sm"}
			placement={{ mdDown: "bottom", md: "end" }}>
			<Drawer.Trigger asChild>{children}</Drawer.Trigger>

			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content overflowY={"auto"}>
						<form onSubmit={handleSubmit(handleFormSubmit)}>
							<Fieldset.Root
								mx={"auto"}
								size='sm'
								maxW='md'
								colorPalette={"teal"}>
								<Drawer.Header>
									<Drawer.Title>
										<Stack>
											<Fieldset.Legend>Product details</Fieldset.Legend>
											<Fieldset.HelperText>
												Please provide the product details below.
											</Fieldset.HelperText>
										</Stack>
									</Drawer.Title>
								</Drawer.Header>

								<Drawer.Body>
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

										<Field.Root>
											<Field.Label>Thumbnail</Field.Label>
											<Input {...register("thumbnail")} />
											{errors.thumbnail && (
												<Field.HelperText
													maxW={"300px"}
													color={colorMode === "light" ? "red.600" : "red.300"}
													fontSize={"sm"}>
													<Field.ErrorIcon w={4} mr={2} />
													{errors.thumbnail.message}
												</Field.HelperText>
											)}
										</Field.Root>

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
											_disabled={{
												backgroundColor: "gray.200",
											}}>
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
														color={
															colorMode === "light" ? "red.600" : "red.300"
														}
														fontSize={"sm"}>
														<Field.ErrorIcon w={4} mr={2} />
														{errors.category.message}
													</Field.HelperText>
												)}
											</Field.Root>
										</Field.Root>
									</Fieldset.Content>
								</Drawer.Body>

								<Drawer.Footer>
									<Drawer.ActionTrigger asChild>
										<Button variant='outline'>Cancel</Button>
									</Drawer.ActionTrigger>
									<Button
										type='submit'
										disabled={isLoadingPut}
										_disabled={{
											backgroundColor: "gray.500",
											cursor: "not-allowed",
											opacity: 0.4,
										}}>
										{isLoadingPut && <Spinner size='sm' />}
										{isLoadingPut ? "Loading..." : "Submit"}
									</Button>
								</Drawer.Footer>

								<Drawer.CloseTrigger asChild>
									<CloseButton size='sm' />
								</Drawer.CloseTrigger>
							</Fieldset.Root>
						</form>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};

export default DrawerForm;
