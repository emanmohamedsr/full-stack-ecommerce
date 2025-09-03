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
			query: (productData) => {
				return {
					url: `products`,
					method: `POST`,
					body: productData,
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
			async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					productsApi.util.updateQueryData("getProducts", "LIST", (draft) => {
						Object.assign(draft, patch);
					}),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: [{ type: "Products", id: "LIST" }],
		}),

		putProduct: builder.mutation({
			query: ({ productDocumentId, productData }) => {
				return {
					url: `products/${productDocumentId}`,
					method: `PUT`,
					body: productData,
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
			async onQueryStarted(
				{ productDocumentId, ...patch },
				{ dispatch, queryFulfilled },
			) {
				const patchResult = dispatch(
					productsApi.util.updateQueryData(
						"getProducts",
						productDocumentId,
						(draft) => {
							Object.assign(draft, patch);
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: [{ type: "Products", id: "LIST" }],
		}),

		uploadProductThumbnailFile: builder.mutation({
			query: (formData) => {
				return {
					url: `upload`,
					method: `POST`,
					body: formData,
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
			invalidatesTags: [{ type: "Products", id: "LIST" }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useUploadProductThumbnailFileMutation,
	useGetCategoryProductsQuery,
	useGetOneProductQuery,
	usePostProductMutation,
	usePutProductMutation,
	useDeleteProductMutation,
} = productsApi;
