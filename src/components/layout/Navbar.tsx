"use client";

import {
	Box,
	Center,
	Flex,
	HStack,
	IconButton,
	Image,
	Link as ChakraLink,
	Portal,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { useColorMode } from "@/hooks/useColorMode";
import { Menu } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { TbLogout2 } from "react-icons/tb";
import Logo0 from "@/assets/logo.svg";
import Logo1 from "@/assets/logo1.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}

const MyChakraNavLink = (props: Props) => {
	const { colorMode } = useColorMode();
	const { children } = props;
	return (
		<ChakraLink
			as='a'
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: colorMode === "light" ? "gray.100" : "gray.900",
			}}
			href={children === "Dashboard" ? "/" : `/${children}`}>
			{children}
		</ChakraLink>
	);
};

const Navbar = () => {
	const Links = ["Link0", "Link1", "Link2"];
	const { colorMode } = useColorMode();
	const { open, onOpen, onClose } = useDisclosure();
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
								{Links.map((link) => (
									<MyChakraNavLink key={link}>{link}</MyChakraNavLink>
								))}
							</HStack>
						</HStack>
					</HStack>

					<Flex alignItems={"center"}>
						<Stack direction={"row"} gap={7}>
							<ColorModeButton />

							<Menu.Root positioning={{ placement: "bottom-end", gutter: 6 }}>
								<Menu.Trigger
									rounded='full'
									focusRing='outside'
									cursor={"pointer"}>
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
												<p>Eman Soliman</p>
											</Center>
											<Menu.Separator />
											<Menu.Item value='settings'>Account Settings</Menu.Item>
											<Menu.Item value='logout' color={"red.600"}>
												<TbLogout2 />
												Logout
											</Menu.Item>
										</Menu.Content>
									</Menu.Positioner>
								</Portal>
							</Menu.Root>
						</Stack>
					</Flex>
				</Flex>
				{open ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} gap={4}>
							{Links.map((link) => (
								<MyChakraNavLink key={link}>{link}</MyChakraNavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};
export default Navbar;
