// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ element }) => {
//   const user = JSON.parse(localStorage.getItem("userData")); // Get user from localStorage

//   return user ? element : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  
  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no allowedRoles are specified, allow all logged-in users
  if (!allowedRoles || allowedRoles.length === 0) {
    return element;
  }

  // If user role is not in allowedRoles, redirect to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
