import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

export const fetchUserCounts = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_COUNTS_REQUEST" });

    const token = localStorage.getItem("userToken");
    if (!token) throw new Error("Authentication failed! Please log in again.");

    const { data } = await axiosInstance.get("/userlist");
    // console.log("fetchUserCounts--->",data.data.subadmins.length);
    dispatch({
      type: "FETCH_USER_COUNTS_SUCCESS",
      payload: {
        superadminCount: data.data.superadmins.length,
        adminCount: data.data.admins.length,
        subadminCount: data.data.subadmins.length,
        userCount: data.data.employees.length,
      },
    });
  } catch (error) {
    // console.error(error);
    const errorMessage = error.response?.data?.message || "Failed to fetch user counts";
    dispatch({ type: "FETCH_USER_COUNTS_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};
export const fetchUser = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_REQUEST" });

    const token = localStorage.getItem("userToken");
    if (!token) throw new Error("Authentication failed! Please log in again.");

    const { data } = await axiosInstance.get("/users");
    // console.log("fetchUser->Action",data.data);
    
    dispatch({
      type: "FETCH_USER_SUCCESS",
      payload: {
        subadmins: data.data.subadmins,
        employees: data.data.employees,
      },
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch user counts";
    dispatch({ type: "FETCH_USER_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};
