const customerReminderInitialState = {
    loading: false,
    reminders: [],
    error: null,
  };
  
  export const customerReminderReducer = (state = customerReminderInitialState, action) => {
  
    switch (action.type) {
      case "FETCH_CUSTOMERS_REMINDER_REQUEST":
        return { ...state, loading: true };
      case "FETCH_CUSTOMERS_REMINDER_SUCCESS":
        return {
          // ...state,
          loading: false,
          reminders: action.payload
        };
      case "FETCH_CUSTOMERS_REMINDER_FAIL":
        return { ...state, loading: false, error: action.payload.customers };
      case "DELETE_CUSTOMER_REMINDER_SUCCESS":
        return {
          ...state,
          reminders: state.customers.filter((customer) => customer._id !== action.payload),
        };
      default:
        return state;
    }
  };
  