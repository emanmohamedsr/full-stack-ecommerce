import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
	reducerPath: "categoriesApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => `categories`,
		}),
		getOneCategory: builder.query({
			query: (id) => `categories/${id}?populate[products][populate]=thumbnail`,
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGetOneCategoryQuery,
	useLazyGetOneCategoryQuery,
} = categoriesApi;
