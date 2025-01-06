import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import UserDetails from "./components/UserDetails/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/" element={<Login />} />
        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/:id" element={<Home/>}/>
        <Route path="/userdetails" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;