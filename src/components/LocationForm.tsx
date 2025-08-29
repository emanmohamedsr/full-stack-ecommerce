import { useColorMode } from "@/hooks/useColorMode";
import type { ICheckoutData, ILocationInputs } from "@/interfaces/FormInputs";
import { LocationSchema } from "@/validation/FormSchema";
import {
	Button,
	Field,
	Fieldset,
	For,
	Input,
	NativeSelect,
	SimpleGrid,
	Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Iprops {
	setData: Dispatch<SetStateAction<ICheckoutData>>;
	setStep: Dispatch<SetStateAction<number>>;
	setProgress: Dispatch<SetStateAction<number>>;
}

const LocationForm = ({ setData, setStep, setProgress }: Iprops) => {
	const { colorMode } = useColorMode();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILocationInputs>({
		resolver: yupResolver(LocationSchema),
	});
	return (
		<form
			onSubmit={handleSubmit((data) => {
				setData((prev) => ({ ...prev, location: data }));
				setStep((prev) => prev + 1);
				setProgress((prev) => prev + 50);
			})}>
			<Fieldset.Root size='lg' maxW='md'>
				<Stack>
					<Fieldset.Legend>User Location</Fieldset.Legend>
					<Fieldset.HelperText>
						Please provide your shipping address.
					</Fieldset.HelperText>
				</Stack>

				<Fieldset.Content>
					<Field.Root>
						<Field.Label>Country / Region</Field.Label>
						<NativeSelect.Root {...register("country")}>
							<NativeSelect.Field>
								<For each={["United States", "Canada", "Mexico"]}>
									{(item) => (
										<option key={item} value={item}>
											{item}
										</option>
									)}
								</For>
							</NativeSelect.Field>
							<NativeSelect.Indicator />
						</NativeSelect.Root>
						{errors.country && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.country.message}
							</Field.HelperText>
						)}
					</Field.Root>

					<Field.Root mt={4}>
						<Field.Label>Street Address</Field.Label>
						<Input placeholder='1234 Main St' {...register("street_address")} />
						{errors.street_address && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.street_address.message}
							</Field.HelperText>
						)}
					</Field.Root>

					<SimpleGrid columns={2} gap={4} mt={4}>
						<Field.Root>
							<Field.Label>City</Field.Label>
							<Input placeholder='City' {...register("city")} />
							{errors.city && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.city.message}
								</Field.HelperText>
							)}
						</Field.Root>

						<Field.Root>
							<Field.Label>State / Province</Field.Label>
							<Input placeholder='State' {...register("state")} />
							{errors.state && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.state.message}
								</Field.HelperText>
							)}
						</Field.Root>
					</SimpleGrid>

					<Field.Root mt={4}>
						<Field.Label>ZIP / Postal</Field.Label>
						<Input placeholder='12345' {...register("postal_code")} />
						{errors.postal_code && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.postal_code.message}
							</Field.HelperText>
						)}
					</Field.Root>

					<Button
						type='submit'
						borderStyle={"solid"}
						borderWidth='1px'
						borderColor={colorMode === "light" ? "teal.700" : "teal.200"}
						bg={colorMode === "light" ? "teal.200" : "teal.700"}
						color={colorMode === "light" ? "teal.700" : "teal.200"}
						colorScheme='teal'
						variant={"outline"}
						mt={4}>
						Next
					</Button>
				</Fieldset.Content>
			</Fieldset.Root>
		</form>
	);
};

export default LocationForm;
