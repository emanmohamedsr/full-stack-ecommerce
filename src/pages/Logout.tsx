import { useColorMode } from "@/hooks/useColorMode";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import cookieService from "@/services/Cookie";
import { toaster } from "@/config/toaster";
import { selectNetworkStatus } from "@/app/features/networkSlice";
import { useSelector } from "react-redux";
import EmptyProductsState from "@/components/EmptyProductsState";
import { ImProfile } from "react-icons/im";
const LogoutPage = () => {
	const isOnline = useSelector(selectNetworkStatus);
	const navigate = useNavigate();
	const { colorMode } = useColorMode();
	if (!isOnline) {
		return (
			<EmptyProductsState
				title='No Internet Connection'
				description='Please check your internet connection and try again.'>
				<ImProfile />
			</EmptyProductsState>
		);
	}
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
						<Button
							onClick={() => {
								cookieService.remove("ma7al_jwt");
								toaster.info({
									title: "Logged out",
									description: "You have been successfully logged out.",
								});
								setTimeout(() => {
									navigate("/login");
								}, 100);
							}}
							variant={"outline"}
							bg={"red.200"}
							borderWidth={"1px"}
							borderColor={"red.700"}
							borderStyle={"solid"}
							color={"red.700"}>
							Logout
						</Button>
						<Button
							variant={"outline"}
							bg={"teal.200"}
							borderWidth={"1px"}
							borderColor={"teal.700"}
							borderStyle={"solid"}
							color={"teal.700"}
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
