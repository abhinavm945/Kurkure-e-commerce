import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Cart.scss"; // Import your styling
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { id } = useParams(); // Get the userId from the URL params
  console.log("User ID:", id);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, cartProduct) => {
      return total + cartProduct.product.price * cartProduct.quantity;
    }, 0);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/cart/getCart/${id}`
        );
        if (response.data.success) {
          setCart(response.data.data); // Set the cart data
        } else {
          setError(response.data.message || "Failed to load cart products.");
        }
      } catch (err) {
        console.error("Error fetching cart products:", err);
        setError("Failed to fetch cart products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [id]);

  if (loading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">{error}</div>;

  const total = cart ? calculateTotal() : 0;
  const paymentsFunc = async () => {
    console.log("Cart data before formatting:", cart);

    const formattedCart = cart.map((cartProduct) => ({
      name: cartProduct.product.name,
      price: cartProduct.product.price,
      quantity: cartProduct.quantity,
    }));

    console.log("Formatted Cart Data:", formattedCart); // Debugging

    try {
      const stripe = await loadStripe(
        `pk_test_51NSixySI3j3qXOu7sO4QJ9ZeZkBCZ8BTApSHMmBRa6cNpnMpDwuK3sv4n5HeYK89BRVO68y1npr1AelDAoiAbsru0091Tqtxil`
      );

      const response = await axios.post("http://localhost:9000/payment", {
        products: formattedCart,
      });

      console.log("Server response:", response.data);

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

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {/* Cart Items */}
      {cart && cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((cartProduct) => (
            <div key={cartProduct.product.id} className="cart-item">
              <img
                src={cartProduct.product.image}
                alt={cartProduct.product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{cartProduct.product.name}</h3>
                <p className="cart-item-description">
                  {cartProduct.product.description}
                </p>
                <p className="cart-item-price">₹{cartProduct.product.price}</p>
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
          Total Price is : ₹{total.toFixed(2)} click Here to Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
