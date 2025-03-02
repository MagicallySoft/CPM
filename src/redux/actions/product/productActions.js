import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

// Action to fetch product details with an optional search parameter
export const listProductDetails = (searchTerm = "") => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const { data } = await axiosInstance.get("/customer/productDetail", {
      params: { search: searchTerm },
    });
    dispatch({
      type: "PRODUCT_DETAILS_SUCCESS",
      payload: data.data, // API response: { data: [...] }
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};
