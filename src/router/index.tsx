import ErrorHandler from "@/components/error/ErrorHandler";
import HomePage from "@/pages";
import AboutPage from "@/pages/About";
import RootLayout from "@/pages/Layout";
import PageNotFound from "@/pages/PageNotFound";
import ProductPage from "@/pages/ProductPage";
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
				<Route path='products/:id' element={<ProductPage />} />
			</Route>
			<Route path='*' element={<PageNotFound />} />
		</>,
	),
);

export default router;
