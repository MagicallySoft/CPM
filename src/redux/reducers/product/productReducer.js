const initialState = {
  loading: false,
  productDetails: [],
  error: null,
};

export const productDetailsReducer = (state = initialState, action) => {
  
  
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { ...state, loading: true, error: null };
    case "PRODUCT_DETAILS_SUCCESS":
      return { ...state, loading: false, productDetails: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
