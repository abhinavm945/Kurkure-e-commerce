import React, { useEffect } from 'react';
import axios from 'axios'; // Import axios for making the request

const Success = () => {
  useEffect(() => {
    // Function to send the POST request
    const postOrder = async () => {
      try {
        const response = await axios.post('http://localhost:2000/order/pushOrder', {
          userId: 1, // Example userId, replace with actual value
          price: 500, // Example price, replace with actual value
          payment: 'Online', // Payment method (example)
          cartId: 1, // Example cartId, replace with actual value
        });

        if (response.data.success) {
          console.log('Order successfully pushed:', response.data);
        } else {
          console.error('Failed to push order:', response.data);
        }
      } catch (error) {
        console.error('Error posting the order:', error);
      }
    };

    // Call the function to post the order
    postOrder();
  }, []); // Empty dependency array to trigger this only on component mount

  return (
    <div>
      <h1>Success</h1>
      <p>Your payment was successful and your order has been placed!</p>
    </div>
  );
};

export default Success;
