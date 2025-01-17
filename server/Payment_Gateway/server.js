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
  const { products } = req.body;
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/success`,
    });
    res.json({ id: session.id });
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
