import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => `products?populate=thumbnail&populate=categories`,
		}),
		getOneProduct: builder.query({
			query: (id) => `products/${id}?populate=thumbnail&populate=categories`,
			transformResponse: (response) => response.data,
		}),
	}),
});

export const { useGetProductsQuery, useGetOneProductQuery } = productsApi;
