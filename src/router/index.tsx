import ErrorHandler from "@/components/error/ErrorHandler";
import HomePage from "@/pages";
import AboutPage from "@/pages/About";
import AdminDashboardPage from "@/pages/AdminDashboard";
import RootAdminLayout from "@/pages/AdminLayout";
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
			<Route path='/' element={<RootLayout />} errorElement={<ErrorHandler />}>
				<Route index element={<HomePage />} />
				<Route path='about' element={<AboutPage />} />
				<Route path='profile' element={<ProfilePage />} />
				<Route path='cart' element={<CartPage />} />
				<Route path='logout' element={<LogoutPage />} />
				<Route path='login' element={<LoginPage />} />
				<Route path='signup' element={<SignupPage />} />
				<Route path='products/:id' element={<ProductPage />} />
			</Route>
			<Route path='/admin' element={<RootAdminLayout />}>
				<Route path='dashboard' element={<AdminDashboardPage />} />
			</Route>
			<Route path='*' element={<PageNotFound />} />
		</>,
	),
);

export default router;
