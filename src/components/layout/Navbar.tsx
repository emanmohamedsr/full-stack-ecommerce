"use client";

import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	IconButton,
	Image,
	Portal,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useColorMode } from "@/hooks/useColorMode";
import { Menu } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Logo0 from "@/assets/logo.svg";
import Logo1 from "@/assets/logo1.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import cookieService from "@/services/Cookie";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useLazyGetMeQuery } from "@/app/services/UserApi";
import type { IUser } from "@/interfaces/User";
import { clearSession, setUserSession } from "@/app/features/authSlice";
import { useEffect, useState } from "react";
import { selectCartProducts } from "@/app/features/cartSlice";
import LoadingOverlay from "../loading";
interface Props {
	children: React.ReactNode;
}

const MyChakraNavLink = (props: Props) => {
	const { colorMode } = useColorMode();
	const { children } = props;
	return (
		<Box
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: colorMode === "light" ? "teal.100" : "teal.700",
			}}>
			{children}
		</Box>
	);
};

const Navbar = () => {
	const cartProducts = useSelector(selectCartProducts);
	const { token, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const [triggerGetMe, { isLoading: isLoadingUser, isError, error }] =
		useLazyGetMeQuery();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		let isMounted = true; // Flag to prevent state updates on unmounted component

		const checkAuth = async () => {
			// If we already have a token and user in store
			if (token && user) {
				if (isMounted) {
					setIsAuthenticated(true);
					setIsAdmin(user.role?.name === "Admin");
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
						setIsAuthenticated(true);
						setIsAdmin(res.role?.name === "Admin");
					}
				} catch (error) {
					console.error("Auth check failed:", error);
					cookieService.remove("ma7al_jwt");
					dispatch(clearSession());
					if (isMounted) {
						setIsAuthenticated(false);
						setIsAdmin(false);
					}
				}
			} else if (isMounted) {
				setIsAuthenticated(false);
				setIsAdmin(false);
			}

			if (isMounted) setIsCheckingAuth(false);
		};

		checkAuth();

		// Cleanup function
		return () => {
			isMounted = false;
		};
	}, [dispatch, token, user, triggerGetMe]);

	const { colorMode } = useColorMode();
	const { open, onOpen, onClose } = useDisclosure();
	if (isCheckingAuth || isLoadingUser) {
		return (
			<LoadingOverlay
				isOpen={isCheckingAuth || isLoadingUser}
				description='Checking authentication...'
			/>
		);
	}
	if (isError) {
		throw error;
	}
	return (
		<>
			<Box bg={colorMode === "light" ? "gray.100" : "gray.900"} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size='md'
						aria-label='Open Menu'
						variant='ghost'
						color='currentColor'
						display={{ md: "none" }}
						onClick={open ? onClose : onOpen}>
						{open ? <IoCloseOutline /> : <RxHamburgerMenu />}
					</IconButton>
					<HStack
						gap={8}
						alignItems={"center"}
						display={"none"}
						sm={{ display: "flex" }}>
						<Link to='/'>
							<Stack direction={"row"} gap={0}>
								<Image
									position={"relative"}
									top={"-4px"}
									left={"6px"}
									src={Logo1}
									alt='Logo'
									w={"20px"}
									objectFit={"contain"}
								/>
								<Image src={Logo0} alt='Logo' w={"150px"} />
							</Stack>
						</Link>
						<HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
							<HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
								{isAuthenticated && isAdmin && (
									<Link to='/admin/dashboard'>
										<MyChakraNavLink>Admin-Dashboard</MyChakraNavLink>
									</Link>
								)}
								<Link to='/about'>
									<MyChakraNavLink>About</MyChakraNavLink>
								</Link>
								<Link to='/cart'>
									<MyChakraNavLink>
										<Box position={"relative"}>
											<AiOutlineShoppingCart />
											{cartProducts.length > 0 && (
												<Box
													as='span'
													position={"absolute"}
													boxSize={"18px"}
													display={"flex"}
													alignItems={"center"}
													justifyContent={"center"}
													top={"-15px"}
													right={"-15px"}
													rounded={"full"}
													bg={colorMode === "light" ? "red.200" : "red.700"}
													p={2}
													color={colorMode === "light" ? "black" : "gray.200"}
													fontSize='xs'>
													{cartProducts.length}
												</Box>
											)}
										</Box>
									</MyChakraNavLink>
								</Link>
							</HStack>
						</HStack>
					</HStack>

					<Flex alignItems={"center"}>
						<Stack direction={"row"} gap={7}>
							<ColorModeButton />

							{isAuthenticated && (
								<Menu.Root positioning={{ placement: "bottom-end", gutter: 6 }}>
									<Menu.Trigger
										rounded='full'
										focusRing='outside'
										cursor={"pointer"}>
										<Avatar.Root size='sm'>
											<Avatar.Fallback name={user?.username} />
											<Avatar.Image
												src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.username}`}
											/>
										</Avatar.Root>
									</Menu.Trigger>
									<Portal>
										<Menu.Positioner>
											<Menu.Content>
												<Center py={2}>
													<Avatar.Root>
														<Avatar.Fallback name={user?.username} />
														<Avatar.Image
															src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.username}`}
														/>
													</Avatar.Root>
												</Center>
												<Center mb={2}>
													<Text>{user?.username}</Text>
												</Center>
												<Menu.Separator />
												<Menu.Item
													value='profile'
													color={
														colorMode === "light" ? "teal.700" : "teal.400"
													}>
													<Link to='/profile'>
														<Box display={"flex"} alignItems={"center"} gap={2}>
															<CgProfile />
															Profile
														</Box>
													</Link>
												</Menu.Item>
												<Menu.Item value='logout' color={"red.600"}>
													<Link to='/logout'>
														<Box display={"flex"} alignItems={"center"} gap={2}>
															<TbLogout2 />
															Logout
														</Box>
													</Link>
												</Menu.Item>
											</Menu.Content>
										</Menu.Positioner>
									</Portal>
								</Menu.Root>
							)}

							{!isAuthenticated && (
								<HStack spaceX={1} ml={4}>
									<Link to='/login'>
										<Button
											variant='outline'
											size='xs'
											md={{ width: "100px", height: "40px", fontSize: "16px" }}>
											Sign in
										</Button>
									</Link>
									<Link to='/signup'>
										<Button
											md={{ width: "100px", height: "40px", fontSize: "16px" }}
											variant='solid'
											bg={"teal.700"}
											color={"white"}
											size='xs'>
											Sign up
										</Button>
									</Link>
								</HStack>
							)}
						</Stack>
					</Flex>
				</Flex>
				{open ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} gap={4}>
							{isAuthenticated && isAdmin && (
								<Link to='/admin/dashboard'>
									<MyChakraNavLink>Admin Dashboard</MyChakraNavLink>
								</Link>
							)}
							<Link to='/about'>
								<MyChakraNavLink>About</MyChakraNavLink>
							</Link>
							<Link to='/cart'>
								<MyChakraNavLink>
									<Box display={"flex"} alignItems={"center"} gap={2}>
										<AiOutlineShoppingCart />
										{cartProducts.length > 0 && (
											<Text
												rounded={"full"}
												boxSize={"18px"}
												display={"flex"}
												alignItems={"center"}
												justifyContent={"center"}
												bg={colorMode === "light" ? "red.200" : "red.700"}
												p={2}
												color={colorMode === "light" ? "black" : "gray.200"}
												fontSize={"xs"}>
												{cartProducts.length}
											</Text>
										)}
									</Box>
								</MyChakraNavLink>
							</Link>
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};
export default Navbar;
