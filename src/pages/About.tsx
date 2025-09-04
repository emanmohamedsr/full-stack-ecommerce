"use client";

import {
	Card,
	Container,
	Flex,
	Heading,
	Text,
	Stack,
	Icon,
} from "@chakra-ui/react";
import {
	IoAnalyticsSharp,
	IoLogoBitcoin,
	IoSearchSharp,
} from "react-icons/io5";
import {
	FcAbout,
	FcAssistant,
	FcCollaboration,
	FcDonate,
	FcManager,
} from "react-icons/fc";
import type { ReactElement } from "react";
import type { IconType } from "react-icons";
import { useColorMode } from "@/hooks/useColorMode";
import { MdOutlineSignalWifiConnectedNoInternet4 } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectNetworkStatus } from "@/app/features/networkSlice";
import EmptyProductsState from "@/components/EmptyProductsState";
interface FeatureProps {
	text: string;
	iconBg: string;
	icon?: ReactElement;
}
const Feature = ({ text, icon, iconBg }: FeatureProps) => {
	return (
		<Stack direction={"row"} align={"center"}>
			<Flex
				w={8}
				h={8}
				align={"center"}
				justify={"center"}
				rounded={"full"}
				bg={iconBg}>
				{icon}
			</Flex>
			<Text fontWeight={600}>{text}</Text>
		</Stack>
	);
};

interface CardFeatureProps {
	icon: IconType;
	title: string;
	description: string;
}
const CardFeature = ({ icon, title, description }: CardFeatureProps) => {
	return (
		<Card.Root shadow='md' w={{ base: "100%", sm: "45%", md: "30%" }}>
			<Card.Header>
				<Icon as={icon} w={10} h={10} />
				<Card.Title>{title}</Card.Title>
			</Card.Header>
			<Card.Body>
				<Card.Description>{description}</Card.Description>
			</Card.Body>
		</Card.Root>
	);
};

const AboutPage = () => {
	const isOnline = useSelector(selectNetworkStatus);
	const { colorMode } = useColorMode();
	if (!isOnline) {
		return (
			<EmptyProductsState
				title='No Internet Connection'
				description='Please check your internet connection and try again.'>
				<MdOutlineSignalWifiConnectedNoInternet4 />
			</EmptyProductsState>
		);
	}
	return (
		<Container maxW={"7xl"} py={12} px={{ base: 4, sm: 6, md: 8 }} spaceY={10}>
			<Stack gap={4} align='center' textAlign='center'>
				<Text
					textTransform={"uppercase"}
					color={"teal.400"}
					fontWeight={600}
					fontSize={"sm"}
					bg={colorMode === "light" ? "teal.50" : "teal.900"}
					p={2}
					alignSelf={"flex-start"}
					rounded={"md"}>
					ABOUT MA7AL
				</Text>
				<Heading>Your Trusted Ecommerce Marketplace</Heading>
				<Text color={"gray.500"} fontSize={"lg"}>
					Ma7al is your one-stop shop for fashion, electronics, home essentials,
					and more. We connect local businesses and customers with a seamless
					shopping experience, secure payments, and fast delivery.
				</Text>
				<Stack gap={4} direction={{ base: "column", md: "row" }} align='center'>
					<Feature
						icon={
							<Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
						}
						iconBg={colorMode === "light" ? "yellow.100" : "yellow.900"}
						text={"Smart Shopping Insights"}
					/>
					<Feature
						icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
						iconBg={colorMode === "light" ? "green.100" : "green.900"}
						text={"Secure Payments"}
					/>
					<Feature
						icon={<Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />}
						iconBg={colorMode === "light" ? "purple.100" : "purple.900"}
						text={"Easy Product Discovery"}
					/>
				</Stack>
			</Stack>
			<Flex flexWrap='wrap' gridGap={6} justify='center'>
				<CardFeature
					icon={FcAssistant}
					title={"Customer Support"}
					description={
						"Our team is here 24/7 to answer your questions and assist with orders."
					}
				/>
				<CardFeature
					icon={FcDonate}
					title={"Exclusive Deals"}
					description={
						"Get the best discounts and offers tailored to your needs."
					}
				/>
				<CardFeature
					icon={FcManager}
					title={"Account Management"}
					description={
						"Easily track your orders, wishlist, and payment history."
					}
				/>
				<CardFeature
					icon={FcAbout}
					title={"Trusted Platform"}
					description={
						"Thousands of happy customers shop with confidence every day."
					}
				/>
				<CardFeature
					icon={FcCollaboration}
					title={"Seamless Shopping"}
					description={
						"Browse, compare, and purchase products with just a few clicks."
					}
				/>
			</Flex>
		</Container>
	);
};

export default AboutPage;
