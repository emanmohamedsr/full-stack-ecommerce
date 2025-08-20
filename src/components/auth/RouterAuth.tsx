import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import CookiesService from "@/services/Cookie";
import { useEffect, useState } from "react";
import { setUserSession, clearSession } from "@/app/features/authSlice";
import type { IResponse } from "@/interfaces/User";
import { useLazyGetMeQuery } from "@/services/UserApi";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { toaster } from "@/config/toaster";

interface IProps {
	shouldHaveToken: boolean;
	redirectPath: string;
	children: React.ReactNode;
}

const RouterAuth = ({ shouldHaveToken, redirectPath, children }: IProps) => {
	const token = useSelector((state: RootState) => state.auth.token);
	const dispatch = useDispatch();
	const [triggerGetMe] = useLazyGetMeQuery();
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		let isMounted = true; // Flag to prevent state updates on unmounted component

		const checkAuth = async () => {
			// If we already have a token in store, no need to check
			if (token) {
				if (isMounted) setIsCheckingAuth(false);
				return;
			}

			// Check if we have a token in cookies
			const cookieToken = CookiesService.get("ma7al_jwt");

			if (cookieToken) {
				try {
					const res: IResponse = await triggerGetMe(cookieToken).unwrap();

					// Update store with the token and user data
					dispatch(
						setUserSession({
							token: res.jwt || cookieToken,
							user: res.user,
						}),
					);
				} catch (error) {
					console.error("Token validation failed:", error);

					// Remove invalid token from cookies and clear session
					CookiesService.remove("ma7al_jwt");
					dispatch(clearSession());

					// Show error toast only for protected routes
					if (shouldHaveToken && isMounted) {
						toaster.error({
							title: "Session expired",
							description: "Please log in again",
						});
					}
				}
			}

			if (isMounted) setIsCheckingAuth(false);
		};

		checkAuth();

		return () => {
			isMounted = false;
		};
	}, [token, dispatch, triggerGetMe, shouldHaveToken]);

	if (isCheckingAuth) {
		return (
			<VStack
				position='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				bg='gray.600'
				colorPalette='teal'
				gap={4}
				align='center'
				justify='center'
				height='100vh'
				w={"100vw"}>
				<Spinner color='teal.600' size='xl' />
				<Text color='teal.600'>Checking authentication...</Text>
			</VStack>
		);
	}

	const hasToken = !!token || !!CookiesService.get("ma7al_jwt");

	if (shouldHaveToken && !hasToken) {
		return <Navigate to={redirectPath} replace />;
	}

	if (!shouldHaveToken && hasToken) {
		return <Navigate to={redirectPath} replace />;
	}

	return <>{children}</>;
};

export default RouterAuth;
