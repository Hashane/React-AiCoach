import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [conversationId, setConversationId] = useState<number | null>(null);

  // Load conversationId from localStorage or backend if necessary
  useEffect(() => {
    const savedId = localStorage.getItem("conversationId");
    if (savedId) {
      setConversationId(parseInt(savedId, 10));
    }
  }, []);

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            🧠 AI Coach
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar + Chat in flex row */}
      <div className="d-flex flex-grow-1">
        {/* Pass conversationId and setConversationId to Sidebar */}
        <Sidebar
          onSelect={(id) => {
            setConversationId(id);
            localStorage.setItem("conversationId", String(id));
          }}
          activeId={conversationId}
        />

        <div className="flex-grow-1 pt-3 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Chat
                    conversationId={conversationId}
                    setConversationId={setConversationId}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
