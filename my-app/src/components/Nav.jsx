import React from 'react'; // Import React library to use JSX and component features
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to create client-side navigation links
import './Nav.css'; // Import custom CSS file for styling the Navbar

// Define the Nav component, receiving props `token` and `setToken` from parent (App.js)
const Nav = ({ token, setToken }) => {
  return (
    <nav className="navbar"> {/* Main navbar container */}
      <div className="navbar-logo">MINIMART🛒</div> {/* Logo / brand name of the site */}
      
      {!token ? (  // If user is not logged in (no token)
        <ul className="navbar-links"> {/* Container for navigation links */}
          <Link to="/register"><li>Register</li></Link> {/* Link to Register page */}
          <Link to="/login"><li>Login</li></Link> {/* Link to Login page */}
        </ul>
      ) : (  // If user is logged in (token exists)
        <ul className="navbar-links"> {/* Container for navigation links for logged-in users */}
          <Link to="/"><li>Products</li></Link> {/* Link to Products page */}
          <Link to="/myprofile"><li>Profile</li></Link> {/* Link to Profile page */}
          <li className="logout-btn" 
              onClick={() => { 
                setToken(null); // Clear token state in parent App component
                localStorage.removeItem('token'); // Remove token from localStorage so user stays logged out
              }}>
            Logout {/* Button that logs out the user */}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav; // Export the Nav component so it can be used in other files (e.g., App.js)
