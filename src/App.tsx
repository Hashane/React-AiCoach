import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import api from "./services/axios";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const { isAuthenticated, userName, logout, checkAuth } = useAuth();

  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, how can I assist you?" },
  ]);
  const [refreshConversations, setRefreshConversations] = useState(false);

  useEffect(() => {
    checkAuth();
    const savedId = localStorage.getItem("conversationId");
    if (savedId) {
      setConversationId(parseInt(savedId, 10));
    }
  }, [checkAuth]);

  const handleLogout = async () => {
    await logout();
  };

  if (isLoginPage) {
    return <Login />;
  }

  const startNewChat = () => {
    setMessages([]);
    setConversationId(null);
    localStorage.removeItem("conversationId");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
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
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Welcome, {userName}</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        {isAuthenticated && (
          <Sidebar
            onSelect={(id) => {
              setConversationId(id);
              localStorage.setItem("conversationId", String(id));
            }}
            activeId={conversationId}
            startNewChat={startNewChat}
            refreshConversations={refreshConversations}
          />
        )}

        <div className="flex-grow-1 pt-3 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Chat
                    conversationId={conversationId}
                    setConversationId={setConversationId}
                    setMessages={setMessages}
                    messages={messages}
                    userName={userName}
                    setRefreshConversations={setRefreshConversations}
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
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;
