import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import UserDetails from "./components/UserDetails/UserDetails";
import AddProduct from "./components/AddProducts/AddProduct";
import Products from "./components/Products/Products";

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
      </Routes>
    </Router>
  );
}

export default App;