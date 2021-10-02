import React, { createContext, useReducer } from "react";

const authContext = createContext();

const reducerfunc = (state, action) => {
  const { type, payload } = action;
};

const initstate = {};

const AuthProvider = ({ children }) => {
  const { state, dispatch } = useReducer(reducerfunc, initstate);

  return <authContext.Provider>{children}</authContext.Provider>;
};

export { AuthProvider, authContext };
