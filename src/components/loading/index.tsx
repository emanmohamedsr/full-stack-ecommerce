"use client";

import { Drawer, Portal, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
	description: string;
	isOpen?: boolean;
}

const LoadingOverlay = ({ description, isOpen }: IProps) => {
	const [open] = useState(isOpen || false);

	return (
		<Drawer.Root
			placement='top'
			size={"full"}
			open={open}
			// onOpenChange={(e) => setOpen(e.open)}
		>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content bg={"teal.700"} color={"white"}>
						<Drawer.Header>
							<Drawer.Title>LOADING</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>
							<VStack
								fontSize={"xl"}
								spaceY={4}
								justifyContent='center'
								align='center'
								h='100%'>
								<Spinner size='xl' mr={4} borderWidth='4px' />
								<Text>{description}</Text>
							</VStack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};
export default LoadingOverlay;
