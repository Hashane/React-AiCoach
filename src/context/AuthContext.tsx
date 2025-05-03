// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  login: (token: string, username: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsAuthenticated(false);
      setUserName("");
      return;
    }

    try {
      const res = await api.get("/auth/users/me");
      setIsAuthenticated(true);
      setUserName(res.data.username);
    } catch (error) {
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, username: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setUserName(username);
    navigate("/");
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
      setUserName("");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userName, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
