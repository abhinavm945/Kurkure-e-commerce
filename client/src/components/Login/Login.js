import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../utils/FirebaseConfig";
import "./Login.scss";

const Login = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <div className="login-container">
      {!user ? (
        <div className="login-box">
          <h1>Welcome</h1>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
      ) : (
        <div className="user-box">
          <h1>Hello, {user.displayName}!</h1>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="User Avatar" />
        </div>
      )}
    </div>
  );
};

export default Login;
