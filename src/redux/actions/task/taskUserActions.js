import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

// Fetch tasks assigned to the logged-in user
export const fetchUserTasks = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_TASKS_REQUEST" });

    const { data } = await axiosInstance.get("/task/user");
    console.log("Data", data)
    dispatch({ type: "FETCH_USER_TASKS_SUCCESS", payload: data.data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_TASKS_FAIL", payload: error.message });
    toast.error("Failed to fetch assigned tasks!");
  }
};

// Update the status of a task assigned to the logged-in user
export const updateTaskStatus = (taskId, status) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_TASK_STATUS_REQUEST" });

    const { data } = await axiosInstance.put(`/task/status/${taskId}`, { status });

    dispatch({ type: "UPDATE_TASK_STATUS_SUCCESS", payload: data.data });
    toast.success("Task status updated successfully!");
  } catch (error) {
    dispatch({ type: "UPDATE_TASK_STATUS_FAIL", payload: error.message });
    toast.error("Failed to update task status!");
  }
};
