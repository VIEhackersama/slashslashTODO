"use client";

import axios from "axios";

// Base instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // allow refresh_token cookie
});

// Add interceptor for auto refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    // If token expired → try refresh
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const refreshRes = await axios.post(
          "http://localhost:3000/api/users/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;

        // Save new access token
        localStorage.setItem("accessToken", newAccessToken);

        // Attach to retry request
        originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalReq); // retry
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;
