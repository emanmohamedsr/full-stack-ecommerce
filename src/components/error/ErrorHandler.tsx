import { Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";
import ErrorImg from "@/assets/error.svg";
import { useColorMode } from "@/hooks/useColorMode";
import { FaHome } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
interface IProps {
	defaultStatusCode?: number;
	defaultTitle?: string;
	showRefresh?: boolean;
	showHome?: boolean;
}

const ErrorHandler = ({
	defaultStatusCode = 500,
	defaultTitle = "Server Error",
	showRefresh = true,
	showHome = true,
}: IProps) => {
	type RouteError = {
		status?: number;
		message?: string;
		[key: string]: unknown;
	};

	const { colorMode } = useColorMode();
	const error = useRouteError() as RouteError | undefined;
	const statusCode = error?.status || defaultStatusCode;
	const errorMessage = error?.message || defaultTitle;

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
					src={ErrorImg}
					alt='error'
					display={"none"}
					md={{ display: "block" }}
				/>
				<VStack>
					<Heading
						display='inline-block'
						as='h2'
						size='2xl'
						color={colorMode === "dark" ? "white" : "teal.950"}>
						Oops, something went wrong.
					</Heading>
					<Text color={"gray.500"} mb={6}>
						{statusCode} - {errorMessage}
					</Text>
				</VStack>
			</HStack>
			<HStack
				gap={2}
				align='center'
				justifyContent={"center"}
				alignItems={"center"}
				flexWrap='wrap'>
				{showRefresh && (
					<Button
						colorScheme={colorMode === "dark" ? "whiteAlpha" : "teal"}
						variant='outline'
						borderColor={colorMode === "dark" ? "white" : "teal.950"}
						color={colorMode === "dark" ? "white" : "teal.950"}
						onClick={() => window.location.reload()}>
						<MdOutlineRefresh />
						Refresh
					</Button>
				)}
				{showHome && (
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
				)}
				{statusCode === 401 && (
					<Link to={"/login"}>
						<Button
							colorScheme={colorMode === "dark" ? "whiteAlpha" : "teal"}
							variant='outline'
							borderColor={colorMode === "dark" ? "white" : "teal.950"}
							color={colorMode === "dark" ? "white" : "teal.950"}>
							<IoLogInOutline />
							Login
						</Button>
					</Link>
				)}
			</HStack>
		</VStack>
	);
};
export default ErrorHandler;
