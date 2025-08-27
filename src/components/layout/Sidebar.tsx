"use client";

import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	Icon,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	Menu,
	Portal,
	Center,
	type FlexProps,
	type BoxProps,
	Stack,
	Image,
	HStack,
	Spinner,
	VStack,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { useColorMode } from "@/hooks/useColorMode";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Logo0 from "@/assets/logo.svg";
import Logo1 from "@/assets/logo1.svg";
import { ColorModeButton } from "../ui/color-mode";

interface LinkItemProps {
	id: number | null;
	name: string | null;
	icon: IconType;
	documentId: string | null;
}

interface NavItemProps extends FlexProps {
	icon: IconType;
	category?: ICategory | null;
}

interface MobileProps extends FlexProps {
	user: IUser;
	onOpen: () => void;
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

import { BiCategoryAlt } from "react-icons/bi";
import { LuEyeClosed } from "react-icons/lu";
import { GiHeartBottle } from "react-icons/gi";
import { PiShirtFoldedThin } from "react-icons/pi";
import { BsWatch } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { BiHappyBeaming } from "react-icons/bi";
import { GiSunglasses } from "react-icons/gi";
import { LuShirt } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { PiDressThin } from "react-icons/pi";
import { GiEarrings } from "react-icons/gi";
import { PiHighHeelThin } from "react-icons/pi";
import { GiPocketWatch } from "react-icons/gi";
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const { data: categoriesData, isLoading } = useGetCategoriesQuery({});
	const { colorMode } = useColorMode();
	const CategoriesIcons: Array<IconType> = [
		LuEyeClosed,
		GiHeartBottle,
		PiShirtFoldedThin,
		GiRunningShoe,
		BsWatch,
		BiHappyBeaming,
		GiSunglasses,
		LuShirt,
		BsHandbag,
		PiDressThin,
		GiEarrings,
		PiHighHeelThin,
		GiPocketWatch,
	];
	const LinkItems = (): Array<LinkItemProps> => {
		const defaultCategory = categoriesData.data?.map(
			(category: ICategory, index: number) => ({
				id: category.id ?? null,
				name: category.title ?? null,
				icon: CategoriesIcons[index] || BiCategoryAlt,
				documentId: category.documentId ?? null,
			}),
		);
		defaultCategory?.unshift({
			name: "All",
			icon: BiCategoryAlt,
			documentId: null,
		});
		return (
			defaultCategory || [
				{
					name: "All",
					icon: BiCategoryAlt,
					documentId: null,
				},
			]
		);
	};

	if (isLoading) return <Spinner />;
	return (
		<Box
			transition='3s ease'
			bg={colorMode === "light" ? "white" : "gray.900"}
			borderRight='1px'
			borderRightColor={colorMode === "light" ? "gray.200" : "gray.700"}
			w={{ base: "full", md: 60 }}
			pos='fixed'
			h='full'
			overflowY='auto'
			{...rest}>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
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
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems().map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					category={
						link.documentId && link.name && link.id
							? { id: link.id, title: link.name, documentId: link.documentId }
							: null
					}
				/>
			))}
		</Box>
	);
};

const NavItem = ({ icon, category, ...rest }: NavItemProps) => {
	const dispatch = useDispatch();
	const selectedCategory = useSelector(selectCategory);
	const { colorMode } = useColorMode();
	const isActive =
		selectedCategory?.documentId === category?.documentId ||
		(selectedCategory === null && category === null);

	return (
		<Box
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
			onClick={() => {
				dispatch(setCategory(category ? category : null));
			}}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				bg={isActive ? "teal.700" : "transparent"}
				color={isActive ? "white" : "inherit"}
				_hover={{
					bg: `${
						!isActive && (colorMode === "light" ? "teal.100" : "gray.800")
					}`,
					color: `${!isActive && (colorMode === "light" ? "black" : "white")}`,
				}}
				{...rest}>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						color={isActive ? "white" : "inherit"}
						as={icon}
					/>
				)}
				{category ? (
					<Text>{toCapitalize(category.title)}</Text>
				) : (
					<Text>All</Text>
				)}
			</Flex>
		</Box>
	);
};

