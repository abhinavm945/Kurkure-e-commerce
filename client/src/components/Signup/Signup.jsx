import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email ?? "",
    name: location.state?.name ?? "",
    username: "",
    password: "",
    profile: location.state?.photoURL ?? "default-avatar-url.png",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3050/api/auth/signup",
        formData
      );

      const data = response.data;

      if (data.status) {
        alert("Signup successful!");
        navigate(`/home/${data.data.id}`);
      } else {
        alert(data.msg || "An error occurred during signup.");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        alert(error.response.data.msg); // Display specific error from the server
      } else {
        alert("Signup failed. Please try again.");
      }
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSignup}>
        <img
          src={formData.profile}
          alt="User Avatar"
          className="profile-image"
        />
        <h1>Create Your Account</h1>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
