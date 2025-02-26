import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  // console.log("element",element)
  // console.log("allowedRoles",allowedRoles)
  // console.log("user",user)
  
  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no allowedRoles are specified, allow all logged-in users
  if (!allowedRoles || allowedRoles.length === 0) {
    return element;
  }

  // If user role is not in allowedRoles, redirect to home
  // console.log("---------------->", allowedRoles.includes(user.role));
  
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
