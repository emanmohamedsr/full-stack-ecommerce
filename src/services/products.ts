import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => `products?populate=thumbnail&populate=categories`,
		}),
	}),
});

export const { useGetProductsQuery } = productsApi;
