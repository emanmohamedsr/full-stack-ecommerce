import { EmptyState, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { LuShoppingCart } from "react-icons/lu";

interface IProps {
	title: string;
	description: string;
	children?: ReactNode;
}

const EmptyProductsState = ({ title, description, children }: IProps) => {
	return (
		<EmptyState.Root>
			<EmptyState.Content>
				<EmptyState.Indicator>{children}</EmptyState.Indicator>
				<VStack textAlign='center'>
					<EmptyState.Title>{title}</EmptyState.Title>
					<EmptyState.Description>{description}</EmptyState.Description>
				</VStack>
			</EmptyState.Content>
		</EmptyState.Root>
	);
};
export default EmptyProductsState;
