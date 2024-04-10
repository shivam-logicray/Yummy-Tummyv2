import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    totalAmount: localStorage.getItem("total")
      ? JSON.parse(localStorage.getItem("total"))
      : 0,
    previousUrl: "",
  },
  reducers: {
    add_to_cart(state, action) {
      console.log(action.payload);
      let itemIndex = state.cartItem.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex == -1) {
        // add
        state.cartItem.push({ ...action.payload, cartQuantity: 1 });
        toast.success(`${action.payload.name} added to cart`);
      } else {
        // increase
        state.cartItem[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    decrease(state, action) {
      let itemIndex = state.cartItem.findIndex(
        (item) => item.id == action.payload.id
      );
      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1;
      } else {
        state.cartItem[itemIndex].cartQuantity = 1;
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    remove_From_Cart(state, action) {
      state.cartItem.splice(action.payload, 1);
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },

    empty_cart(state, action) {
      state.cartItem = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItem");
    },
    calculate_total(state, action) {
      let t = state.cartItem.reduce((prev, item) => {
        return (prev += item.price * item.cartQuantity);
      }, 0);
      state.totalAmount = t;
    },
    save_url(state, action) {
      state.previousUrl = action.payload;
    },
  },
});
export const {
  add_to_cart,
  decrease,
  remove_From_Cart,
  empty_cart,
  calculate_total,
  save_url,
} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItem = (state) => state.cart.cartItem;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectUrl = (state) => state.cart.previousUrl;
