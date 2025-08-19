"use client";

import { useColorMode } from "@/hooks/useColorMode";
import { AdminLoginSchema } from "@/validation/FormSchema";
import {
	Flex,
	Input,
	Fieldset,
	Field,
	Stack,
	Button,
	Heading,
	Box,
	SkeletonCircle,
	HStack,
	Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

interface ILoginAdmin {
	identifier: string;
	password: string;
	adminSecretCode: string;
}

const AdminLoginPage = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginAdmin>({
		resolver: yupResolver(AdminLoginSchema),
	});

	const handleLoginAdmin = (data: ILoginAdmin) => {
		console.log("Logging in admin:", data);
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
					color={colorMode === "light" ? "yellow.600" : "yellow.600"}>
					Sign in to your admin account
				</Heading>

				<form onSubmit={handleSubmit(handleLoginAdmin)}>
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
								Please provide your contact Admin details below.
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
							<Field.Root>
								<Field.Label>Admin Secret Code</Field.Label>
								<Input type='text' {...register("adminSecretCode")} />
								{errors.adminSecretCode && (
									<Field.HelperText
										maxW={"300px"}
										color={colorMode === "light" ? "red.600" : "red.300"}
										fontSize={"sm"}>
										<Field.ErrorIcon w={4} mr={2} />
										{errors.adminSecretCode.message}
									</Field.HelperText>
								)}
							</Field.Root>
						</Fieldset.Content>

						<HStack w={"100%"} justifyContent={"space-between"}>
							<Checkbox.Root>
								<Checkbox.HiddenInput />
								<Checkbox.Control
									color={colorMode === "light" ? "yellow.600" : "white"}
									bg={colorMode === "light" ? "yellow.100" : "yellow.700"}
								/>
								<Checkbox.Label>Remember me</Checkbox.Label>
							</Checkbox.Root>
							<Button variant={"plain"} color={"yellow.600"}>
								Forgot Password?
							</Button>
						</HStack>

						<Box
							onClick={() => navigate("/admin-login")}
							pos={"absolute"}
							bottom={"5px"}
							left={"4px"}
							opacity={0}
							w={"20px"}
							h={"20px"}
							bg={"red.700"}
							borderRadius={"full"}
							_hover={{ opacity: 0.8 }}>
							<SkeletonCircle size='100%' />
						</Box>

						<Button
							type='submit'
							alignSelf='flex-start'
							mt={5}
							bg='yellow.700'
							color='white'>
							Submit
						</Button>
					</Fieldset.Root>
				</form>
			</Stack>
		</Flex>
	);
};

export default AdminLoginPage;
