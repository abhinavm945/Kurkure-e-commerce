import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const { userId } = queryString.parse(location.search);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const addToCart=async ()=>{
try {
  const response=await axios.post("http://localhost:8084/cart/addToCart",
    {userId,productId}
  );
if(response.data.success){
  alert(response.data.message || "Product is added to the cart.")
}else{
  alert(response.data.message || "failed to add the Product to the cart."
  )
}
} catch (err) {
  console.error("Error adding product to cart:", err);
      alert("Failed to add product to cart. Please try again later.");
}
}
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/items/getproducts/${productId}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError("Failed to load product details.");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-details">
      <div className="product-content">
        {/* Image Section */}
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-details-image" />
        </div>

        {/* Information Section */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-rating">
            ★★★★☆ (4.5) {/* Placeholder for a star rating */}
          </div>
          <p className="product-price">Price: ₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-stock">Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          <div className="product-actions">
            <button className="buy-now-button" onClick={addToCart}>Buy Now</button>
            <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
