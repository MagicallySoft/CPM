import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

// ✅ Add Customer
export const addCustomer = (customerData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_CUSTOMER_REQUEST" });

    const { data } = await axiosInstance.post("/customer/customer", customerData);
    console.log("Responce", data)
    dispatch({ type: "ADD_CUSTOMER_SUCCESS", payload: data.data });

    toast.success(data.message || "Customer added successfully!");
    return Promise.resolve();
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";

    dispatch({ type: "ADD_CUSTOMER_FAIL", payload: errorMessage });
    toast.error(errorMessage);

    return Promise.reject();
  }
};

// ✅ Search Customers with Pagination
export const searchCustomer = (searchQuery, page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_CUSTOMERS_REQUEST" });
    const { data } = await axiosInstance.get("/customer/customer", {
      params: { ...searchQuery, page, limit },
    });
    
    // Assuming response structure: data.data = { customers, total, page, limit }
    const totalItems = data.data.total;
    const totalPages = Math.ceil(totalItems / limit);
    
    const pagination = {
      totalItems,
      totalPages,
      page: data.data.page,
      limit: data.data.limit,
    };
    
    dispatch({
      type: "FETCH_CUSTOMERS_SUCCESS",
      payload: {
        customers: data.data.customers,
        pagination,
      },
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    dispatch({ type: "FETCH_CUSTOMERS_FAIL", payload: errorMessage });
  }
};

// ✅ Delete Customer
export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/customer/customer/${customerId}`);
    
    dispatch({ type: "DELETE_CUSTOMER_SUCCESS", payload: customerId });
    toast.success("Customer deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete";
    
    dispatch({ type: "DELETE_CUSTOMER_FAIL", payload: errorMessage });
    toast.error(errorMessage);
    
    throw error;
  }
};

// ✅ Update Customer
export const updateCustomer = (customerId, customerData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CUSTOMER_REQUEST" });

    const { data } = await axiosInstance.put(`/customer/customer/${customerId}`, customerData);
    // console.log(data.data);
    
    dispatch({
      type: "UPDATE_CUSTOMER_SUCCESS",
      payload: data.data,
    });

    toast.success(data.message || "Customer updated successfully!");
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed";

    dispatch({ type: "UPDATE_CUSTOMER_FAIL", payload: errorMessage });
    toast.error(errorMessage);

    throw error;
  }
};

// ✅ Add Custom Field
export const addCustomField = (fieldData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_CUSTOM_FIELD_REQUEST" });

    const { data } = await axiosInstance.post("/customer/customfield", fieldData);

    dispatch({ type: "ADD_CUSTOM_FIELD_SUCCESS", payload: data.data });

    toast.success(data.message || "Custom field added successfully!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";

    dispatch({ type: "ADD_CUSTOM_FIELD_FAIL", payload: errorMessage });
    toast.error(errorMessage);
  }
};

// ✅ Get Custom Fields
export const getCustomFields = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_CUSTOM_FIELDS_REQUEST" });

    const { data } = await axiosInstance.get("/customer/customfield");
    // console.log("getCustomFields--->\n",data);
    
    dispatch({ type: "FETCH_CUSTOM_FIELDS_SUCCESS", payload: data.data });
  } catch (error) {
    dispatch({
      type: "FETCH_CUSTOM_FIELDS_FAIL",
      payload: error.response?.data?.message || "Failed to fetch fields",
    });
  }
};

// ✅ Update Custom Field
export const updateCustomField = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CUSTOM_FIELD_REQUEST" });

    const { data } = await axiosInstance.put(`/customer/customfield/${id}`, updatedData);

    dispatch({ type: "UPDATE_CUSTOM_FIELD_SUCCESS", payload: data.data });

    toast.success(data.message || "Custom field updated successfully!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Update failed";

    dispatch({ type: "UPDATE_CUSTOM_FIELD_FAILURE", payload: errorMessage });
    toast.error(errorMessage);
  }
};

// ✅ Delete Custom Field
export const deleteField = (fieldId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/customer/customfield/${fieldId}`);

    dispatch({ type: "DELETE_FIELD_SUCCESS", payload: fieldId });
    toast.success("Custom field deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete";

    dispatch({ type: "DELETE_FIELD_FAIL", payload: errorMessage });
    toast.error(errorMessage);

    throw error;
  }
};

// ✅ 
export const fetchReminders = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_CUSTOMERS_REMINDER_REQUEST" });

    const { data } = await axiosInstance.get("/customer/customer/product", {
      params: { ...searchQuery },
    });
    // console.log(data);
    
    // Update: API response returns data.data.products, not customers.
    const transformedReminders = data.data.products;
    // console.log(transformedReminders);
    
    dispatch({
      type: "FETCH_CUSTOMERS_REMINDER_SUCCESS",
      payload: transformedReminders,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";
    dispatch({ type: "FETCH_CUSTOMERS_REMINDER_FAIL", payload: errorMessage });
  }
};


export const deleteReminder = (fieldId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/customer/customfield/${fieldId}`);

    dispatch({ type: "DELETE_FIELD_SUCCESS", payload: fieldId });
    toast.success("Custom field deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete";

    dispatch({ type: "DELETE_FIELD_FAIL", payload: errorMessage });
    toast.error(errorMessage);

    throw error;
  }
};

// ✅ import Customer Data
export const importCustomersAction = (customerData) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_CUSTOMER_REQUEST" });

    const { data } = await axiosInstance.post("/customer/importcustomers", customerData);
    // console.log("Responce", data)
    dispatch({ type: "ADD_CUSTOMER_SUCCESS", payload: data.data });

    toast.success(data.message || "Customer added successfully!");
    return Promise.resolve();
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong";

    dispatch({ type: "ADD_CUSTOMER_FAIL", payload: errorMessage });
    toast.error(errorMessage);

    return Promise.reject();
  }
};