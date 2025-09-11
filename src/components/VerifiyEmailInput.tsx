"use client";

import { useColorMode } from "@/hooks/useColorMode";
import { Center, Fieldset, Heading } from "@chakra-ui/react";
import { Button, Stack, HStack } from "@chakra-ui/react";
import { PinInput } from "@chakra-ui/react";
import CustomeDialog from "./CustomeDialog";

interface IProps {
	open: boolean;
	setOpen: (val: boolean) => void;
	email: string;
}

export default function VerifyEmailForm({ email, open, setOpen }: IProps) {
	const { colorMode } = useColorMode();
	return (
		<CustomeDialog open={open} title='Verify your Email'>
			<Stack
				gap={4}
				w={"full"}
				maxW={"sm"}
				bg={colorMode === "light" ? "white" : "gray.700"}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={10}>
				<Center>
					<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
						Verify your Email
					</Heading>
				</Center>
				<Center
					fontSize={{ base: "sm", sm: "md" }}
					color={colorMode === "light" ? "gray.800" : "gray.400"}>
					We have sent code to your email
				</Center>
				<Center
					fontSize={{ base: "sm", sm: "md" }}
					fontWeight='bold'
					color={colorMode === "light" ? "gray.800" : "gray.400"}>
					{email}
				</Center>
				<Fieldset.Root>
					<Center>
						<HStack>
							<PinInput.Root>
								<PinInput.HiddenInput />
								<PinInput.Control>
									<PinInput.Input index={0} />
									<PinInput.Input index={1} />
									<PinInput.Input index={2} />
									<PinInput.Input index={3} />
								</PinInput.Control>
							</PinInput.Root>
						</HStack>
					</Center>
				</Fieldset.Root>
				<Stack gap={6}>
					<Button
						onClick={() => setOpen(false)}
						bg={"teal.700"}
						color={"white"}
						_hover={{
							bg: "teal.600",
						}}>
						Verify
					</Button>
				</Stack>
			</Stack>
		</CustomeDialog>
	);
}
