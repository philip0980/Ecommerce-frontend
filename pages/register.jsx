import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistered, setisRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      setSuccessMessage("Register Successful");
      navigate("/");
    }
  }, [isRegistered, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    if (!name || !email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/register",
        {
          name,
          email,
          password,
        }
      );

      // Debugging information
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      console.log("Response Data Token:", response.data.token);

      if (response.status === 200 && response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setisRegistered(true);
      } else {
        setErrorMessage("Register failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Register error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Register error. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>

      {errorMessage && <p className="register-message error">{errorMessage}</p>}
      {successMessage && (
        <p className="register-message success">{successMessage}</p>
      )}
    </div>
  );
};

export default Register;
