import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "http://localhost:8000", // backend URL
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
  (response) => response, // If request is successful, return response
  async (error) => {
    const originalRequest = error.config;

    // If the response status is 401 (Unauthorized) and the retry flag is not set
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const res = await api.post("/auth/refresh"); // Cookie auto sent
        console.log(res.data.token);
        const newToken = res.data.token;

        // Save the new token and retry the original request
        localStorage.setItem("access_token", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return api(originalRequest); // Retry the failed request with new token
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // Redirect to login on refresh failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject the promise if there's an error
  }
);

export default api;