const MobileNav = ({ user, onOpen, ...rest }: MobileProps) => {
	const { colorMode } = useColorMode();
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='64px'
			alignItems='center'
			bg={colorMode === "light" ? "white" : "gray.900"}
			borderBottomWidth='1px'
			borderBottomColor={colorMode === "light" ? "gray.200" : "gray.700"}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'>
				<FiMenu />
			</IconButton>

			<Box display={{ base: "none", sm: "block", md: "none" }}>
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
			</Box>

			<HStack gap={4} align={"center"}>
				<ColorModeButton />

				<Menu.Root positioning={{ placement: "bottom-end", gutter: 6 }}>
					<Menu.Trigger rounded='full' focusRing='outside' cursor={"pointer"}>
						<Avatar.Root size='sm'>
							<Avatar.Fallback name={user.username} />
							<Avatar.Image
								src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
							/>
						</Avatar.Root>
					</Menu.Trigger>
					<Portal>
						<Menu.Positioner>
							<Menu.Content>
								<Center py={2}>
									<Avatar.Root>
										<Avatar.Fallback name={user.username} />
										<Avatar.Image
											src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
										/>
									</Avatar.Root>
								</Center>
								<Center mb={2}>
									<Text>{user.username}</Text>
								</Center>
								<Menu.Separator />
								<Menu.Item
									value='profile'
									color={colorMode === "light" ? "teal.700" : "teal.400"}>
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
			</HStack>
		</Flex>
	);
};

import cookieService from "@/services/Cookie";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useLazyGetMeQuery } from "@/services/UserApi";
import { useEffect, useState } from "react";
import type { IUser } from "@/interfaces/User";
import { clearSession, setUserSession } from "@/app/features/authSlice";
import { useGetCategoriesQuery } from "@/services/categoriesApi";
import type { ICategory } from "@/interfaces/Product";
import { toCapitalize } from "@/utils";
import { selectCategory, setCategory } from "@/app/features/categorySlice";

const Sidebar = () => {
	const { open, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const { token, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const [triggerGetMe, { isLoading, isError, error }] = useLazyGetMeQuery();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		let isMounted = true; // Flag to prevent state updates on unmounted component

		const checkAuth = async () => {
			// If we already have a token and user in store
			if (token && user) {
				if (isMounted) {
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
						setIsAdmin(res.role?.name === "Admin");
					}
				} catch (error) {
					console.error("Auth check failed:", error);
					cookieService.remove("ma7al_jwt");
					dispatch(clearSession());
					if (isMounted) {
						setIsAdmin(false);
					}
				}
			} else if (isMounted) {
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

	if (isCheckingAuth || isLoading) {
		return (
			<VStack
				position='absolute'
				zIndex={1000}
				top={0}
				left={0}
				right={0}
				bottom={0}
				bg='gray.600'
				colorPalette='teal'
				gap={4}
				align='center'
				justify='center'
				height='100vh'
				w={"100vw"}>
				<Spinner color='teal.600' size='xl' />
				<Text color='teal.600'>Checking authentication...</Text>
			</VStack>
		);
	}
	if (isError) {
		throw error;
	}
	if (user && isAdmin) {
		return (
			<Box minH='100vh' bg={colorMode === "light" ? "gray.100" : "gray.900"}>
				<SidebarContent
					onClose={() => onClose}
					display={{ base: "none", md: "block" }}
				/>
				<Drawer.Root open={open} size='full'>
					<DrawerContent>
						<SidebarContent onClose={onClose} />
					</DrawerContent>
				</Drawer.Root>
				<MobileNav user={user} onOpen={onOpen} />
				<Box ml={{ base: 0, md: 60 }} p='4'></Box>
			</Box>
		);
	}
};

export default Sidebar;
