import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_TASKS_REQUEST" });

    const { data } = await axiosInstance.get("/task/admin");
    // console.log("From ACTION" ,data)
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data.data });
  } catch (error) {
    dispatch({ type: "FETCH_TASKS_FAIL", payload: error.message });
    toast.error("Failed to fetch tasks!");
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_TASK_REQUEST" });

    const { data } = await axiosInstance.post("/task", taskData);
    // console.log(data)
    dispatch({ type: "CREATE_TASK_SUCCESS", payload: data.data });
    toast.success("Task created successfully!");
  } catch (error) {
    dispatch({ type: "CREATE_TASK_FAIL", payload: error.message });
    toast.error("Failed to create task!");
  }
};

export const updateTask = (taskId, updates) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_TASK_REQUEST" });

    const { data } = await axiosInstance.put(`/tasks/${taskId}`, updates);

    dispatch({ type: "UPDATE_TASK_SUCCESS", payload: data.data });
    toast.success("Task updated successfully!");
  } catch (error) {
    dispatch({ type: "UPDATE_TASK_FAIL", payload: error.message });
    toast.error("Failed to update task!");
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_TASK_REQUEST" });

    await axiosInstance.delete(`/task/${taskId}`);

    dispatch({ type: "DELETE_TASK_SUCCESS", payload: taskId });
    toast.success("Task deleted successfully!");
  } catch (error) {
    dispatch({ type: "DELETE_TASK_FAIL", payload: error.message });
    toast.error("Failed to delete task!");
  }
};

