import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Fixed path (added /)
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* App.jsx will handle the BrowserRouter and all logic */}
      <App />
    </AuthProvider>
  </StrictMode>
);