import { combineReducers, createStore, applyMiddleware } from "redux";
import { usersReducer } from "./auth/adminReducer";
import { codeReducer } from "./auth/codeReducer";
import { authReducer } from "./auth/authReducer"; 
import { customerReducer } from "./customer/customerReducer";
import { customFieldReducer } from "./customer/customFieldReducer";
import { customerReminderReducer } from "./customer/customerReminder";
import { taskReducer } from "./task/taskReducer";
import { taskUserReducer } from "./task/taskUserReducer";
import { productDetailsReducer } from "./product/productReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  codes : codeReducer,
  customer: customerReducer,
  customField: customFieldReducer,
  user: usersReducer,
  tasks: taskReducer,
  userTasks: taskUserReducer,
  customerReminder: customerReminderReducer,
  product: productDetailsReducer
});


export default rootReducer;
