import { Timestamp, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Firebase/config";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatus = ({ id, orderStatus, order }) => {
  const [status, setStatus] = useState(orderStatus);
  const navigate = useNavigate();

  const handleStatus = async (e) => {
    e.preventDefault();
    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      totalAmount: order.totalAmount,
      cartItem: order.cartItem,
      shippingAddress: order.shippingAddress,
      orderDate: order.orderDate,
      orderStatus: status,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      await setDoc(doc(db, "orders", id), orderConfig);
      emailjs
        .send(
          "service_4ghewbg",
          "template_kdtj0h6",
          {
            user_email: orderConfig.userEmail,
            user_status: orderConfig.orderStatus,
            amount: orderConfig.totalAmount,
          },
          "FgXUEQytXAZKRIlGd"
        )
        .then(
          (result) => {
            toast.success("Order Placed");
            navigate("/admin/vieworder");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    } catch (error) {
      toast.error("Error updating order status:", error);
    }
  };

  return (
    <div className="col-md-6">
      <form onSubmit={handleStatus}>
        <div className="">
          <label htmlFor="" className="form-label">
            OrderStatus
          </label>
          <select
            className="form-select form-select"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Select One</option>
            <option>Order Placed</option>
            <option>Processing</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default ChangeOrderStatus;
