import { useForgotPasswordMutation } from "@/app/services/UserApi";
import { toaster } from "@/config/toaster";
import { useColorMode } from "@/hooks/useColorMode";
import type { IError } from "@/interfaces/Error";
import { EmailSchema } from "@/validation/FormSchema";
import {
	Button,
	Field,
	Heading,
	Input,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
	email: string;
}

const ForgetPasswordPage = () => {
	const [triggerForgotPassword, { isLoading: isLoadingForgotPassword }] =
		useForgotPasswordMutation();
	const navigate = useNavigate();
	const { colorMode } = useColorMode();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(EmailSchema),
		defaultValues: { email: "" },
	});
	const handleEmailConfirm = async (data: IFormInputs) => {
		const { email } = data;
		try {
			const res = await triggerForgotPassword({ email }).unwrap();
			console.log(res);
			toaster.success({
				title: "Email Sent",
				description: "Check your inbox for the reset link.",
			});
			reset();
			navigate("/login");
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: `${errorObj.data.error?.status || "Unknown"} Error`,
				description: errorObj.data.error?.message,
			});
		}
	};
	return (
		<Stack
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={colorMode === "light" ? "gray.50" : "gray.800"}>
			<Stack
				gap={4}
				w={"full"}
				maxW={"md"}
				bg={colorMode === "light" ? "white" : "gray.700"}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={12}>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
					Forgot your password?
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={colorMode === "light" ? "gray.800" : "gray.400"}>
					You&apos;ll get an email with a reset link
				</Text>
				<form onSubmit={handleSubmit(handleEmailConfirm)}>
					<Field.Root gap={2} mb={4} colorPalette={"teal"}>
						<Field.Label>
							<MdOutlineMarkEmailUnread />
							Email
						</Field.Label>
						<Input
							autoFocus
							disabled={isLoadingForgotPassword}
							_disabled={{ cursor: "not-allowed", opacity: 0.5 }}
							placeholder='me@example.com'
							{...register("email")}
						/>
						{errors.email && (
							<Field.HelperText
								maxW={"300px"}
								color={colorMode === "light" ? "red.600" : "red.300"}
								fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								{errors.email.message}
							</Field.HelperText>
						)}
					</Field.Root>
					<Button
						w={"full"}
						type='submit'
						disabled={isLoadingForgotPassword}
						_disabled={{ cursor: "not-allowed" }}
						bg={"teal.100"}
						color={"teal.700"}
						variant={"outline"}
						border={"1px solid teal.700"}>
						{isLoadingForgotPassword && <Spinner size='sm' />}
						{isLoadingForgotPassword ? "Confirming..." : "Request Reset"}
					</Button>
				</form>
			</Stack>
		</Stack>
	);
};

export default ForgetPasswordPage;
