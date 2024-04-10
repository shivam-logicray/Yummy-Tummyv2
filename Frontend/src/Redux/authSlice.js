import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoadingIn: localStorage.getItem("auth")
      ? JSON.parse(localStorage.auth).isLoadingIn
      : false,
    userEmail: localStorage.getItem("auth")
      ? JSON.parse(localStorage.auth).userEmail
      : null,
    userRole: localStorage.getItem("auth")
      ? JSON.parse(localStorage.auth).userRole
      : null,
    userName: null,
    userId: localStorage.getItem("auth")
      ? JSON.parse(localStorage.auth).userId
      : null,
  },
  reducers: {
    logginuser(state, action) {
      let { userEmail, userRole, userName, userId } = action.payload;
      state.isLoadingIn = true;
      state.userEmail = userEmail;
      state.userRole = userRole;
      state.userName = userName;
      state.userId = userId;
      let obj = {
        isLoadingIn: state.isLoadingIn,
        userEmail,
        userRole,
        userName,
        userId,
      };
      localStorage.setItem("auth", JSON.stringify(obj));
    },
    loggoutuser(state, action) {
      state.isLoadingIn = false;
      state.userEmail = null;
      state.userRole = null;
      state.userName = null;
      state.userId = null;
      localStorage.removeItem("auth");
    },
  },
});
export const { logginuser, loggoutuser } = authSlice.actions;
export default authSlice.reducer;
export const selectorisLoading = (state) => state.auth.isLoadingIn;
export const selectorEmail = (state) => state.auth.userEmail;
export const selectoruserRole = (state) => state.auth.userRole;
export const selectoruserName = (state) => state.auth.userName;
export const selectoruserId = (state) => state.auth.userId;
