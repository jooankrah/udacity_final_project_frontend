import React from "react";
import { userReducer } from "../reducers/UserReducer";

const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const initstate = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };

  const [state, dispatch] = React.useReducer(userReducer, initstate);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
