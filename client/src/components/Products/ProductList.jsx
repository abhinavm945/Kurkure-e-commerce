import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, id }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} id={id} />
      ))}
    </div>
  );
};

export default ProductList;
