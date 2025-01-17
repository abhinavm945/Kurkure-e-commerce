import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import UserDetails from "./components/UserDetails/UserDetails";
import AddProduct from "./components/AddProducts/AddProduct";
import Products from "./components/Products/Products";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";
import ProductDetail from "./components/SingleProduct/ProductDetail";
import Success from "./components/Success/Success"
import Cancel from "./components/Cancel/Cancel"

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/" element={<Login />} />
        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/:id" element={<Home/>}/>
        <Route path="/userdetails/:id" element={<UserDetails />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/product" element={<Products />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order/:id" element={<Orders />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;