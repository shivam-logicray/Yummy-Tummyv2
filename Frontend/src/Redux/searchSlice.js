import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { searchs: [] },
  reducers: {
    STORE_SEARCH(state, action) {
      const { allproduct, search } = action.payload;
      let data = allproduct.filter(
        (item) => item.name.includes(search) || item.category.includes(search)
      );
      state.searchs = data;
      console.log(state.filter);
    },
  },
});
export const { STORE_SEARCH } = searchSlice.actions;
export default searchSlice.reducer;
export const selectsearchs = (state) => state.search.searchs;
