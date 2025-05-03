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
        qs.stringify({ username: username, password: password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Set Content-Type to URL-encoded for login
          },
        }
      );

      // Save token to localStorage (if not using HttpOnly cookie)
      localStorage.setItem("access_token", response.data.access_token);

      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <form
        onSubmit={handleLogin}
        className="bg-secondary p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control bg-dark text-white border-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-outline-light w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
