import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const RootAdminLayout = () => {
	return (
		<div>
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default RootAdminLayout;
