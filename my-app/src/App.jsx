import React, { useState } from 'react'; // Import React and useState hook
import { Routes, Route } from 'react-router-dom'; // Import routing components
import Nav from './components/Nav'; // Navbar component
import Register from './components/Register'; // Register page
import Login from './components/Login'; // Login page
import MyProfile from './components/MyProfile'; // Profile page
import ProductList from './components/ProductList'; // Products page
import './App.css'; // Global styling

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); 
  // State to store user token, initially from localStorage

  const [cart, setCart] = useState([]); 
  // State to store products added to cart

  return (
    <div className="app-container">
      <Nav token={token} setToken={setToken} /> 
      {/* Navbar receives token and setToken to handle login/logout display */}

      <Routes>
        <Route 
          path="/" 
          element={<ProductList token={token} cart={cart} setCart={setCart} />} 
        /> 
        {/* Home page: displays products, passes token and cart handlers */}

        <Route path="/register" element={<Register />} /> 
        {/* Register page */}

        <Route path="/login" element={<Login setToken={setToken} />} /> 
        {/* Login page: updates token on successful login */}

        <Route 
          path="/myprofile" 
          element={<MyProfile token={token} cart={cart} setCart={setCart} />} 
        /> 
        {/* Profile page: displays user info and cart, can place orders */}
      </Routes>
    </div>
  );
};

export default App;
