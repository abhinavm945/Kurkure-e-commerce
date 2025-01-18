import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Cart.scss"; // Import your styling
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { id } = useParams(); // Get the userId from the URL params
  console.log("User ID:", id);

  const [cart, setCart] = useState(); // State to hold the cart data
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [error, setError] = useState(null); // State to hold error messages

  // Calculate total price
  const calculateTotal = () => {
    return cart.CartProducts.reduce((total, cartProduct) => {
      return total + cartProduct.Product.price * cartProduct.quantity;
    }, 0);
  };

  // Fetch cart data
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/cart/getCart/${id}`
        );
        setCart(response.data); // Set the cart data
      } catch (err) {
        console.error("Error fetching cart products:", err);
        setError("Failed to fetch cart products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [id]);

  const total = cart && cart.CartProducts.length > 0 ? calculateTotal() : 0;

  // Function to push the order
  const pushOrder = async () => {
    try {
      // Log the request body for debugging
      console.log({
        userId: id,
        price: total,
        payment: "Online",
        cartId: cart?.id,
      });
  
      const response = await axios.post(`http://localhost:2000/order/pushOrder`, {
        userId: id,
        price: total,
        payment: "Online",
        cartId: cart?.id,
      });
  
      if (response.data.success) {
        console.log("Order pushed successfully:", response.data);
        return true;
      } else {
        alert("Failed to place the order. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error pushing order:", error.response?.data || error.message);
      alert("An error occurred while placing the order.");
      return false;
    }
  };
  

  // Handle payment processing
  const paymentsFunc = async () => {
    const formattedCart = cart.CartProducts.map((cartProduct) => ({
      name: cartProduct.Product.name,
      price: cartProduct.Product.price,
      quantity: cartProduct.quantity,
    }));

    try {
      // Push the order before redirecting to payment
      const orderSuccess = await pushOrder();
      if (!orderSuccess) return;

      const stripe = await loadStripe(
        `pk_test_51NSixySI3j3qXOu7sO4QJ9ZeZkBCZ8BTApSHMmBRa6cNpnMpDwuK3sv4n5HeYK89BRVO68y1npr1AelDAoiAbsru0091Tqtxil`
      );

      const response = await axios.post("http://localhost:9000/payment", {
        products: formattedCart,
      });

      const { id } = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (result.error) {
        console.error("Stripe error:", result.error.message);
      }
    } catch (err) {
      console.error("Payment failed:", err.message);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {/* Cart Items */}
      {cart && cart.CartProducts.length > 0 ? (
        <div className="cart-items">
          {cart.CartProducts.map((cartProduct) => (
            <div key={cartProduct.Product.id} className="cart-item">
              <img
                src={cartProduct.Product.image}
                alt={cartProduct.Product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{cartProduct.Product.name}</h3>
                <p className="cart-item-description">
                  {cartProduct.Product.description}
                </p>
                <p className="cart-item-price">₹{cartProduct.Product.price}</p>
                <p className="cart-item-quantity">
                  Quantity: {cartProduct.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}

      {/* Cart Summary */}
      <div className="cart-summary">
        <button onClick={paymentsFunc} className="checkout-button">
          Total Price is : ₹{total.toFixed(2)} Click Here to Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
