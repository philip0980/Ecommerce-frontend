import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostProduct = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPosted) {
      setSuccessMessage("Product Posted Successfully");
    }
  }, [isPosted, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    if (!image || !title || !description || !price || !stocks) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stocks", stocks);

    try {
      const seller_token = localStorage.getItem("seller_token");
      console.log(seller_token);

      const response = await axios.post(
        "http://localhost:8000/api/v1/product/postproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${seller_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Debugging information
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status === 201) {
        setIsPosted(true);
      } else {
        setErrorMessage("Posting product failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Posting product error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Posting product error. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Post Product</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label htmlFor="stocks">Stocks</label>
        <input
          type="number"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      {errorMessage && <p className="register-message error">{errorMessage}</p>}
      {successMessage && (
        <p className="register-message success">{successMessage}</p>
      )}
    </div>
  );
};

export default PostProduct;
