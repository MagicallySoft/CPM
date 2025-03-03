import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

//✅ Action to fetch product details with an optional search parameter
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


// ✅ Get Custom Fields
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PRODUCT_REQUEST" });

    const { data } = await axiosInstance.get("/customer/customer/product", {
      params: { customerId, adminId },
    });
    
    dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: data.data });
  } catch (error) {
    dispatch({
      type: "FETCH_PRODUCT_FAIL",
      payload: error.response?.data?.message || "Failed to fetch fields",
    });
  }
};

// ✅ Update Product
export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const { data } = await axiosInstance.put(`/customer/customer/product/${productId}`, productData);
    // console.log(data.data);
    
    dispatch({
      type: "UPDATE_PRODUCT_SUCCESS",
      payload: data.data,
    });

    toast.success(data.message || "Product updated successfully!");
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed";

    dispatch({ type: "UPDATE_PRODUCT_FAIL", payload: errorMessage });
    toast.error(errorMessage);

    throw error;
  }
};

// ✅ Delete Product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    // console.log("productId", productId);
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });
    await axiosInstance.delete(`/customer/customer/product/${productId}`);
    
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: productId });
    toast.success("Product deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete";
    
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: errorMessage });
    toast.error(errorMessage);
    
    throw error;
  }
};