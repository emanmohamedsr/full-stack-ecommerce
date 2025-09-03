import { Box, Dialog, Portal } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface Iprops {
	children?: ReactNode;
	open: boolean;
	title: string;
	description?: string;
}

const CustomeDialog = ({ children, open, title, description }: Iprops) => {
	if (!open) return null;
	return (
		<Dialog.Root placement={"top"} lazyMount open={open}>
			<Dialog.Trigger asChild>
				<Box display='none' />
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop backdropFilter='blur(6px)' bg='blackAlpha.400' />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header spaceY={2} display={"flex"} flexDirection={"column"}>
							<Dialog.Title>{title}</Dialog.Title>
							{description && (
								<Dialog.Description>{description}</Dialog.Description>
							)}
						</Dialog.Header>
						<Dialog.Body pb='4'>{children}</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default CustomeDialog;
