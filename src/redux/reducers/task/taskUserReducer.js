const initialState = {
    userTasks: {
      Pending: [],
      InProgress: [],
      Completed: []
    },
    loading: false,
    error: null
  };
  
  export const taskUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USER_TASKS_REQUEST":
      case "UPDATE_TASK_STATUS_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "FETCH_USER_TASKS_SUCCESS":
        return { ...state, loading: false, userTasks: action.payload };
  
      case "UPDATE_TASK_STATUS_SUCCESS":
        const updatedTask = action.payload;
        const updatedUserTasks = { ...state.userTasks };
  
        // Remove task from previous status group
        for (const status in updatedUserTasks) {
          updatedUserTasks[status] = updatedUserTasks[status].filter(task => task._id !== updatedTask._id);
        }
  
        // Add task to new status group
        if (updatedUserTasks[updatedTask.status]) {
          updatedUserTasks[updatedTask.status].push(updatedTask);
        } else {
          updatedUserTasks[updatedTask.status] = [updatedTask];
        }
  
        return { ...state, loading: false, userTasks: updatedUserTasks };
  
      case "FETCH_USER_TASKS_FAIL":
      case "UPDATE_TASK_STATUS_FAIL":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  