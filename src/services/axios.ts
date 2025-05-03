import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE_URL;

// Base API instance
const api = axios.create({
  baseURL: apiBase, // backend URL
  withCredentials: true, // needed for httpOnly cookies
  headers: {
    "Content-Type": "application/json", // Ensuring JSON is sent
  },
});

// Request interceptor: Attach access token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Attach token if exists
  }
  return config;
});

// Response interceptor: Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid retrying if the original request was to /auth/refresh
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token using cookie
        const res = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });

        const newToken = res.data.token;
        localStorage.setItem("access_token", newToken);

        // Apply token to all future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
