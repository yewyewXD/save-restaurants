import React, { createContext, useReducer, useEffect, useContext } from "react";
import { logoutUser } from "../../api/auth.api";
import AuthReducer from "./AuthReducer";
import serialize from "serialize-javascript";

const initialState = {
  userInfo: {
    username: "",
  },
  isLoggedIn: false,
  expiry: 0,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const storedAuthState = localStorage.getItem("AuthState");

      if (!storedAuthState) {
        return initialState;
      }

      const parsedAuthState = JSON.parse(storedAuthState);
      if (new Date().getTime() > parsedAuthState.expiry) {
        localStorage.removeItem("AuthState");
        return initialState;
      } else {
        return parsedAuthState;
      }
    } else {
      return initialState;
    }
  });

  // save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("AuthState", serialize(state, { isJSON: true }));
    }
  }, [state]);

  // actions
  function saveUserAuth(response) {
    dispatch({
      type: "SAVE_USER_AUTH",
      payload: response,
    });
  }

  async function clearUserAuth() {
    await logoutUser();

    dispatch({
      type: "CLEAR_USER_AUTH",
      payload: null,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn,
        saveUserAuth,
        clearUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const { userInfo, isLoggedIn, saveUserAuth, clearUserAuth } =
    useContext(AuthContext);

  return { userInfo, isLoggedIn, saveUserAuth, clearUserAuth };
}
