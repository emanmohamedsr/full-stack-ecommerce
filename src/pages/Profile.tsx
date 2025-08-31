import type { RootState } from "@/app/store";
import { useColorMode } from "@/hooks/useColorMode";
import { useLazyGetMeQuery } from "@/app/services/UserApi";
import { Image, Stack, DataList, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookieService from "@/services/Cookie";
import type { IUser } from "@/interfaces/User";
import { clearSession, setUserSession } from "@/app/features/authSlice";
import LoadingOverlay from "@/components/loading";

const ProfilePage = () => {
	const { colorMode } = useColorMode();

	const { token, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const [triggerGetMe, { isLoading, isError, error }] = useLazyGetMeQuery();
	const [validUser, setValidUser] = useState<IUser | null>(null);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	useEffect(() => {
		let isMounted = true; // Flag to prevent state updates on unmounted component

		const checkAuth = async () => {
			// If we already have a token and user in store
			if (token && user) {
				if (isMounted) {
					setValidUser(user);
					setIsCheckingAuth(false);
				}
				return;
			}

			// Check if we have a token in cookies
			const cookieToken = cookieService.get("ma7al_jwt");
			if (cookieToken) {
				try {
					const res: IUser = await triggerGetMe(cookieToken).unwrap();
					if (isMounted) {
						dispatch(
							setUserSession({
								token: cookieToken,
								user: res,
							}),
						);
						setValidUser(res);
					}
				} catch (error) {
					console.error("Auth check failed:", error);
					cookieService.remove("ma7al_jwt");
					dispatch(clearSession());
					if (isMounted) {
						setValidUser(null);
					}
				}
			} else if (isMounted) {
				setValidUser(null);
			}

			if (isMounted) setIsCheckingAuth(false);
		};

		checkAuth();

		// Cleanup function
		return () => {
			isMounted = false;
		};
	}, [dispatch, token, user, triggerGetMe]);
	if (isCheckingAuth || isLoading) {
		return (
			<LoadingOverlay
				isOpen={isCheckingAuth || isLoading}
				description='Checking authentication...'
			/>
		);
	}
	if (isError) {
		throw error;
	}
	if (validUser) {
		const stats = [
			{
				label: "Username",
				value: validUser.username,
				diff: -12,
				helpText: "Till date",
			},
			{
				label: "Email",
				value: validUser.email,
				diff: 12,
				helpText: "Last 30 days",
			},
		];
		return (
			<Stack
				maxW={{ base: "100%", md: "500px" }}
				mx='auto'
				p={4}
				minH='calc(100vh - 64px)'
				justifyContent='center'
				alignItems='center'
				spaceY={6}>
				<Stack
					w={"100%"}
					direction={{ base: "column-reverse", md: "row" }}
					gap={4}
					justifyContent='center'
					alignItems={"center"}>
					<Box
						w={{ base: "100%", md: "200px" }}
						borderWidth='2px'
						borderColor={colorMode === "dark" ? "gray.800" : "gray.200"}
						borderStyle='solid'
						borderRadius={{ base: "md", md: "full" }}>
						<Image
							src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${validUser.username}`}
							p={2}
							w='200px'
							mx={"auto"}
						/>
					</Box>
					<DataList.Root orientation='horizontal'>
						{stats.map((item) => (
							<DataList.Item key={item.label}>
								<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
								<DataList.ItemValue>{item.value}</DataList.ItemValue>
							</DataList.Item>
						))}
					</DataList.Root>
				</Stack>
				<Stack w={"100%"} direction='column' gap={6}>
					<Stack direction={"column"} flexWrap='wrap' gap={4} align='start'>
						<Button w={"100%"}>Reset Password</Button>
						<Button w={"100%"} variant={"solid"} bg={"red.700"} color={"white"}>
							Delete Account
						</Button>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default ProfilePage;
