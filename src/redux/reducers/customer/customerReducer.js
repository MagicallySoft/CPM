// ✅ Customer Reducer
const customerInitialState = {
  loading: false,
  customers: [],
  pagination: { page: 1, totalPages: 1, totalItems: 0, limit: 10 },
  error: null,
};

export const customerReducer = (state = customerInitialState, action) => {
  
  
  switch (action.type) {
    case "FETCH_CUSTOMERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_CUSTOMERS_SUCCESS":
      return {
        ...state,
        loading: false,
        customers: action.payload.customers,
        pagination: action.payload.pagination || { page: 1, totalPages: 1, totalItems: 0, limit: 10 },
      };
    case "FETCH_CUSTOMERS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "ADD_CUSTOMER_REQUEST":
      return { ...state, loading: true, success: false, error: null };
    case "ADD_CUSTOMER_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "ADD_CUSTOMER_FAIL":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case "UPDATE_CUSTOMER_REQUEST":
      return { ...state, loading: true, success: false, error: null };
    case "UPDATE_CUSTOMER_SUCCESS":
      return {
        ...state,
        loading: false,
        customers: state.customers.map((customer) =>
          customer._id === action.payload?._id ? action.payload : customer
        ),
      };
    case "UPDATE_CUSTOMER_FAIL":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case "DELETE_CUSTOMER_SUCCESS":
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload
        ),
      };
    default:
      return state;
  }

};
