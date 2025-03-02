import axios from "axios";
import { logoutUser } from "../redux/actions/auth/authActions";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import JWT decoder

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8051/api",
  baseURL: "https://cpm-seven.vercel.app/api",
});

// Request Interceptor: Check token expiry before sending requests
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("userToken");

    if (!token && !config.url.includes("/auth/login")) {
      const reduxStoreModule = await import("../redux/store");
          const store = reduxStoreModule.default;
          store.dispatch(logoutUser());
      // Here you could either use a helper to dispatch logout or simply reject
      return Promise.reject(new Error("No token found"));
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp < Date.now() / 1000;

        if (isExpired) {
          // Clear storage and redirect
          localStorage.removeItem("userToken");
          localStorage.removeItem("userData");
          delete axiosInstance.defaults.headers.common["Authorization"];

          // Optional: Redirect with query param for login page toast
          // window.location.href = "/login";
          const reduxStoreModule = await import("../redux/store");
          const store = reduxStoreModule.default;
          store.dispatch(logoutUser());

          // Abort the request
          return Promise.reject(new Error("Token expired"));
        }
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem("userToken");
        return Promise.reject(error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);



axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the error status is 401 (Unauthorized)
    if (error.response?.status === 401) {
      // Check if the request URL does NOT include '/auth/login'
      // (i.e. ignore the login request errors to let the login action handle them)
      if (!error.config?.url.includes("/auth/login")) {
        // For non-login endpoints (like token expiry), perform logout actions
        const reduxStoreModule = await import("../redux/store");
        const store = reduxStoreModule.default;

        if (store?.dispatch) {
          console.log("store", store);
          
          store.dispatch(logoutUser());
        }
        console.log("Not store", store);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        delete axiosInstance.defaults.headers.common["Authorization"];

        // toast.error("Session expired. Please log in again.");
        store.dispatch(logoutUser());
        // window.location.href = "/login"; //should not refresh page

        // Reject the error after handling it
        return Promise.reject(error);
      }
      // If the URL includes "/auth/login", let the error propagate without redirection
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
