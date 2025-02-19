const initialState = {
  loading: false,
  code: null,
  error: null,
};

export const codeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GENERATE_CODE_REQUEST":
      return { ...state, loading: true, error: null, code: null };
    case "GENERATE_CODE_SUCCESS":
      return { ...state, loading: false, code: action.payload };
    case "GENERATE_CODE_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
