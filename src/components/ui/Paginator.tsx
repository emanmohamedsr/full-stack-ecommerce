import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Iprops {
	currentPage: number;
	total: number;
	pageSize: number;
	pageCount: number;
	onPageChange: Dispatch<SetStateAction<number>>;
}

const Paginator = ({
	currentPage,
	total,
	pageSize,
	pageCount,
	onPageChange,
}: Iprops) => {
	return (
		<Pagination.Root
			count={total}
			pageSize={pageSize}
			defaultPage={currentPage}>
			<ButtonGroup variant='ghost' size='sm'>
				<Pagination.PrevTrigger asChild>
					<IconButton
						onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}>
						<LuChevronLeft />
					</IconButton>
				</Pagination.PrevTrigger>

				<Pagination.Items
					render={(page) => (
						<IconButton
							onClick={() => onPageChange(page.value)}
							variant={{ base: "ghost", _selected: "outline" }}>
							{page.value}
						</IconButton>
					)}
				/>

				<Pagination.NextTrigger asChild>
					<IconButton
						onClick={() =>
							onPageChange((prev) => Math.min(prev + 1, pageCount))
						}>
						<LuChevronRight />
					</IconButton>
				</Pagination.NextTrigger>
			</ButtonGroup>
		</Pagination.Root>
	);
};

export default Paginator;
