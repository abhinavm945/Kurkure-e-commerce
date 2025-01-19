import { useState } from "react";
import "./AddProduct.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [], // Add categories to the state
  });
  const [categoryInput, setCategoryInput] = useState(""); // Separate input for categories
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

  const handleCategoryAdd = () => {
    if (categoryInput.trim() !== "") {
      setProducts((prevState) => ({
        ...prevState,
        categories: [...prevState.categories, categoryInput.trim()],
      }));
      setCategoryInput(""); // Clear the input after adding
    }
  };

  const handleCategoryRemove = (index) => {
    setProducts((prevState) => ({
      ...prevState,
      categories: prevState.categories.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, stock, image, categories } = products;

    if (!name || !description || !price || !stock) {
      alert("All fields are required!");
      return;
    }

    const payload = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      image,
      categories,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8081/items/product",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        alert("Product added successfully!");
        navigate("/product");
      } else {
        alert("Error adding product: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={products.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-field">
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            value={products.description}
            onChange={handleChange}
            placeholder="Enter product description"
          ></textarea>
        </div>
        <div className="form-field">
          <label>Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={products.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </div>
        <div className="form-field">
          <label>Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={products.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
          />
        </div>
        <div className="form-field">
          <label>Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={products.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <div className="form-field">
          <label>Categories</label>
          <div className="categories-input">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Enter a category"
            />
            <button type="button" onClick={handleCategoryAdd}>
              Add
            </button>
          </div>
          <ul>
            {products.categories.map((category, index) => (
              <li key={index}>
                {category}
                <button type="button" onClick={() => handleCategoryRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
