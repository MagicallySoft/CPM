import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

// Admin Registration Action
export const registerAdmin = (adminData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_ADMIN_REQUEST" });
    const { data } = await axiosInstance.post("/auth/registeradmin", adminData);
    dispatch({ type: "REGISTER_ADMIN_SUCCESS", payload: data });
    toast.success("Admin registration successful!");
    navigate("/login"); // Redirect after registration
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Admin registration failed";
    dispatch({ type: "REGISTER_ADMIN_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};

// Staff Registration Action
export const registerStaff = (staffData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_STAFF_REQUEST" });
    const { data } = await axiosInstance.post("/auth/register", staffData);
        
    dispatch({ type: "REGISTER_STAFF_SUCCESS", payload: data });
    toast.success("Staff registration successful!");
    navigate("/login"); // Redirect after registration
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Staff registration failed";
    dispatch({ type: "REGISTER_STAFF_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await axiosInstance.post("/auth/login", credentials);
    console.log(data);

    let token = data?.data?.token;
    let user = data?.data?.userData;

    if (token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });

      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login successfull!");
      navigate("/");
    } else {
      dispatch({ type: "LOGIN_FAIL", payload: "Invalid credentials" });
      toast.error("Invalid email or password.");
      // console.log("Invalid email or password.");
    }
  } catch (error) {
    // console.log("Login Error:", error);

    let errorMessage = "Login failed";

    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = error.response.data?.message || "User not found!";
      } else if (error.response.status === 401) {
        errorMessage = "Invalid email or password!";
      } else {
        errorMessage = error.response.data?.message || "Something went wrong.";
      }
    }

    dispatch({ type: "LOGIN_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};

export const logoutUser = () => async (dispatch, navigate) => {
  try {
    // const data = await axiosInstance.post("/auth/logout");
    
    // Remove token and user data from local storage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");

    // Remove default Authorization header from axios
    delete axiosInstance.defaults.headers.common["Authorization"];
    
    console.log(data);

    dispatch({ type: "LOGOUT" });
    navigate("/login");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed";
    toast.error(errorMessage);
  }
};


export const setUserFromLocalStorage = (userData) => {
  return {
    type: "SET_USER_FROM_LOCAL_STORAGE",
    payload: userData,
  };
};
