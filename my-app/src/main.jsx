import { StrictMode } from "react"; // Import StrictMode to help detect potential problems in the app
import { createRoot } from "react-dom/client"; // Import createRoot to render the app in React 18+
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for client-side routing
import "./index.css"; // Import global CSS for the project
import App from "./App.jsx"; // Import the main App component

// Get the root element from the HTML where the React app will be mounted
createRoot(document.getElementById("root")).render(
  <StrictMode> {/* Wrap the app in StrictMode for highlighting potential issues */}
    <BrowserRouter> {/* Wrap the app in BrowserRouter to enable routing */}
      <App /> {/* Render the main App component */}
    </BrowserRouter>
  </StrictMode>
);
