//Import libraries------>>
const express = require("express");
const colors = require("colors");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
//ENV Configs--------->>
app.use(express.json());
app.use(cors());
//HTTP get request------>>
app.get("/", (req, res) => {
  res.send("Hello payment gateway");
});
app.post("/payment", async (req, res) => {
  const { price } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Start listeining to the port----->>
app.listen(process.env.PORT, () => {
  console.log(
    ` Payment Gateway Server is working on PORT ${process.env.PORT} `.bgWhite
      .black
  );
});
