import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "@/services/Cookie";
export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: `products?populate=thumbnail&populate=category`,
				// params: {
				// 	populate: "thumbnail, category",
				// },
			}),
		}),
		getOneProduct: builder.query({
			query: (id) => ({
				url: `products/${id}?populate=thumbnail&populate=category`,
				// params: {
				// 	populate: "thumbnail, category",
				// },
			}),
			transformResponse: (response) => response.data,
		}),
		postProduct: builder.mutation({
			query: (product) => ({
				url: `products`,
				method: `POST`,
				body: product,
				headers: {
					Authorization: `Bearer ${CookiesService.get("ma7al_jwt")}`,
				},
			}),
			transformErrorResponse: (response) => {
				if (response.status === 401) {
					CookiesService.remove("ma7al_jwt");
				}
				return response;
			},
		}),
		putProduct: builder.mutation({
			query: (product) => {
				const requestData = {
					data: {
						title: product.title,
						description: product.description,
						price: product.price,
						stock: product.stock,
					},
				};
				return {
					url: `products/${product.documentId}`,
					method: `PUT`,
					body: requestData,
					headers: {
						Authorization: `Bearer ${CookiesService.get("ma7al_jwt")}`,
					},
				};
			},
			transformErrorResponse: (response) => {
				if (response.status === 401) {
					CookiesService.remove("ma7al_jwt");
				}
				return response;
			},
		}),
	}),
});

export const {
	useGetProductsQuery,
	useLazyGetProductsQuery,
	useGetOneProductQuery,
	usePostProductMutation,
	usePutProductMutation,
} = productsApi;
