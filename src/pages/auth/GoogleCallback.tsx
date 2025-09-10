// src/pages/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate, type CookieOptions } from "react-router-dom";
import cookieService from "@/services/Cookie";
import {
	useLazyGetMeQuery,
	useLazyGoogleLoginQuery,
} from "@/app/services/UserApi";
import type { IError } from "@/interfaces/Error";
import { toaster } from "@/config/toaster";
import { useDispatch } from "react-redux";
import { setUserSession } from "@/app/features/authSlice";
import type { IUser } from "@/interfaces/User";
import LoadingOverlay from "@/components/loading";

const GoogleCallback = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [
		triggerGoogleLogin,
		{ isLoading: isLoggingIn, isError: isLoginError },
	] = useLazyGoogleLoginQuery();
	const [triggerGetMe, { isLoading: isGettingMe, isError: isGetMeError }] =
		useLazyGetMeQuery();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const access_token =
			params.get("access_token") ?? params.get("id_token") ?? "";
		if (!access_token) {
			toaster.error({
				title: "Google Login Failed",
				description: "No access token found in the URL.",
			});
			navigate("/login");
			return;
		}
		const fetchData = async () => {
			try {
				const data = await triggerGoogleLogin({
					access_token,
				}).unwrap();

				const options: CookieOptions = {
					path: "/",
				};
				const date = new Date();
				const IN_DAYS = 3;
				const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
				date.setTime(date.getTime() + EXPIRES_IN_DAYS);
				options.expires = date;
				cookieService.set("ma7al_jwt", data?.jwt, options);

				const cookieToken = cookieService.get("ma7al_jwt");
				const user: IUser = await triggerGetMe(cookieToken).unwrap();

				dispatch(setUserSession({ token: cookieToken!, user }));
				navigate("/");
			} catch (error) {
				const err = error as IError;
				toaster.error({
					title: "Google Login Failed",
					description:
						err?.data?.error?.message ||
						"An error occurred during Google login.",
				});
				navigate("/login");
			}
		};
		fetchData();
	}, [navigate, triggerGoogleLogin, triggerGetMe, dispatch]);

	if (isLoginError) throw new Error("Failed to login with Google.");
	if (isGetMeError) throw new Error("Failed to fetch user data.");
	if (isLoggingIn || isGettingMe) {
		return (
			<LoadingOverlay
				isOpen={isLoggingIn || isGettingMe}
				description='Logging you in with Google...'
			/>
		);
	}
	return null;
};

export default GoogleCallback;
