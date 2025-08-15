import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default RootLayout;
