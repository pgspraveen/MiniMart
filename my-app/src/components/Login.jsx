import React, { useState } from 'react'; // Import React and useState hook to manage component state
import axios from 'axios'; // Import axios for making HTTP requests to backend
import { Navigate } from 'react-router-dom'; // Import Navigate to redirect after login
import './Login.css' // Import custom CSS for styling the login form

// Define the Login component
const Login = ({ setToken }) => {
  // Local state to store token and form data
  const [token, setLocalToken] = useState(localStorage.getItem('token')); // Check if token exists in localStorage
  const [data, setData] = useState({ email: '', password: '' }); // Store email and password input values

  // Function to handle input changes
  const changeHandler = e => setData({ 
    ...data, // Preserve existing state
    [e.target.name]: e.target.value // Update specific field based on input name
  });

  // Function to handle form submission
  const submitHandler = e => {
    e.preventDefault(); // Prevent default form submit behavior
    axios.post('http://localhost:5000/login', data) // Send POST request to backend
      .then(res => {
        setToken(res.data.token); // Update token in parent context
        localStorage.setItem('token', res.data.token); // Store token in localStorage
        setLocalToken(res.data.token); // Update local token state
      })
      .catch(err => alert(err.response.data)); // Show error message if login fails
  };

  // Redirect to home page if user is already logged in
  if (token) return <Navigate to="/" />;

  // JSX to render the login form
  return (
    <div className="auth-container"> {/* Container for the login form */}
      <form className="auth-form" onSubmit={submitHandler}> {/* Form element */}
        <h2>Login</h2> {/* Form heading */}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={changeHandler} 
          required // Make field mandatory
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={changeHandler} 
          required
        />
        <input type="submit" value="Login" /> {/* Submit button */}
      </form>
    </div>
  );
};

export default Login; // Export the component for use in App.js or other components
