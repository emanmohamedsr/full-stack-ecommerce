import type { IUser } from "@/interfaces/User";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	user: IUser | null;
	isInitialized: boolean;
}

const initialState: AuthState = {
	token: null,
	user: null,
	isInitialized: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserSession: (
			state,
			action: PayloadAction<{ token: string; user: IUser }>,
		) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.isInitialized = true;
		},
		clearSession: (state) => {
			state.token = null;
			state.user = null;
			state.isInitialized = true;
		},
		setInitialized: (state) => {
			state.isInitialized = true;
		},
	},
});

export const { setUserSession, clearSession, setInitialized } =
	authSlice.actions;
export default authSlice.reducer;
