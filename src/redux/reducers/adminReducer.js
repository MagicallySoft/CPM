const initialState = {
  superadminCount: 0,
  adminCount: 0,
  userCount: 0,
  subadminCount:0,
  subadmins: [], 
  employees: [], 
  loadingUsers: false,
  error: null,
};

export const usersReducer = (state = initialState, action) => {
  // console.log("Reducer",action.payload);
  
  switch (action.type) {
    case "FETCH_USER_COUNTS_REQUEST":
    case "FETCH_USER_REQUEST":
      return { ...state, loadingUsers: true, error: null };

    case "FETCH_USER_COUNTS_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        superadminCount: action.payload.superadminCount,
        adminCount: action.payload.adminCount,
        subadminCount: action.payload.subadminCount,
        userCount: action.payload.userCount,
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        subadmins: action.payload.subadmins,
        employees: action.payload.employees,
      };

    case "FETCH_USER_COUNTS_FAIL":
    case "FETCH_USER_FAIL":
      return { ...state, loadingUsers: false, error: action.payload };

    default:
      return state;
  }

  
  
};
