import React from "react";
import axios from "axios";
const Payment = () => {
  const buyNow = async () => {
    let response = await axios.post("http://localhost:9000/api/payment");
    if (response.status === 200){
        console.log(response.data);
    }
  };
  return (
    <div>
      <button onClick={buyNow}>buy now</button>
    </div>
  );
};

export default Payment;
