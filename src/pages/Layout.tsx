import { ColorModeButton } from "@/components/ui/color-mode";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div>
			<ColorModeButton />
			<Outlet />
		</div>
	);
};

export default RootLayout;
