"use client";

import { useResetPasswordMutation } from "@/app/services/UserApi";
import { toaster } from "@/config/toaster";
import { useColorMode } from "@/hooks/useColorMode";
import type { IError } from "@/interfaces/Error";
import { ConfirmPasswordSchema } from "@/validation/FormSchema";
import {
	Button,
	Field,
	Fieldset,
	Flex,
	Heading,
	Input,
	Spinner,
	Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

interface IFormInputs {
	newPassword: string;
	confirmNewPassword: string;
}

const ResetPasswordPage = () => {
	const [triggerResetPassword, { isLoading: isLoadingResetPassword }] =
		useResetPasswordMutation();

	const { code: resetCode } = useParams<{ code: string }>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(ConfirmPasswordSchema),
	});

	const { colorMode } = useColorMode();

	const handleResetPassword = async (data: IFormInputs) => {
		if (!resetCode) {
			toaster.error({
				title: "Error",
				description: "Reset code is missing from the URL",
			});
			return;
		}

		try {
			const res = await triggerResetPassword({
				code: resetCode,
				password: data.newPassword,
				passwordConfirmation: data.confirmNewPassword,
			}).unwrap();

			console.log(res);
			toaster.success({
				title: "Password Reset",
				description: "Your password has been reset successfully",
			});

			setTimeout(() => {
				window.location.href = "/login";
			}, 2000);
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: `${errorObj.data.error?.status || "Unknown"} Error`,
				description: errorObj.data.error?.message,
			});
		}
	};

	return (
		<Flex
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
					Enter new password
				</Heading>
				<form onSubmit={handleSubmit(handleResetPassword)}>
					<Fieldset.Root>
						<Field.Root>
							<Field.Label>New Password</Field.Label>
							<Input type='password' {...register("newPassword")} />
							{errors.newPassword && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.newPassword.message}
								</Field.HelperText>
							)}
						</Field.Root>
						<Field.Root>
							<Field.Label>Confirm New Password</Field.Label>
							<Input type='password' {...register("confirmNewPassword")} />
							{errors.confirmNewPassword && (
								<Field.HelperText
									maxW={"300px"}
									color={colorMode === "light" ? "red.600" : "red.300"}
									fontSize={"sm"}>
									<Field.ErrorIcon w={4} mr={2} />
									{errors.confirmNewPassword.message}
								</Field.HelperText>
							)}
						</Field.Root>
					</Fieldset.Root>
					<Stack gap={6} mt={4}>
						<Button
							type='submit'
							disabled={isLoadingResetPassword}
							_disabled={{ cursor: "not-allowed", opacity: 0.7 }}
							bg={"teal.700"}
							color={"white"}
							_hover={{
								bg: "teal.600",
							}}>
							{isLoadingResetPassword && <Spinner size='sm' mr={2} />}
							{isLoadingResetPassword ? "Resetting..." : "Reset Password"}
						</Button>
					</Stack>
				</form>
			</Stack>
		</Flex>
	);
};

export default ResetPasswordPage;
