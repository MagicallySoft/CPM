import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DashboardLayout from "./components/Nevigation/DashboardLayout"; //
import Home from "./components/Home";
// import Login from "./components/auth/Login";
import Signin from "./views/auth/signin/SignIn"
// import Register from "./components/auth/Register";
import SignUp from "./views/auth/signup/SignUp.jsx";
import GenerateCode from "./components/auth/GenerateCode";
import ClientForm from "./components/customerForm/ClientForm";
import ClientList from "./components/customer/ClientList";
import ReminderList from "./components/customer/reminderList";
import AdminCustomFieldsList from "./components/customerForm/AdminCustomFieldsList";
import PrivateRoute from "./utils/PrivateRoute";
import TaskManagement from "./components/task/TaskManagement";
import TaskList from "./components/task/TaskList";
import Userlist from "./components/employee/employeeList";
import UserTasks from "./components/task/UserTasks";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";
 
  
  return hideLayout ? (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/login" element={<Signin />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  ) : (
    <DashboardLayout>
      <Routes>
        <Route path="/generateCode" element={<PrivateRoute element={<GenerateCode />} allowedRoles={["admin", "superadmin"]} />} />
        <Route path="/clientform" element={<PrivateRoute element={<ClientForm />} allowedRoles={["admin", "superadmin"]} />} />
        <Route path="/client" element={<PrivateRoute element={<ClientList />} allowedRoles={["employee", "admin", "superadmin"]} />} />
        <Route path="/reminder" element={<PrivateRoute element={<ReminderList />} allowedRoles={["employee", "admin", "superadmin"]} />} />
        <Route path="/customfield" element={<PrivateRoute element={<AdminCustomFieldsList />} allowedRoles={["admin", "superadmin"]} />} />
        <Route path="/taskslist" element={<PrivateRoute element={<UserTasks />} allowedRoles={["employee"]} />} />
        <Route path="/task" element={<PrivateRoute element={<TaskManagement />} allowedRoles={["admin", "superadmin"]} />} />
        <Route path="/tasklist" element={<PrivateRoute element={<TaskList />} allowedRoles={["admin", "superadmin"]} />} />
        <Route path="/emlpoyeelist" element={<PrivateRoute element={<Userlist />} allowedRoles={["admin", "superadmin"]} />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;
