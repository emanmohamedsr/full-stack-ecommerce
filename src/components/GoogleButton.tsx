import { useColorMode } from "@/hooks/useColorMode";
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
	const { colorMode } = useColorMode();
	const handleGoogleLogin = () =>
		(window.location.href = `${
			import.meta.env.VITE_API_URL
		}/api/connect/google`);
	return (
		<Button
			onClick={handleGoogleLogin}
			boxShadow={"md"}
			mt={2}
			bg={colorMode === "light" ? "white" : "gray.700"}
			border={"1px"}
			borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
			color={colorMode === "light" ? "black" : "white"}
			gap={3}
			variant={"solid"}
			colorScheme={"teal"}>
			<FcGoogle size={20} />
			Get started with Google
		</Button>
	);
};

export default GoogleButton;
