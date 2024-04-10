import express from "express";
import cors from "cors";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OmtC6SJ8KJd39FeVTgsPwvr7l4hEg4c4ZPHks9F5Dy82LOWaSABxoxcH5ZzrvyY2oiVUkbaDmCNJwL9n7xQfTSW00NDMSkioR"
);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  let { amount, shipping } = req.body;
  let paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    description: "description",
    shipping: {
      address: {
        line1: shipping.address1,
        line2: shipping.address2,
        city: shipping.city,
        state: shipping.state,
        postal_code: shipping.pincode,
        country: shipping.country,
      },
      name: shipping.recepitentname,
      phone: shipping.mobile,
    },
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});
app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = 1000;
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
