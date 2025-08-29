import { toaster } from "@/config/toaster";
import { useColorMode } from "@/hooks/useColorMode";
import type { ICheckoutData, IPaymentInputs } from "@/interfaces/FormInputs";
import { PaymentSchema } from "@/validation/FormSchema";
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
	setCompleted: Dispatch<SetStateAction<boolean>>;
}

const PaymentForm = ({ setData, setCompleted }: Iprops) => {
	const { colorMode } = useColorMode();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IPaymentInputs>({
		resolver: yupResolver(PaymentSchema),
	});
	return (
		<form
			onSubmit={handleSubmit((data) => {
				setData((prev) => ({ ...prev, payment: data }));
				setCompleted((prev) => !prev);
				toaster.success({
					title: "Payment Successful",
					description: "Your payment has been processed successfully.",
				});
			})}>
			<Fieldset.Root size='lg' maxW='md'>
				<Stack>
					<Fieldset.Legend>Payment Details</Fieldset.Legend>
					<Fieldset.HelperText>
						Enter your card information to complete checkout.
					</Fieldset.HelperText>
				</Stack>

				<Fieldset.Content>
					<Field.Root>
						<Field.Label>Cardholder Name</Field.Label>
						<Input placeholder='Name on card' {...register("card_name")} />
						{errors.card_name && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.card_name.message}
							</Field.HelperText>
						)}
					</Field.Root>

					<Field.Root mt={4}>
						<Field.Label>Card Number</Field.Label>
						<Input
							placeholder='1234 5678 9012 3456'
							{...register("card_number")}
						/>
						{errors.card_number && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.card_number.message}
							</Field.HelperText>
						)}
					</Field.Root>

					<SimpleGrid columns={2} gap={4} mt={4}>
						<Field.Root>
							<Field.Label>Expiration Date</Field.Label>
							<Input placeholder='MM/YY' {...register("expiration_date")} />
							{errors.expiration_date && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.expiration_date.message}
								</Field.HelperText>
							)}
						</Field.Root>

						<Field.Root>
							<Field.Label>CVV</Field.Label>
							<Input placeholder='123' type='password' {...register("cvv")} />
							{errors.cvv && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.cvv.message}
								</Field.HelperText>
							)}
						</Field.Root>
					</SimpleGrid>

					<Field.Root mt={4}>
						<Field.Label>Payment Method</Field.Label>
						<NativeSelect.Root {...register("payment_method")}>
							<NativeSelect.Field>
								<For
									each={["Visa", "Mastercard", "PayPal", "Cash on Delivery"]}>
									{(item) => (
										<option key={item} value={item}>
											{item}
										</option>
									)}
								</For>
							</NativeSelect.Field>

							<NativeSelect.Indicator />
						</NativeSelect.Root>
						{errors.payment_method && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.payment_method.message}
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
						Complete Order
					</Button>
				</Fieldset.Content>
			</Fieldset.Root>
		</form>
	);
};

export default PaymentForm;
