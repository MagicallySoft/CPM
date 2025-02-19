import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

export const generateCode_ = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "GENERATE_CODE_REQUEST" });

    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("Authentication failed! Please login again.");
    }

    const { data } = await axiosInstance.post("/auth/generatecode", payload);
    dispatch({ type: "GENERATE_CODE_SUCCESS", payload: data.data.code });
    toast.success(data.message || "Registration code generated successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to generate code";
    dispatch({ type: "GENERATE_CODE_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};
