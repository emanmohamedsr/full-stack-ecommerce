import { useColorMode } from "@/hooks/useColorMode";
import { Image, Stack, DataList, Button, Box } from "@chakra-ui/react";

const stats = [
	{
		label: "Username",
		value: "Eman Soliman",
		diff: -12,
		helpText: "Till date",
	},
	{
		label: "Email",
		value: "emoo@example.com",
		diff: 12,
		helpText: "Last 30 days",
	},
];

const ProfilePage = () => {
	const { colorMode } = useColorMode();
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
						src='https://api.dicebear.com/7.x/adventurer/svg?seed=Emoo'
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
					<Button w={"100%"} bg={"teal.700"} color={"white"}>
						Generate New Avatar
					</Button>
					<Button w={"100%"}>Reset Password</Button>
					<Button w={"100%"} variant={"solid"} bg={"red.700"} color={"white"}>
						Delete Account
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ProfilePage;
