// import axios from "axios";
// import { loginUser, logoutUser } from "./actions/authActions";

// // Function to verify the token
// const verifyToken = async (token, dispatch) => {
//   try {
//     const { data } = await axios.get("https://cpm-api.vercel.app/api/users/verify-token", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (data.valid) {
//       // Token is valid, keep user logged in
//       dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
//     } else {
//       // Token is invalid, log the user out
//       dispatch(logoutUser());
//     }
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     dispatch(logoutUser());
//   }
// };

// // Check token on app start
// const token = localStorage.getItem("userToken");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   verifyToken(token, store.dispatch);
// }


import axiosInstance from "./axiosInstance";
import { store } from "../redux/store";
import { logoutUser } from "../redux/actions/authActions";

const token = localStorage.getItem("userToken");

if (token) {
  axiosInstance
    .get("/users/verify-token")
    .then((response) => {
      if (!response.data.valid) {
        store.dispatch(logoutUser());
      }
    })
    .catch(() => {
      store.dispatch(logoutUser());
    });
}
