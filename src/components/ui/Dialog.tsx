"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

type jsonVal =
	| string
	| number
	| boolean
	| null
	| { [key: string]: jsonVal }
	| jsonVal[];

interface IProps {
	children: ReactNode;
	title: string;
	description: string;
	deleteTheme?: boolean;
	onSubmit: (value?: jsonVal) => void;
}

const DialogComponent = ({
	children,
	title,
	description,
	deleteTheme = false,
	onSubmit,
}: IProps) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop backdropFilter='blur(6px)' bg='blackAlpha.400' />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{title}</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<p>{description}</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant='outline'>Cancel</Button>
							</Dialog.ActionTrigger>
							<Button
								bg={deleteTheme ? "red.600" : "teal.600"}
								color={"white"}
								onClick={() => {
									setOpen(false);
									onSubmit();
								}}>
								{deleteTheme ? "Delete" : "Yes"}
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size='sm' />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
export default DialogComponent;
