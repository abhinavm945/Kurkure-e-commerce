import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../utils/FirebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useParams } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const {id} = useParams();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const { email, photoURL, displayName: name } = result.user;

      if (email) {
        const response = await axios.post(
          "http://localhost:3050/api/auth/check-user",
          { email }
        );

        const data = response.data;
        console.log(data);
        if (!data.status) {
          // Navigate to signup if user does not exist
          navigate("/signup", { state: { email, photoURL, name } });
        } else {
          // Navigate to home page if user exists
          navigate(`/userdetails/${data.data.id}`);
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      {!userData ? (
        <div className="login-box">
          <h1>Welcome</h1>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
      ) : (
        <div className="user-box">
          <h1>Hello, {userData.name}!</h1>
          <p>Email: {userData.email}</p>
          <img src={userData.photoURL} alt="User Avatar" />
        </div>
      )}
    </div>
  );
};

export default Login;
