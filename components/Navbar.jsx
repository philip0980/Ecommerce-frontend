import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  isSellerLoggedIn,
  isLoggedIn,
  handleLogout,
  handleSellerLogout,
}) => {
  const [count, setCount] = useState(0);

  const getItems = () => {
    const item = localStorage.getItem("cart");
    if (item) {
      const parsedItem = JSON.parse(item);
      setCount(parsedItem.length);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    getItems();
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "grey",
        width: "100vw",
        height: "16vh",
      }}
    >
      <Link to="/">
        <h1 style={{ color: "black" }}>Sarojni Market</h1>
      </Link>

      <Link to="/products">
        <h4 style={{ color: "black" }}>Products</h4>
      </Link>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {isLoggedIn ? (
          <Link to="/login">
            <button onClick={handleLogout}>Logout</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {isSellerLoggedIn ? (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/">
              <button onClick={handleSellerLogout}>Seller Logout</button>
            </Link>

            <Link to="/seller/post-product">
              <button>Post Product</button>
            </Link>
          </div>
        ) : (
          <Link to="/seller/login">
            <button>Seller Login</button>
          </Link>
        )}
        <div style={{ display: "flex", position: "relative" }}>
          <Link to="/cart">
            <p style={{ color: "black", zIndex: "2" }}>Cart</p>
            <p
              style={{
                color: "red",
                backgroundColor: "white",
                borderRadius: "50%",

                width: "1rem",
                height: "1rem",
                position: "absolute",
                bottom: "1rem ",
                left: "1.4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {count}
            </p>
          </Link>
        </div>
        {isSellerLoggedIn ? (
          <Link to="/seller/profile">
            <h3 style={{ color: "black" }}>Profile</h3>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
