const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
  
  export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_TASKS_REQUEST":
      case "CREATE_TASK_REQUEST":
      case "UPDATE_TASK_REQUEST":
      case "DELETE_TASK_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "FETCH_TASKS_SUCCESS":
        return { ...state, loading: false, tasks: action.payload };
  
      case "CREATE_TASK_SUCCESS":
        return { ...state, loading: false, tasks: [...state.tasks, action.payload] };
  
      case "UPDATE_TASK_SUCCESS":
        return {
          ...state,
          loading: false,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
        };
  
      case "DELETE_TASK_SUCCESS":
        return {
          ...state,
          loading: false,
          tasks: state.tasks.filter((task) => task._id !== action.payload),
        };
  
      case "FETCH_TASKS_FAIL":
      case "CREATE_TASK_FAIL":
      case "UPDATE_TASK_FAIL":
      case "DELETE_TASK_FAIL":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  