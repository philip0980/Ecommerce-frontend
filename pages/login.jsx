import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setSuccessMessage("Login Successful");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        password,
      });

      // Debugging information
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      console.log("Response Data Token:", response.data.token);

      if (response.status === 200 && response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Login error. Please try again.");
    }
  };

  const Register = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Or</p>
      <button onClick={Register}>Register</button>

      {errorMessage && <p className="login-message error">{errorMessage}</p>}
      {successMessage && (
        <p className="login-message success">{successMessage}</p>
      )}
    </div>
  );
};

export default Login;
