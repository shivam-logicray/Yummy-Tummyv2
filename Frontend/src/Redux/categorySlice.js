import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "category",
  initialState: {categories: []},
  reducers: {
    STORE_CATEGORY(state, action) {
        state.categories=action.payload
    },
  },
});
export const {STORE_CATEGORY}=categoriesSlice.actions
export default categoriesSlice.reducer;
export const selectcategories=(state)=>state.category.categories
