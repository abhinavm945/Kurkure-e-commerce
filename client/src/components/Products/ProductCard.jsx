import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, id }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}?userId=${id}`} className="no-underline">
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
          {product.categories && product.categories.length > 0 && (
            <div className="product-categories">
              <h4>Categories: </h4>
              {product.categories.map((category, index) => (
                <span key={index} className="category-item">
                  {category}
                  {index < product.categories.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
