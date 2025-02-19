// ✅ Custom Field Reducer
const customFieldInitialState = {
  loading: false,
  customFields: [],
  error: null,
};

export const customFieldReducer = (state = customFieldInitialState, action) => {
  switch (action.type) {
    case "ADD_CUSTOM_FIELD_REQUEST":
    case "FETCH_CUSTOM_FIELDS_REQUEST":
    case "UPDATE_CUSTOM_FIELD_REQUEST":
      return { ...state, loading: true };
    case "ADD_CUSTOM_FIELD_SUCCESS":
      return {
        ...state,
        loading: false,
        customFields: [...state.customFields, action.payload],
      };
    case "FETCH_CUSTOM_FIELDS_SUCCESS":
      return { ...state, loading: false, customFields: action.payload };
    case "UPDATE_CUSTOM_FIELD_SUCCESS":
      return {
        ...state,
        loading: false,
        customFields: state.customFields.map((field) =>
          field._id === action.payload._id ? action.payload : field
        ),
      };
    case "DELETE_FIELD_SUCCESS":
      return {
        ...state,
        customFields: state.customFields.filter(
          (field) => field._id !== action.payload
        ),
      };
    case "ADD_CUSTOM_FIELD_FAIL":
    case "FETCH_CUSTOM_FIELDS_FAIL":
    case "UPDATE_CUSTOM_FIELD_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
