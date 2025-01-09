import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
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
    </div>
  );
};

export default ProductCard;
