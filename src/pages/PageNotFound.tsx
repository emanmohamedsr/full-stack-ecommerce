import { useColorMode } from "@/hooks/useColorMode";
import { Heading, Text, Button, Image, HStack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import pageNotFoundImg from "@/assets/NotFoundPage.svg";

const PageNotFound = () => {
	const { colorMode } = useColorMode();

	return (
		<VStack
			textAlign='center'
			py={10}
			px={6}
			h='100vh'
			justify={"center"}
			align={"center"}>
			<HStack spaceX={8} align='center'>
				<Image
					src={pageNotFoundImg}
					alt='page-not-found'
					display={"none"}
					md={{ display: "block" }}
				/>
				<VStack>
					<Heading
						display='inline-block'
						as='h2'
						size='2xl'
						color={colorMode === "dark" ? "white" : "teal.950"}>
						Page Not Found
					</Heading>
					<Text color={"gray.500"} mb={6}>
						The page you're looking for does not seem to exist
					</Text>
				</VStack>
			</HStack>
			<Link to={"/"}>
				<Button
					colorScheme={colorMode === "dark" ? "whiteAlpha" : "teal"}
					variant='outline'
					borderColor={colorMode === "dark" ? "white" : "teal.950"}
					color={colorMode === "dark" ? "white" : "teal.950"}>
					<FaHome />
					Go to Home
				</Button>
			</Link>
		</VStack>
	);
};
export default PageNotFound;
