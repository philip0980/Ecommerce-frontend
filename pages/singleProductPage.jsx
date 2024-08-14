import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/getproduct/?id=${id}`
      );
      console.log(response.data);
      const productData = response.data.products.find(
        (prod) => prod._id === id
      );

      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.image.url}
        alt={product.title}
        width={"300px"}
        height={"280px"}
      />
      <p>{product.description}</p>
    </div>
  );
};

export default SingleProduct;
