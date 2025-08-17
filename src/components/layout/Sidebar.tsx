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
} from "@chakra-ui/react";
import { FiHome, FiMenu } from "react-icons/fi";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { useColorMode } from "@/hooks/useColorMode";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Logo0 from "@/assets/logo.svg";
import Logo1 from "@/assets/logo1.svg";
import { ColorModeButton } from "../ui/color-mode";

interface LinkItemProps {
	name: string;
	icon: IconType;
	path: string;
}

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: React.ReactNode;
	path: string;
}

interface MobileProps extends FlexProps {
	onOpen: () => void;
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
	{ name: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const { colorMode } = useColorMode();
	return (
		<Box
			transition='3s ease'
			bg={colorMode === "light" ? "white" : "gray.900"}
			borderRight='1px'
			borderRightColor={colorMode === "light" ? "gray.200" : "gray.700"}
			w={{ base: "full", md: 60 }}
			pos='fixed'
			h='full'
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
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} path={link.path}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
	return (
		<Link to={path}>
			<Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
				<Flex
					align='center'
					p='4'
					mx='4'
					borderRadius='lg'
					role='group'
					cursor='pointer'
					_hover={{
						bg: "teal.700",
						color: "white",
					}}
					{...rest}>
					{icon && (
						<Icon
							mr='4'
							fontSize='16'
							_groupHover={{
								color: "white",
							}}
							as={icon}
						/>
					)}
					{children}
				</Flex>
			</Box>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	const { colorMode } = useColorMode();
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
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
							<Avatar.Fallback name='Eman Soliman' />
							<Avatar.Image src='https://api.dicebear.com/7.x/adventurer/svg?seed=Emoo' />
						</Avatar.Root>
					</Menu.Trigger>
					<Portal>
						<Menu.Positioner>
							<Menu.Content>
								<Center py={2}>
									<Avatar.Root>
										<Avatar.Fallback name='Eman Soliman' />
										<Avatar.Image src='https://api.dicebear.com/7.x/adventurer/svg?seed=Emoo' />
									</Avatar.Root>
								</Center>
								<Center mb={2}>
									<Text>Eman Soliman</Text>
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

const Sidebar = () => {
	const { open, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
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
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'></Box>
		</Box>
	);
};

export default Sidebar;
