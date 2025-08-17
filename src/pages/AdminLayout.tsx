import Sidebar from "@/components/layout/Sidebar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootAdminLayout = () => {
	return (
		<Box pos={"relative"}>
			<Sidebar />
			<Box
				pos={"absolute"}
				top={"64px"}
				left={{ base: 0, md: 60 }}
				w={{ base: "full", md: "calc(100% - 240px)" }}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default RootAdminLayout;
