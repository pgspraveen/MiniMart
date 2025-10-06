import React, { useState } from 'react'; // Import React and useState hook to manage component state
import axios from 'axios'; // Import axios for making HTTP requests to backend
import './Register.css' // Import custom CSS for styling the register form

// Define the Register component
const Register = () => {
  // useState hook to store form input values
  const [data, setData] = useState({
    username: '', // store username input
    email: '',    // store email input
    password: '', // store password input
    confirmpassword: '' // store confirm password input
  });

  // Function to handle input changes
  const changeHandler = e => setData({ 
    ...data, // preserve existing state
    [e.target.name]: e.target.value // update the field corresponding to the input's name
  });

  // Function to handle form submission
  const submitHandler = e => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    axios.post('http://localhost:5000/register', data) // Send POST request to backend
      .then(res => alert(res.data)) // Show success message in alert
      .catch(err => alert(err.response.data)); // Show error message in alert if registration fails
  };

  // JSX to render the registration form
  return (
    <div className="auth-container"> {/* Main container for auth form */}
      <form className="auth-form" onSubmit={submitHandler}> {/* Form element */}
        <h2>Register</h2> {/* Form heading */}
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          onChange={changeHandler} 
          required // Make field mandatory
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={changeHandler} 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={changeHandler} 
          required
        />
        <input 
          type="password" 
          name="confirmpassword" 
          placeholder="Confirm Password" 
          onChange={changeHandler} 
          required
        />
        <input type="submit" value="Register" /> {/* Submit button */}
      </form>
    </div>
  );
};

export default Register; // Export the component for use in App.js or other components
