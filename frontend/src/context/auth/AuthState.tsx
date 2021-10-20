import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  FC,
} from "react";
import { logoutUser } from "../../api/auth.api";
import AuthReducer from "./AuthReducer";
import serialize from "serialize-javascript";
import { IAuthContextState, IAuthResponse } from "./types";

const initialState: IAuthContextState = {
  userInfo: {
    username: "",
  },
  isLoggedIn: false,
  expiry: 0,

  saveUserAuth: Function,
  clearUserAuth: Function,
};

export const AuthContext = createContext<IAuthContextState>(initialState);

export const AuthContextProvider: FC = ({ children }) => {
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
  function saveUserAuth(response: IAuthResponse): void {
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
        expiry: state.expiry,
        saveUserAuth,
        clearUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextState {
  const { userInfo, expiry, isLoggedIn, saveUserAuth, clearUserAuth } =
    useContext(AuthContext);

  return { userInfo, isLoggedIn, expiry, saveUserAuth, clearUserAuth };
}
