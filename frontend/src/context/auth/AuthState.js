import React, { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  authName: "",
  authToken: "",
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("AuthState");
      return storedAuth ? JSON.parse(storedAuth) : initialState;
    } else {
      return initialState;
    }
  });

  // save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("AuthState", JSON.stringify(state));
    }
  }, [state]);

  // actions
  function saveUserAuth(userData) {
    dispatch({
      type: "SAVE_USER_AUTH",
      payload: userData,
    });
  }

  function clearUserAuth() {
    dispatch({
      type: "CLEAR_USER_AUTH",
      payload: null,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        authName: state.authName,
        authToken: state.authToken,
        saveUserAuth,
        clearUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
