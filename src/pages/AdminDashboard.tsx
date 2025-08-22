import { clearSession, setUserSession } from "@/app/features/authSlice";
import type { RootState } from "@/app/store";
import type { IUser } from "@/interfaces/User";
import { useLazyGetMeQuery } from "@/services/UserApi";
import { Box, HStack, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookieService from "@/services/Cookie";
import ErrorHandler from "@/components/error/ErrorHandler";

const AdminDashboardPage = () => {
	const { token, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const [triggerGetMe, { isLoading, isError, error }] = useLazyGetMeQuery();
	const [validAdmin, setValidAdmin] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	useEffect(() => {
		let isMounted = true; // Flag to prevent state updates on unmounted component

		const checkAuth = async () => {
			// If we already have a token and user in store
			if (token && user) {
				if (isMounted) {
					setValidAdmin(user.role?.name === "Admin");
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
						setValidAdmin(res.role?.name === "Admin");
					}
				} catch (error) {
					console.error("Auth check failed:", error);
					cookieService.remove("ma7al_jwt");
					dispatch(clearSession());
					if (isMounted) {
						setValidAdmin(false);
					}
				}
			} else if (isMounted) {
				setValidAdmin(false);
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
			<HStack overflow={"hidden"}>
				<VStack
					bg='gray.600'
					colorPalette='teal'
					gap={4}
					align='center'
					justify='center'>
					<Spinner color='teal.600' size='xl' />
					<Text color='teal.600'>Checking authentication...</Text>
				</VStack>
			</HStack>
		);
	}
	if (isError) {
		throw error;
	}
	if (validAdmin) {
		return (
			<Table.ScrollArea borderWidth='1px' borderTop={"none"} maxW='100%'>
				<Table.Root size='sm' variant='line' striped>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader textAlign={"center"} minW='300px'>
								Product
							</Table.ColumnHeader>
							<Table.ColumnHeader textAlign={"center"} minW='200px'>
								Actions
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{/* {products.map((p) => (
							<Table.Row key={p.id}>
								<Table.Cell>
									<ProductCell
									product={p}
								/> 
								</Table.Cell>
								<Table.Cell>
									<Flex align='center' justify='center' gap={2} wrap={"wrap"}>
										<Button bg={"cyan.700"} color={"white"}>
											view
										</Button>
										<Button bg={"teal.700"} color={"white"}>
											Edit
										</Button>
										<Button bg={"red.700"} color={"white"}>
											Delete
										</Button>
									</Flex>
								</Table.Cell>
							</Table.Row>
						))} */}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		);
	}
	return (
		<Box
			position='absolute'
			top={-64}
			left={{ base: 0, md: -60 }}
			right={0}
			bottom={0}>
			<ErrorHandler
				defaultTitle='access denied'
				defaultStatusCode={403}
				showHome></ErrorHandler>
		</Box>
	);
};

export default AdminDashboardPage;
