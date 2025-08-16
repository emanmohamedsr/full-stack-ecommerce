import { useColorMode } from "@/hooks/useColorMode";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const navigate = useNavigate();
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
					color={colorMode === "light" ? "teal.600" : "teal.600"}
					textAlign={"center"}>
					Logout
				</Heading>
				<Box
					maxW='md'
					shadow={"md"}
					bg={colorMode === "light" ? "gray.50" : "gray.700"}
					p={6}
					rounded='md'>
					<Text
						color={colorMode === "light" ? "gray.700" : "gray.200"}
						fontSize='lg'
						textAlign='center'>
						We hope to see you again soon! If you have any feedback or
						suggestions, please let us know.
					</Text>
					<Stack gap={4} mt={6}>
						<Button variant='solid' bg='red.700' color='white'>
							Logout
						</Button>
						<Button
							variant='solid'
							bg='teal.700'
							color='white'
							onClick={() => navigate(-1)}>
							Back
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default LogoutPage;
