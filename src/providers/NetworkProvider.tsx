import { setOffline, setOnline } from "@/app/features/networkSlice";
import { toaster } from "@/config/toaster";
import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";

interface Iprops {
	children: ReactNode;
}

const NetworkProvider = ({ children }: Iprops) => {
	const dispatch = useDispatch();
	dispatch(navigator.onLine ? setOnline() : setOffline());
	const id = "network-toaster-error";
	useEffect(() => {
		const handleOnline = () => {
			dispatch(setOnline());
			toaster.update(id, {
				title: "Connected",
				description: "You are back online.",
				type: "success",
				duration: 3000,
			});
		};
		const handleOffline = () => {
			dispatch(setOffline());
			if (toaster.isVisible(id)) return;
			toaster.loading({
				id,
				title: "Connecting...",
				description: "You are currently offline.",
				type: "error",
			});
		};
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, [dispatch]);
	return children;
};

export default NetworkProvider;
