import React, { useEffect, useState } from "react";

const CartList = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const getCartData = () => {
      const data = localStorage.getItem("cart");
      const parsedData = JSON.parse(data);
      setCartData(parsedData || []);
    };
    getCartData();
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartData.filter((item) => item._id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCountChange = (id, num) => {
    const updatedCart = cartData.map((item) => {
      if (item._id === id) {
        const newCount = (item.count || 0) + num;
        return { ...item, count: Math.max(newCount, 0) }; // Ensure count doesn't go below 0
      }
      return item;
    });

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Cart Data</h2>
      {cartData.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid black",
            margin: "1rem",
            padding: "1rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <img
            src={product.image.url}
            alt={product.title}
            width="100px"
            height="100px"
            style={{ objectFit: "cover" }}
          />
          <div>
            <h3>{product.title}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>
              Total Price: ${product.price.toFixed(2) * (product.count || 0)}
            </p>
            <p>Stocks: {product.stocks}</p>
          </div>
          <div style={{ margin: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", margin: "1rem" }}>
              <button
                onClick={() => handleCountChange(product._id, -1)}
                disabled={(product.count || 0) <= 0} // Disable if count is 0
              >
                -
              </button>
              <p>{product.count || 0}</p>
              <button
                onClick={() => handleCountChange(product._id, +1)}
                disabled={(product.count || 0) >= product.stocks} // Disable if count is equal to stocks
              >
                +
              </button>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{ color: "red" }}
                onClick={() => removeItem(product._id)}
              >
                ✗
              </button>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
