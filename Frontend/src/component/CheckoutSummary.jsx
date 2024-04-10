import React from "react";
import { useSelector } from "react-redux";
import { selectCartItem, selectTotalAmount } from "../Redux/cartSlice";

const CheckoutSummary = () => {
  const cartItem = useSelector(selectCartItem);
  const total = useSelector(selectTotalAmount);
  return (
    <div>
      <h1>CheckOut Summary</h1>
      <div className="card p-2">
        <h5>Total Product (s): {cartItem.length}</h5>
        <h5>Total Amount: {total}</h5>
      </div>
      {cartItem.map((item, i) => {
        return (
          <div key={i} className="card p-2">
            <h6>Category: {item.category}</h6>
            <h6>Product Name : {item.name}</h6>
            <h6>Unit Price : {item.price}</h6>
            <h6>Quantity : {item.cartQuantity}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSummary;
