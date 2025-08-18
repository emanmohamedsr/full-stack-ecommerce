"use client";

import { useColorMode } from "@/hooks/useColorMode";
import {
	Flex,
	Input,
	Fieldset,
	Field,
	Stack,
	Button,
	Heading,
	HStack,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "@/validation/FormSchema";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/config/toaster";
import { useSignupUserMutation } from "@/services/User";
import type { IError } from "@/interfaces";

interface ISignupUser {
	username: string;
	email: string;
	password: string;
}

const SignupPage = () => {
	const [signupUser, { isLoading }] = useSignupUserMutation();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignupUser>({
		resolver: yupResolver(SignupSchema),
	});

	const handleSignupUser = async (data: ISignupUser) => {
		try {
			const { user } = await signupUser(data).unwrap();
			toaster.success({
				title: "Signup successful",
				description: `Welcome aboard, ${user.username}!`,
			});
		} catch (e) {
			const errorObj = e as IError;
			toaster.error({
				title: "Signup failed",
				description: errorObj.data.error?.message || "Unknown error",
			});
		}
	};

	const { colorMode } = useColorMode();
	return (
		<Flex
			minH={"calc(100vh - 64px)"}
			align={"center"}
			justify={"center"}
			bg={colorMode === "light" ? "white" : "gray.800"}>
			<Stack mx={"auto"} maxW={"xl"} gap={4} spaceY={2} px={6}>
				<Heading
					fontSize={"4xl"}
					color={colorMode === "light" ? "teal.600" : "teal.600"}>
					Create a new account
				</Heading>

				<form onSubmit={handleSubmit(handleSignupUser)}>
					<Fieldset.Root
						mx={"auto"}
						size='lg'
						maxW='md'
						shadow={"md"}
						bg={colorMode === "light" ? "gray.50" : "gray.700"}
						p={6}
						rounded='md'>
						<Stack gap={2}>
							<Fieldset.Legend>Contact details</Fieldset.Legend>
							<Fieldset.HelperText>
								Please provide your contact details below.
							</Fieldset.HelperText>
						</Stack>

						<Fieldset.Content maxW={"100%"}>
							<Field.Root>
								<Field.Label>username</Field.Label>
								<Input type='text' {...register("username")} />
								{errors.username && (
									<Field.HelperText
										maxW={"300px"}
										color={colorMode === "light" ? "red.600" : "red.300"}
										fontSize={"sm"}>
										<Field.ErrorIcon w={4} mr={2} />
										{errors.username.message}
									</Field.HelperText>
								)}
							</Field.Root>
							<Field.Root>
								<Field.Label>Email address</Field.Label>
								<Input type='email' {...register("email")} />
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
							<Field.Root>
								<Field.Label>Password</Field.Label>
								<Input type='password' {...register("password")} />
								{errors.password && (
									<Field.HelperText
										maxW={"300px"}
										color={colorMode === "light" ? "red.600" : "red.300"}
										fontSize={"sm"}>
										<Field.ErrorIcon w={4} mr={2} />
										{errors.password.message}
									</Field.HelperText>
								)}
							</Field.Root>
						</Fieldset.Content>

						<Button
							disabled={isLoading}
							type='submit'
							alignSelf='flex-start'
							mt={5}
							bg='teal.700'
							color='white'
							_disabled={{
								bg: "gray.400",
								cursor: "not-allowed",
							}}>
							<HStack>
								{isLoading && <Spinner />}
								{isLoading ? "Loading" : "Submit"}
							</HStack>
						</Button>
					</Fieldset.Root>
				</form>

				<HStack alignContent={"center"} justify={"center"} textAlign={"center"}>
					Already have an account?
					<Button
						variant={"plain"}
						color={"teal.600"}
						ml={"-10px"}
						onClick={() => navigate("/login")}>
						Sign in
					</Button>
				</HStack>
			</Stack>
		</Flex>
	);
};

export default SignupPage;
