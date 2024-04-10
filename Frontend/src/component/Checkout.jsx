import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectCartItem, selectTotalAmount } from "../Redux/cartSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { selectcheckout } from "../Redux/checkoutSlice";

const stripePromise = loadStripe(
  "pk_test_51OmtC6SJ8KJd39FeBvbot2Bm1zB4DBKGfjPhOftlrc1IpLe02BN41Bt8kHplMm7mNFusno8kNakxewWbMAs8Hjhv00UKQ4F2Wu"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let cartItem = useSelector(selectCartItem);
  let total = useSelector(selectTotalAmount);
  let shipping = useSelector(selectcheckout);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://yummy-tummyv2.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total, shipping }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) {
          throw new Error("Client secret not found in response");
        }
        setClientSecret(data.clientSecret);
        console.log(data.clientSecret); // Log the clientSecret here
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container ">
      {!clientSecret && <Loader />}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
