const initialState = {
  loading: false,
  productDetails: [],
  products: [],
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
    case "FETCH_PRODUCT_REQUEST":
    case "UPDATE_PRODUCT_REQUEST":
    case "DELETE_PRODUCT_REQUEST":
      return { ...state, loading: true, error: null };

    case "PRODUCT_DETAILS_SUCCESS":
      return { ...state, loading: false, productDetails: action.payload };

    case "FETCH_PRODUCT_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: state.products.filter((product) => product.id !== action.payload),
      };

    case "PRODUCT_DETAILS_FAIL":
    case "FETCH_PRODUCT_FAIL":
    case "UPDATE_PRODUCT_FAIL":
    case "DELETE_PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
