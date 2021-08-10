import React, { createContext, useReducer, useEffect, useContext } from "react";
import { getUserMe } from "../../api/user.api";
import AuthReducer from "./AuthReducer";

const initialState = {
  userInfo: {
    username: "",
    email: "",
  },
  isLoggedIn: false,
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

  useEffect(() => {
    async function handleGetMyInfo() {
      try {
        const res = await getUserMe();
        saveUserAuth(res.data);
      } catch {}
    }

    const storedAuth = localStorage.getItem("AuthState");
    if (!JSON.parse(storedAuth).isLoggedIn) {
      handleGetMyInfo();
    }
  }, []);

  // actions
  function saveUserAuth(userData) {
    dispatch({
      type: "SAVE_USER_AUTH",
      payload: { userData },
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
