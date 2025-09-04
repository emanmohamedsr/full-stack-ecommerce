import { productsApi } from "@/app/services/productsApi";
import { UserApi } from "@/app/services/UserApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "@/app/features/authSlice";
import cartReducer from "@/app/features/cartSlice";
import { categoriesApi } from "@/app/services/categoriesApi";
import categryReducer from "@/app/features/categorySlice";
import networkReducer from "@/app/features/networkSlice";

export const store = configureStore({
	reducer: {
		network: networkReducer,
		cart: cartReducer,
		auth: authReducer,
		category: categryReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[UserApi.reducerPath]: UserApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			productsApi.middleware,
			categoriesApi.middleware,
			UserApi.middleware,
		),
});

store.subscribe(() => {
	const cartState = store.getState().cart.products;
	localStorage.setItem("cart", JSON.stringify(cartState));
	const selectedCategory = store.getState().category.category;
	localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
