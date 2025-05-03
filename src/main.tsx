import { AuthProvider } from "./context/AuthContext";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
