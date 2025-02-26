// contexts/LogoutContext.js

import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/auth/authActions";

// Create a context
const LogoutContext = createContext();

// Custom hook to use LogoutContext
export const useLogout = () => useContext(LogoutContext);

// Provider component that wraps the application with the logout context
export const LogoutProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
      dispatch(logoutUser(navigate));
      navigate("/login");
  };

  return (
    <LogoutContext.Provider value={logout}>
      {children}
    </LogoutContext.Provider>
  );
};
