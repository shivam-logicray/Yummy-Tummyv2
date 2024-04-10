import React, { useEffect } from "react";
import useFetchCollection from "../CustomeHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_Order_History, selectorder } from "../Redux/orderSlice";
import { selectoruserId } from "../Redux/authSlice";
import Loader from "./Loader";
import { FaRupeeSign } from "react-icons/fa";

const OrderHistory = () => {
  const { data, isloading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const userId = useSelector(selectoruserId);
  useEffect(() => {
    dispatch(STORE_Order_History(data));
  }, [data]);
  const orders = useSelector(selectorder);
  const myorder = orders.filter((item) => item.userId == userId);
  console.log(myorder,userId)
  return (
    <div className="container shadow p-3 mt-5">
      {isloading && <Loader />}
      <h1>OrderHistory</h1><hr />
      {myorder.length == 0 ? (
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
                  <th scope="col">Order Amount</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                {myorder.map((order, index) => {
                  const { id, orderDate, orderTime, totalAmount, orderStatus } =
                    order;
                  console.log(order);
                  return (
                    <tr key={id}>
                      <td scope="row">{index + 1}</td>
                      <td>
                        {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>
                        <FaRupeeSign />
                        {totalAmount}
                      </td>
                      <td>
                        {" "}
                        <p
                          className={
                            orderStatus !== "Delivered"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                      <td>
                        <button type="button" class="btn" style={{backgroundColor:'darkcyan'}}>
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

export default OrderHistory;
