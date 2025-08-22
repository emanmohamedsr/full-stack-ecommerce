import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IProduct } from "@/interfaces/Product";

interface IInitialState {
	products: IProduct[];
}

const initialState: IInitialState = {
	products: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		handleCartProducts: (state, action: PayloadAction<IProduct[]>) => {
			state.products = action.payload;
		},
	},
});

export const { handleCartProducts } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartProducts = (state: RootState) => state.cart.products;
