import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="no-underline">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
        <div className="product-card-content">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Rs: {product.price}</p>
          <p className="product-stock">Stock: {product.stock}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
