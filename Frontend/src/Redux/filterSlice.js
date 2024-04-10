import { createSlice } from "@reduxjs/toolkit";
import ProductList from "../component/ProductList";

const filterSlice = createSlice({
  name: "filter",
  initialState: { filters: [] },
  reducers: {
    filter_by_search(state, action) {
      const { products, search } = action.payload;
      if (search !== "") {
        const filterProduct = products.filter((item) =>
          item.name.toLowerCase().includes(search)
        );
        state.filters = filterProduct;
      }
      state.searchvalue = search;
    },
    filterByCategory(state, action) {
      const { products, categoriesdata } = action.payload;
      if (categoriesdata !== "") {
        const filterProduct = products.filter(
          (item) => item.category == categoriesdata
        );
        state.filters = filterProduct;
      }
      state.categoryval = categoriesdata;
    },
    filter_by_price(state, action) {
      const { products, price } = action.payload;
      const filterProduct = products.filter((ProductList) => {
        return parseInt(ProductList.price) <= parseInt(price);
      });
      if (filterProduct.length != 0) {
        state.filters = filterProduct;
        state.price = price;
      } else {
        state.filters = [];
        state.price = 0;
      }
    },
  },
});

export default filterSlice.reducer;
export const { filterByCategory, filter_by_search, filter_by_price } =
  filterSlice.actions;
export const selectfilter = (state) => state.filter.filters;
export const selectsearchvalue = (state) => state.filter.searchvalue;
export const selectprice = (state) => state.filter.price;
export const selectcategory = (state) => state.filter.categoryval;
