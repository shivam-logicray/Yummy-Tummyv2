import React, { useEffect, useState } from "react";
import useFetchDocument from "../CustomeHook/useFetchDocument";
import { Link, useParams } from "react-router-dom";
import { FaArrowAltCircleLeft, FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  calculate_total,
  selectCartItem,
  selectTotalAmount,
} from "../Redux/cartSlice";
import ChangeOrderStatus from "./Admin/ChangeOrderStatus";

const OrderDetalis = () => {
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);
  const totalAmount = useSelector(selectTotalAmount);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder(document);
    dispatch(calculate_total());
  }, [document]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (order) {
      order.cartItem.forEach((cart) => {
        totalPrice += cart.price * cart.cartQuantity;
      });
    }
    return totalPrice;
  };

  return (
    <div className="container shadow mt-2 p-2 col-md-10">
      <div>
        <h2>Order Details</h2>
        <Link
          type="button"
          class="btn mb-2 float-end"
          style={{ backgroundColor: "darkcyan" }}
          to={"/admin/vieworder"}
        >
          <FaArrowAltCircleLeft /> Back To Order
        </Link>
      </div>
      <br />
      {order == null ? (
        <>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-info">Order ={order.orderStatus}</h4>
          <b>Shipping Address</b>
          <br />
          <b>
            Address:{order.shippingAddress.address1},
            {order.shippingAddress.address2},{order.shippingAddress.city}
          </b>
          <br />
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItem.map((cart, index) => {
                  const { id, name, imageUrl, price, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td scope="row">{index + 1}</td>
                      <td>{name}</td>
                      <td>{price}</td>
                      <td>
                        <img src={imageUrl} alt={name} width={50} />
                      </td>
                      <td>{cartQuantity}</td>
                      <td>{price * cartQuantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ChangeOrderStatus
              id={id}
              orderStatus={order.orderStatus}
              order={order}
            />
              <div className="col-4 float-end">
            <div className="card p-2">
              <hr />
              <h4>
                Total: <FaRupeeSign /> {calculateTotalPrice()}
              </h4>
            </div>
          </div>

        
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetalis;
