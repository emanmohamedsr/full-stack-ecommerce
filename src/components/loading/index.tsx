"use client";

import { Box, Drawer, Portal, Spinner, Text, VStack } from "@chakra-ui/react";

interface IProps {
	description: string;
	isOpen?: boolean;
}

const LoadingOverlay = ({ description, isOpen }: IProps) => {
	if (!isOpen) return null;

	return (
		<Drawer.Root placement='top' size='full' open={true}>
			<Drawer.Trigger asChild>
				<Box display='none' />
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content bg='teal.700' color='white'>
						<Drawer.Header>
							<Drawer.Title>LOADING</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>
							<VStack
								fontSize='xl'
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
