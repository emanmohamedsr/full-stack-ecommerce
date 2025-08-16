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
} from "@chakra-ui/react";

const LoginPage = () => {
	const { colorMode } = useColorMode();
	return (
		<Flex
			minH={"calc(100vh - 64px)"}
			align={"center"}
			justify={"center"}
			bg={colorMode === "light" ? "white" : "gray.800"}>
			<Stack mx={"auto"} maxW={"lg"} gap={6} spaceY={6} px={6}>
				<Heading
					fontSize={"4xl"}
					color={colorMode === "light" ? "teal.600" : "teal.600"}>
					Sign in to your account
				</Heading>

				<Fieldset.Root
					size='lg'
					maxW='md'
					shadow={"md"}
					bg={colorMode === "light" ? "gray.50" : "gray.700"}
					p={6}
					rounded='md'>
					<Stack gap={4}>
						<Fieldset.Legend>Contact details</Fieldset.Legend>
						<Fieldset.HelperText>
							Please provide your contact details below.
						</Fieldset.HelperText>
					</Stack>

					<Fieldset.Content>
						<Field.Root>
							<Field.Label>Email address</Field.Label>
							<Input name='email' type='email' />
							<Field.HelperText color={"red.600"} fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								error
							</Field.HelperText>
						</Field.Root>
						<Field.Root>
							<Field.Label>Password</Field.Label>
							<Input name='password' type='password' />
							<Field.HelperText color={"red.600"} fontSize={"sm"}>
								<Field.ErrorIcon w={4} mr={2} />
								error
							</Field.HelperText>
						</Field.Root>
					</Fieldset.Content>

					<Button
						type='submit'
						alignSelf='flex-start'
						mt={5}
						bg='teal.700'
						color='white'>
						Submit
					</Button>
				</Fieldset.Root>
			</Stack>
		</Flex>
	);
};

export default LoginPage;
