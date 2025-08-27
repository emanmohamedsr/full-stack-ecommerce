import { selectCategory } from "@/app/features/categorySlice";
import { useColorMode } from "@/hooks/useColorMode";
import type { IFormInputs } from "@/interfaces/FormInputs";
import type { ICategory, IProduct } from "@/interfaces/Product";
import { useGetCategoriesQuery } from "@/services/categoriesApi";
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
	onSubmit: (data: IFormInputs) => void;
}

const DrawerForm = ({ product, children, onSubmit }: Iprops) => {
	const [open, setOpen] = useState(false);
	const selectedCat: ICategory | null = useSelector(selectCategory);
	const { data: categories, isLoading: isLoadingCategories } =
		useGetCategoriesQuery({});

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

	const handleFormSubmit = (data: IFormInputs) => {
		setOpen(false);
		onSubmit(data);
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
									<Button type='submit'>{product ? "Update" : "Create"}</Button>
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
