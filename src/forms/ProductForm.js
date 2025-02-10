import React, { useState, useEffect } from "react";
import db from "../components/database";
import axios from "axios";
import { syncData } from "../components/sync";


function ProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  // Save product online
  const saveOnline = async (product) => {
    try {
      await axios.post("http://localhost:5000/api/products", product);
      console.log("Product saved online:", product);
    } catch (error) {
      console.error("Error saving product online:", error);
    }
  };

  // Save product offline
  const saveOffline = async (product) => {
    await db.products.add(product);
    console.log("Product saved offline:", product);
  };

  // Sync data when back online
  useEffect(() => {
    if (navigator.onLine) {
      syncData();
    }
  }, [navigator.onLine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { productName, price };

    if (navigator.onLine) {
      await saveOnline(newProduct);
    } else {
      await saveOffline(newProduct);
    }

    setProductName("");
    setPrice("");
  };

  return (
    <div>
      <h2>Product Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;
