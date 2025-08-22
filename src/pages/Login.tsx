"use client";

import { useColorMode } from "@/hooks/useColorMode";
import { LoginSchema } from "@/validation/FormSchema";
import {
	Flex,
	Input,
	Fieldset,
	Field,
	Stack,
	Button,
	Heading,
	HStack,
	Checkbox,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useLazyGetMeQuery, useLoginUserMutation } from "@/services/UserApi";
import { toaster } from "@/config/toaster";
import type { IError } from "@/interfaces/Error";
import CookieService from "@/services/Cookie";
import { useState } from "react";
import type { CookieSetOptions } from "universal-cookie";
import type { IResponse, IUser } from "@/interfaces/User";
import { useDispatch } from "react-redux";
import { setUserSession } from "@/app/features/authSlice";

interface ILoginUser {
	identifier: string;
	password: string;
}

const LoginPage = () => {
	const dispatch = useDispatch();
	const [loginUser, { isLoading }] = useLoginUserMutation();
	const [triggerGetMe] = useLazyGetMeQuery();
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginUser>({
		resolver: yupResolver(LoginSchema),
	});

	const handleLoginUser = async (data: ILoginUser) => {
		try {
			const res: IResponse = await loginUser(data).unwrap();

			const options: CookieSetOptions = {
				path: "/",
			};
			if (rememberMe) {
				const date = new Date();
				const IN_DAYS = 3;
				const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
				date.setTime(date.getTime() + EXPIRES_IN_DAYS);
				options.expires = date;
			}
			CookieService.set("ma7al_jwt", res.jwt, options);

			const cookieToken = CookieService.get("ma7al_jwt");
			const user: IUser = await triggerGetMe(cookieToken).unwrap();

			dispatch(
				setUserSession({
					token: res.jwt,
					user: user,
				}),
			);

			toaster.success({
				title: "Login successful",
				description: `Welcome back, ${res.user.username}!`,
			});
		} catch (e) {
			const errorObj = e as IError;
			toaster.error({
				title: "Login failed",
				description: errorObj.data.error?.message || "Unknown error",
			});
		}
	};

	const { colorMode } = useColorMode();
	return (
		<Flex
			pos={"relative"}
			minH={"calc(100vh - 64px)"}
			align={"center"}
			justify={"center"}
			bg={colorMode === "light" ? "white" : "gray.800"}>
			<Stack mx={"auto"} maxW={"xl"} gap={4} spaceY={2} px={6}>
				<Heading
					fontSize={"4xl"}
					color={colorMode === "light" ? "teal.600" : "teal.600"}>
					Sign in to your account
				</Heading>

				<form onSubmit={handleSubmit(handleLoginUser)}>
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
								<Field.Label>Email address</Field.Label>
								<Input type='email' {...register("identifier")} />
								{errors.identifier && (
									<Field.HelperText
										maxW={"300px"}
										color={colorMode === "light" ? "red.600" : "red.300"}
										fontSize={"sm"}>
										<Field.ErrorIcon w={4} mr={2} />
										{errors.identifier.message}
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

						<HStack w={"100%"} justifyContent={"space-between"}>
							<Checkbox.Root
								checked={rememberMe}
								onCheckedChange={() => setRememberMe((prev) => !prev)}>
								<Checkbox.HiddenInput />
								<Checkbox.Control
									color={colorMode === "light" ? "teal.600" : "white"}
									bg={colorMode === "light" ? "teal.100" : "teal.700"}
								/>
								<Checkbox.Label>Remember me</Checkbox.Label>
							</Checkbox.Root>
							<Button variant={"plain"} color={"teal.600"}>
								Forgot Password?
							</Button>
						</HStack>

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

				<HStack justify={"center"} align={"center"} textAlign={"center"}>
					Don't have an account?
					<Button
						variant={"plain"}
						color={"teal.600"}
						ml={"-10px"}
						onClick={() => navigate("/signup")}>
						Sign up
					</Button>
				</HStack>
			</Stack>
		</Flex>
	);
};

export default LoginPage;
