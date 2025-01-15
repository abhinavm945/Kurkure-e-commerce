import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Cart.scss"; // Import your styling

const Cart = () => {
  const { id } = useParams(); // Get the userId from the URL params
  console.log("User ID:", id);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, cartProduct) => {
      return total + cartProduct.product.price * cartProduct.quantity;
    }, 0);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/cart/getCart/${id}`);
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
                <p className="cart-item-description">{cartProduct.product.description}</p>
                <p className="cart-item-price">₹{cartProduct.product.price}</p>
                <p className="cart-item-quantity">Quantity: {cartProduct.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}

      {/* Cart Summary */}
      <div className="cart-summary">
       
        <button className="checkout-button">Total Price is : ₹{total.toFixed(2)} click Here to Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Cart;
