import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Orders.scss";

const Orders = () => {
  const { id } = useParams(); // Assuming 'id' is the user ID from the URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders for the user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/order/getOrder/${id}`
        );
        if (response.data.success) {
          setOrders(response.data.data);
        } else {
          setError(response.data.message || "Failed to load orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  // Post a new order (example usage)
  useEffect(() => {
    const postOrder = async () => {
      try {
        const response = await axios.post(
          "http://localhost:2000/order/pushOrder",
          {
            userId: id, // User ID from the URL params
            price: 500, // Example price
            payment: "Online", // Payment method
            cartId: 1, // Example cart ID
          }
        );

        if (response.data.success) {
          console.log("Order successfully pushed:", response.data);
          // Optionally refetch orders after posting
          setOrders((prevOrders) => [...prevOrders, response.data.data]);
        } else {
          console.error("Failed to push order:", response.data);
        }
      } catch (error) {
        console.error("Error posting the order:", error);
      }
    };

    // Example trigger for posting order
    // Uncomment to enable this on component mount
    // postOrder();
  }, [id]);

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="orders-empty">No orders found for this user.</div>;
  }

  return (
    <div className="orders-page">
      <h1>Orders for User ID: {id}</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <h2>Order #{order.id}</h2>
            <p>Payment Method: {order.payment}</p>
            <p>Total Price: ₹{order.price}</p>
            <div className="order-products">
              <h3>Products:</h3>
              <ul>
                {order.Product.map((product) => (
                  <li key={product.productId}>
                    {product.name} - ₹{product.price} x {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
