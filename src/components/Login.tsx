import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import qs from "qs";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/token",
        qs.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("access_token", response.data.access_token);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <form
        onSubmit={handleLogin}
        className="p-4 rounded shadow-lg w-100"
        style={{
          maxWidth: "400px",
          backgroundColor: "#1f2937",
          border: "1px solid #2d3748",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#fbbf24" }}>
          AI Coach Login
        </h3>

        <div className="mb-3">
          <label className="form-label text-muted">Username</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            style={{
              borderColor: "#4b5563",
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-muted">Password</label>
          <input
            type="password"
            className="form-control bg-dark text-white border-secondary"
            style={{
              borderColor: "#4b5563",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: "#fbbf24",
            color: "#1f2937",
            fontWeight: 600,
            border: "none",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
