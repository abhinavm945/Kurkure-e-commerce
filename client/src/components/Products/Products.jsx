import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import "./Products.scss";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/items/getproducts"); 
        console.log(response);
        if (response.data.success) {
          setProducts(response.data.data);

        } else {
          setError("Failed to load products.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-page">
      <h1 className="product-title">Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Product;
