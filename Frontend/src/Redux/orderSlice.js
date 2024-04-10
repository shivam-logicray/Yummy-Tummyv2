import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orderhistory",
  initialState: { orders: [] },
  reducers: {
    STORE_Order_History(state, action) {
      state.orders = action.payload;
    },
  },
});
export const { STORE_Order_History } = orderSlice.actions;
export default orderSlice.reducer;
export const selectorder = (state) => state.order.orders;
