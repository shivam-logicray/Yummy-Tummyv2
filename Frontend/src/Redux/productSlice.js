import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { products: [] },
  reducers: {
    STORE_PRODUCT(state, action) {
      state.products = action.payload;
    },
  },
});
export const { STORE_PRODUCT } = productSlice.actions;
export default productSlice.reducer;
export const selectproduct = (state) => state.product.products;
