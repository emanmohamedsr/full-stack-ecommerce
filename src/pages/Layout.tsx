import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div>
			Root Layout
			<Outlet />
		</div>
	);
};

export default RootLayout;
