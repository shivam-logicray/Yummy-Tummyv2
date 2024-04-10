import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkouts: [],
    recepitentname: localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).recepitentname
      : null,
      mobile:localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).mobile
      : null,
    add1: localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).address1
      : null,
    add2: localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).address2
      : null,
      country:localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).country
      : null,
      city:localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).city
      : null,
      state:localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).mstate
      : null,
    pincode: localStorage.getItem("checkout")
      ? JSON.parse(localStorage.checkout).pincode
      : null,
  },

  reducers: {
    STORE_Checkout(state, action) {
      state.checkouts = action.payload;
      let shippingAdd = action.payload;
      localStorage.setItem("checkout", JSON.stringify(shippingAdd));
    },
  },
});
export const { STORE_Checkout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const selectcheckout = (state) => state.checkout.checkouts;
