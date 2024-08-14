import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "../pages/products.jsx";
import Home from "../pages/home.jsx";
import SingleProduct from "../pages/singleProductPage.jsx";
import CartList from "../components/CartList.jsx";
import Navbar from "../components/Navbar.jsx";
import Login from "../pages/login.jsx";
import SellerLogin from "../pages/sellerLogin.jsx";
import PostProduct from "../pages/postProduct.jsx";
import Profile from "../pages/profile.jsx";
import Register from "../pages/register.jsx";
import SellerRegister from "../pages/sellerRegister.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

  const seller_login = () => {
    const seller_token = localStorage.getItem("seller_token");
    if (seller_token) {
      setIsSellerLoggedIn(true);
    }
  };
  const user_login = () => {
    const user_token = localStorage.getItem("token");
    if (user_token) {
      setIsLoggedIn(true);
    }
  };
  const user_logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const seller_logout = () => {
    localStorage.removeItem("seller_token");
    setIsSellerLoggedIn(false);
  };

  useEffect(() => {
    seller_login();
  }, []);

  useEffect(() => {
    user_login();
  }, []);
  return (
    <div>
      <Router>
        <Navbar
          isSellerLoggedIn={isSellerLoggedIn}
          isLoggedIn={isLoggedIn}
          handleLogout={user_logout}
          handleSellerLogout={seller_logout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller/post-product" element={<PostProduct />} />
          <Route path="/seller/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
