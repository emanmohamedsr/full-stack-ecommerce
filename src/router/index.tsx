import RouterAuth from "@/components/auth/RouterAuth";
import ErrorHandler from "@/components/error/ErrorHandler";
import HomePage from "@/pages";
import AboutPage from "@/pages/About";
import AdminDashboardPage from "@/pages/AdminDashboard";
import RootAdminLayout from "@/pages/AdminLayout";
import AdminLoginPage from "@/pages/AdminLogin";
import CartPage from "@/pages/Cart";
import RootLayout from "@/pages/Layout";
import LoginPage from "@/pages/Login";
import LogoutPage from "@/pages/Logout";
import PageNotFound from "@/pages/PageNotFound";
import ProductPage from "@/pages/Product";
import ProfilePage from "@/pages/Profile";
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
						path='admin-login'
						element={
							<RouterAuth
								shouldHaveToken={false}
								redirectPath='/admin-dashboard'>
								<AdminLoginPage />
							</RouterAuth>
						}
					/>
					<Route path='*' element={<PageNotFound />} />
				</Route>

				<Route path='admin' element={<RootAdminLayout />}>
					<Route path='dashboard' element={<AdminDashboardPage />} />
					<Route path='*' element={<PageNotFound />} />
				</Route>
			</Route>
			<Route path='*' element={<PageNotFound />} />
		</>,
	),
);

export default router;
