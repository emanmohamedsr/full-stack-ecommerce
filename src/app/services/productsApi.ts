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
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }: { id: string }) => ({
								type: "Products" as const,
								id,
							})),
							{ type: "Products", id: "LIST" },
					  ]
					: [{ type: "Products", id: "LIST" }],
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
			providesTags: (result) =>
				result
					? [
							...result.data.map(({ id }: { id: number }) => ({
								type: "Products" as const,
								id,
							})),
							{ type: "Products", id: "LIST" },
					  ]
					: [{ type: "Products", id: "LIST" }],
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
			invalidatesTags: [{ type: "Products", id: "LIST" }],
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
			invalidatesTags: [{ type: "Products", id: "LIST" }],
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
			invalidatesTags: [{ type: "Products", id: "LIST" }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetCategoryProductsQuery,
	useGetOneProductQuery,
	usePostProductMutation,
	usePutProductMutation,
	useDeleteProductMutation,
} = productsApi;
