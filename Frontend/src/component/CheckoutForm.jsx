import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectorEmail, selectoruserId } from "../Redux/authSlice";
import {
  empty_cart,
  selectCartItem,
  selectTotalAmount,
} from "../Redux/cartSlice";
import { selectcheckout } from "../Redux/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

let CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  let userEmail = useSelector(selectorEmail);
  let userId = useSelector(selectoruserId);
  let totalAmount = useSelector(selectTotalAmount);
  let cartItem = useSelector(selectCartItem);
  let shippingAddress = useSelector(selectcheckout);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let saveOrder = async () => {
    console.log(userId);
    let today = new Date();
    let orderDate = today.toLocaleDateString();
    let orderTime = today.toLocaleTimeString();

    let orderconfig = {
      userEmail,
      userId,
      totalAmount,
      cartItem,
      shippingAddress,
      orderDate,
      orderTime,
      orderStatus: "order Placed",
      createdAt: Timestamp.now().toDate(),
    };
    try {
      console.log(orderconfig);
      let docRef = collection(db, "orders");
      await addDoc(docRef, orderconfig);
      dispatch(empty_cart());
      console.log(emailjs);
      emailjs
        .send(
          "service_4ghewbg",
          "template_kdtj0h6",
          {
            user_email: orderconfig.userEmail,
            user_status: orderconfig.orderStatus,
            amount: orderconfig.totalAmount,
          },
          "FgXUEQytXAZKRIlGd"
        )
        .then(
          (result) => {
            toast.success("Order Placed");
            navigate("/home");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setMessage(null);
    setIsLoading(true);
    const confirmpayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/home",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if ((result.paymentIntent.status = "succeeded")) {
            setIsLoading(false);
            toast.success("payment success");
            saveOrder();
          }
        }
      });
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="row shadow mt-5 p-3">
      <div className="col-md-6 ">
        <CheckoutSummary />
      </div>
      <div className="col-md-6">
        <h2 className="mt-5">Payment</h2>
        <hr />
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <div className="d-grid gap-2">
            {" "}
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              class=" btn mt-2"
              style={{ backgroundColor: "darkcyan" }}
            >
              <span id="button-text">{isLoading ? <Loader /> : "Pay Now"}</span>
            </button>
          </div>

          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
