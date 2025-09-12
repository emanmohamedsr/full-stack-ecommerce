import RouterAuth from "@/components/auth/RouterAuth";
import ErrorHandler from "@/components/error/ErrorHandler";
import HomePage from "@/pages";
import AboutPage from "@/pages/About";
import AdminDashboardPage from "@/pages/AdminDashboard";
import RootAdminLayout from "@/pages/AdminLayout";
import GoogleCallback from "@/pages/auth/GoogleCallback";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import ConfirmEmailPage from "@/pages/ConfirmEmail";
import ForgetPasswordPage from "@/pages/ForgetPassword";
import RootLayout from "@/pages/Layout";
import LoginPage from "@/pages/Login";
import LogoutPage from "@/pages/Logout";
import PageNotFound from "@/pages/PageNotFound";
import ProductPage from "@/pages/Product";
import ProfilePage from "@/pages/Profile";
import ResetPasswordPage from "@/pages/ResetPassword";
import SignupPage from "@/pages/Signup";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' errorElement={<ErrorHandler />}>
				<Route element={<RootLayout />}>
					<Route index element={<HomePage />} />
					<Route path='about' element={<AboutPage />} />
					<Route path='cart' element={<CartPage />} />
					<Route path='products/:id' element={<ProductPage />} />
					<Route path='auth/google/callback' element={<GoogleCallback />} />
					<Route path='reset-password/:code' element={<ResetPasswordPage />} />
					<Route
						path='confirm-email/:confirmationCode'
						element={<ConfirmEmailPage />}
					/>
					<Route path='forget-password' element={<ForgetPasswordPage />} />

					<Route
						path='login'
						element={
							<RouterAuth shouldHaveToken={false} redirectPath='/'>
								<LoginPage />
							</RouterAuth>
						}
					/>
					<Route
						path='signup'
						element={
							<RouterAuth shouldHaveToken={false} redirectPath='/'>
								<SignupPage />
							</RouterAuth>
						}
					/>
					<Route
						path='logout'
						element={
							<RouterAuth shouldHaveToken={true} redirectPath='/login'>
								<LogoutPage />
							</RouterAuth>
						}
					/>
					<Route
						path='profile'
						element={
							<RouterAuth shouldHaveToken={true} redirectPath='/login'>
								<ProfilePage />
							</RouterAuth>
						}
					/>
					<Route
						path='checkout'
						element={
							<RouterAuth shouldHaveToken={true} redirectPath='/login'>
								<CheckoutPage />
							</RouterAuth>
						}
					/>
					<Route path='*' element={<PageNotFound />} />
				</Route>

				<Route path='admin' element={<RootAdminLayout />}>
					<Route
						path='dashboard'
						element={
							<RouterAuth shouldHaveToken={true} redirectPath='/login'>
								<AdminDashboardPage />
							</RouterAuth>
						}
					/>
					<Route path='*' element={<PageNotFound />} />
				</Route>
			</Route>
			<Route path='*' element={<PageNotFound />} />
		</>,
	),
);

export default router;
