import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ICategory } from "@/interfaces/Product";

interface initialState {
	category: ICategory | null;
}

const initialState: initialState = {
	category: null,
};

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<ICategory | null>) => {
			state.category = action.payload;
		},
	},
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
export const selectCategory = (state: RootState) => state.category.category;
