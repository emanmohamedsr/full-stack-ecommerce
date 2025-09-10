import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesService from "@/services/Cookie";

export const UserApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/api`,
		prepareHeaders: (headers) => {
			const token = CookiesService.get("ma7al_jwt");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (userData) => ({
				url: `auth/local`,
				method: "POST",
				body: userData,
			}),
			invalidatesTags: ["User"],
		}),
		signupUser: builder.mutation({
			query: (userData) => ({
				url: `auth/local/register`,
				method: "POST",
				body: userData,
			}),
			invalidatesTags: ["User"],
		}),
		getMe: builder.query({
			query: () => ({
				url: `users/me`,
				params: {
					populate: "role",
				},
			}),
			providesTags: ["User"],
			transformErrorResponse: (response) => {
				if (response.status === 401) {
					CookiesService.remove("ma7al_jwt");
				}
				return response;
			},
		}),
		googleLogin: builder.query({
			query: ({ access_token }) => ({
				url: `auth/google/callback`,
				method: "GET",
				params: {
					access_token,
				},
			}),
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body: email,
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ code, password, passwordConfirmation }) => ({
				url: "/auth/reset-password",
				method: "POST",
				body: { code, password, passwordConfirmation },
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useSignupUserMutation,
	useGetMeQuery,
	useLazyGetMeQuery,
	useGoogleLoginQuery,
	useLazyGoogleLoginQuery,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = UserApi;
