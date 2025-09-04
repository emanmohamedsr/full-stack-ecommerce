import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IInitialState {
	online: boolean;
}

const initialState: IInitialState = {
	online: navigator.onLine,
};

const networkSlice = createSlice({
	name: "network",
	initialState,
	reducers: {
		setOnline: (state) => {
			state.online = true;
		},
		setOffline: (state) => {
			state.online = false;
		},
	},
});

export const { setOnline, setOffline } = networkSlice.actions;
export default networkSlice.reducer;
export const selectNetworkStatus = (state: RootState) => state.network.online;
