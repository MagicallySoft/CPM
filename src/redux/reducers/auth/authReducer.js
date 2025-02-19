const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("userData")) || null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Admin Registration Cases
    case "REGISTER_ADMIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_ADMIN_SUCCESS":
      return { ...state, loading: false, error: null };
    case "REGISTER_ADMIN_FAIL":
      return { ...state, loading: false, error: action.payload };

    // Staff Registration Cases
    case "REGISTER_STAFF_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_STAFF_SUCCESS":
      return { ...state, loading: false, error: null };
    case "REGISTER_STAFF_FAIL":
      return { ...state, loading: false, error: action.payload };

    // Login actions
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, error: null };
    case "SET_USER_FROM_LOCAL_STORAGE":
      return { ...state, user: action.payload };
    // Default case
    default:
      return state;
  }
};
