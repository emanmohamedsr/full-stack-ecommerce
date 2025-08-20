import { productsApi } from "@/services/productsApi";
import { UserApi } from "@/services/UserApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "@/app/features/authSlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[UserApi.reducerPath]: UserApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware, UserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
