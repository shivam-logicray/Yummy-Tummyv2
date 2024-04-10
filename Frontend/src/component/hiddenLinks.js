import React from "react";
import { useSelector } from "react-redux";
import { selectorisLoading, selectoruserRole } from "../Redux/authSlice";
import { Navigate } from "react-router-dom";
import { selectproduct } from "../Redux/productSlice";
import { selectCartItem } from "../Redux/cartSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoadingIn = useSelector(selectorisLoading);
  if (isLoadingIn == true) {
    return children;
  } else {
    return null;
  }
};

export const ShowOnLogOut = ({ children }) => {
  const isLoadingIn = useSelector(selectorisLoading);
  if (isLoadingIn == false) {
    return children;
  } else {
    return null;
  }
};
export const ProtectAdmin = ({ children }) => {
  const isLoadingIn = useSelector(selectorisLoading);
  const role = useSelector(selectoruserRole);
  if (isLoadingIn && role == "admin") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export const ProtectProduct = ({ children }) => {
  const isLoadingIn = useSelector(selectorisLoading);
  const role = useSelector(selectproduct);
  if (isLoadingIn ) {
    return children;
  } else {
    return<Navigate to='/login'/>;
  }
};
export const ProtectCart = ({ children }) => {
  const isLoadingIn = useSelector(selectorisLoading);
  const role = useSelector(selectCartItem);
  if (isLoadingIn) {
    return children;
  } else {
    return<Navigate to='/login'/>;
  }
};
