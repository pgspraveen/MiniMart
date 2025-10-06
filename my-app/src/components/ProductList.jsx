import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for API requests
import './ProductList.css'; // Import CSS for styling

// ProductList component receives token, cart, and setCart as props
const ProductList = ({ token, cart, setCart }) => {
  const [products, setProducts] = useState([]); // State to store all products

  // Fetch products from server whenever token changes
  useEffect(() => {
    if (token) { // Only fetch if user is logged in
      axios.get('http://localhost:5000/products', {
        headers: { 'x-token': token } // Send token for authentication
      })
      .then(res => setProducts(res.data)) // Store fetched products in state
      .catch(err => console.log(err)); // Log errors if any
    } else {
      setProducts([]); // Clear products if no token
    }
  }, [token]);

  // Function to add a product to cart
  const addToCart = (product) => {
    if (!cart.find(p => p._id === product._id)) { // Check if product already in cart
      setCart([...cart, product]); // Add product to cart
      window.alert(`${product.name} Added to Cart`); // Show alert
    } else {
      window.alert(`${product.name} is already in Cart`); // Alert if already in cart
    }
  };

  // Function to remove a product from cart
  const deleteFromCart = (productId) => {
    const removed = cart.find(p => p._id === productId); // Find product to remove
    if (removed) {
      setCart(cart.filter(p => p._id !== productId)); // Remove product from cart
      window.alert(`${removed.name} Deleted from Cart`); // Show alert
    }
  };

  // JSX to render products
  return (
    <div className="products-container">
      <h1>💻WELCOME TO MINIMART💻</h1> {/* Page title */}
      <div className="products-grid">
        {token && products.map(p => ( // Loop through products if user logged in
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3> {/* Product name */}
            <p className="price">₹{p.price}</p> {/* Product price */}
            <p className="description">{p.description}</p> {/* Product description */}
            <div className="product-buttons">
              <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
              <button className="delete-btn" onClick={() => deleteFromCart(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; // Export the component
