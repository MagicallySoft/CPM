import { combineReducers, createStore, applyMiddleware } from "redux";
import { codeReducer } from "./codeReducer";
import { authReducer } from "./authReducer"; 
import { customerReducer, customFieldReducer,customerReminderReducer } from "./customerReducer";
import { usersReducer } from "./adminReducer";
import { taskReducer } from "./task/taskReducer";
import { taskUserReducer } from "./task/taskUserReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  codes : codeReducer,
  customer: customerReducer,
  customField: customFieldReducer,
  user: usersReducer,
  tasks: taskReducer,
  userTasks: taskUserReducer,
  customerReminder: customerReminderReducer
});


export default rootReducer;
