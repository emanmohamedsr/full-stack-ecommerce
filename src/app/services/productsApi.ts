import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "@/services/Cookie";

export const productsApi = createApi({
	reducerPath: "productsApi",
	tagTypes: ["Products"],
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),

	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (arg) => {
				const { page } = arg;
				return {
					url: `products?populate=thumbnail&populate=category`,
					params: {
						"pagination[page]": page,
						"pagination[pageSize]": 4,
					},
				};
			},
		}),

		getCategoryProducts: builder.query({
			query: (arg) => {
				const { categoryId, page } = arg;
				return {
					url: `products?populate=thumbnail&populate=category`,
					params: {
						"filters[category][documentId]": categoryId,
						"pagination[page]": page,
						"pagination[pageSize]": 4,
					},
				};
			},
		}),

		getOneProduct: builder.query({
			query: (id) => ({
				url: `products/${id}?populate=thumbnail&populate=category`,
			}),
			transformResponse: (response) => response.data,
		}),

		postProduct: builder.mutation({
			query: (product) => {
				const requestData = {
					data: {
						title: product.title,
						description: product.description,
						price: product.price,
						stock: product.stock,
						thumbnail: product.thumbnail,
						category: product.category,
					},
				};
				return {
					url: `products`,
					method: `POST`,
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

		putProduct: builder.mutation({
			query: (product) => {
				const requestData = {
					data: {
						title: product.title,
						description: product.description,
						price: product.price,
						stock: product.stock,
						// thumbnail: product.thumbnail,
						// category: product.category,
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

		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `products/${id}`,
				method: `DELETE`,
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
	}),
});

export const {
	useGetProductsQuery,
	useLazyGetProductsQuery,
	useGetCategoryProductsQuery,
	useLazyGetCategoryProductsQuery,
	useGetOneProductQuery,
	usePostProductMutation,
	usePutProductMutation,
	useDeleteProductMutation,
} = productsApi;
