import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/getproduct"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8000/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getData();
    getUser();
  }, []);

  useEffect(() => {
    // Load cart from localStorage when the component mounts
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    console.log("Saving cart to localStorage:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    const cartProduct = cart.find((p) => p._id === productId);
    if (!cartProduct) {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      console.log("Updated cart:", updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      // navigate("/cart");
    } else {
      console.log("Product already exists in cart");
    }
  };

  const singleProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const buyNow = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const productDetail = products.find((p) => p._id === id);
      if (!productDetail) {
        console.error("Product not found");
        return;
      }

      const sender = user;
      const receiver = productDetail.seller;

      const response = await axios.post(
        "http://localhost:8000/api/v1/product/send-request",
        { sender, receiver, productDetail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Product bought successfully");
      } else {
        console.error("Failed to buy product:", response.status);
      }
    } catch (error) {
      console.error(
        "Error buying product:",
        error.response || error.message || error
      );
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid black",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <img
              src={product.image.url}
              alt={product.title}
              width={"300px"}
              height={"280px"}
              onClick={() => singleProduct(product._id)}
            />
            <h3>{product.title}</h3>
            <div style={{ display: "flex ", gap: "1rem" }}>
              <button onClick={() => addToCart(product._id)}>
                Add to Cart
              </button>
              <button onClick={() => buyNow(product._id)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
