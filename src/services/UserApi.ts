import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (userData) => ({
				url: `auth/local`,
				method: "POST",
				body: userData,
			}),
		}),
		signupUser: builder.mutation({
			query: (userData) => ({
				url: `auth/local/register`,
				method: "POST",
				body: userData,
			}),
		}),
	}),
});

export const { useLoginUserMutation, useSignupUserMutation } = UserApi;
