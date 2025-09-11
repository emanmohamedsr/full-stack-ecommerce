import { Dialog, Portal } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface Iprops {
	children?: ReactNode;
	open: boolean;
	title: string;
	description?: string;
	danger?: boolean;
}

const CustomeDialog = ({
	children,
	open,
	title,
	description,
	danger,
}: Iprops) => {
	return (
		<Dialog.Root
			role={danger ? "alertdialog" : "dialog"}
			placement='top'
			lazyMount
			open={open}>
			<Portal>
				<Dialog.Backdrop backdropFilter='blur(6px)' bg='blackAlpha.400' />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header spaceY={2} display='flex' flexDirection='column'>
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
