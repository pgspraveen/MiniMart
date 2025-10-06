import React, { useEffect, useState } from 'react'; // Import React and hooks for state and side-effects
import { Navigate } from 'react-router-dom'; // Import Navigate for redirecting if not logged in
import axios from 'axios'; // Import axios to make HTTP requests
import './MyProfile.css'; // Import CSS for styling the profile page

// Define MyProfile component
const MyProfile = ({ token, cart, setCart }) => {
  // State to store user data
  const [data, setData] = useState(null);
  // State to track if order has been placed
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Fetch user profile data on component mount or when token changes
  useEffect(() => {
    if (token) { // Check if user is logged in
      axios.get('http://localhost:5000/myprofile', {
        headers: { 'x-token': token } // Send token in headers for authentication
      }).then(res => setData(res.data)) // Store fetched user data
        .catch(err => console.log(err)); // Log any errors
    }
  }, [token]);

  // Redirect to login page if token is missing
  if (!token) return <Navigate to="/login" />;

  // Function to handle placing the order
  const placeOrder = () => {
    if (cart.length === 0) { // Check if cart is empty
      alert('Cart is empty'); // Alert if no products
      return;
    }
    setOrderPlaced(true); // Mark order as placed
    setCart([]); // Clear the cart
  };

  // JSX to render the profile and cart
  return (
    <div className="profile-container">
      {data && ( // Render only if user data is loaded
        <div className="profile-card">
          <h2>Welcome, {data.username}</h2> {/* Display username */}
          <p>Email: {data.email}</p> {/* Display email */}

          <h3>Your Cart</h3>
          {cart.length === 0 && <p>No products in cart</p>} {/* Show message if cart is empty */}
          {cart.map(p => ( // List products in cart
            <div key={p._id} className="cart-item">
              <span>{p.name} - ₹{p.price}</span>
            </div>
          ))}

          {/* Place order button */}
          <button className="order-btn" onClick={placeOrder}>Place Order</button>
          {/* Show success message when order is placed */}
          {orderPlaced && <p className="success-msg">✅ Order placed successfully!</p>}
        </div>
      )}
    </div>
  );
};

export default MyProfile; // Export the component for use in App.js
