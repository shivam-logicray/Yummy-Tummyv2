import React, { useEffect } from "react";
import useFetchCollection from "../../CustomeHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectoruserId } from "../../Redux/authSlice";
import { STORE_Order_History, selectorder } from "../../Redux/orderSlice";
import { FaRupeeSign } from "react-icons/fa";
import Loader from "../Loader";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const { data, isloading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const userId = useSelector(selectoruserId);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(STORE_Order_History(data));
  }, [data]);
  const orders = useSelector(selectorder);
  let handleOrder = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  return (
    <div className="container shadow p-3 mt-5">
      {isloading && <Loader />}
      <h1>Orders</h1>
      <hr />
      {orders.length == 0 ? (
        <>No Product Found</>
      ) : (
        <>
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Srno</th>
                  <th scope="col">Date</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Order Amount</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const {
                    id,
                    orderDate,
                    orderTime,
                    totalAmount,
                    orderStatus,
                    userEmail,
                  } = order;
                  return (
                    <tr key={id}>
                      <td scope="row">{index + 1}</td>
                      <td>
                        {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>{userEmail}</td>
                      <td>
                        <FaRupeeSign />
                        {totalAmount}
                      </td>
                      <td>
                        <p
                          className={
                            orderStatus !== "delivered"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn"
                          style={{ backgroundColor: "darkcyan" }}
                          onClick={() => handleOrder(id)}
                          disabled={orderStatus == "delivered" ? "true" : ""}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
