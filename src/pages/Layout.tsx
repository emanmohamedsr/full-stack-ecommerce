import Navbar from "@/components/layout/Navbar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<Box>
			<Navbar />
			<Outlet />
		</Box>
	);
};

export default RootLayout;
