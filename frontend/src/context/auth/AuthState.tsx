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
import { getStorageAuthState } from "../../utils/authState.utils";

interface authContextState {
  userInfo: {
    username: string;
  };
  isLoggedIn: boolean;
  expiry: number;

  saveUserAuth: Function;
  clearUserAuth: Function;
}

interface authResponse {
  user: {
    username: string;
  };
  expiry: number;
}

const initialState: authContextState = {
  userInfo: {
    username: "",
  },
  isLoggedIn: false,
  expiry: 0,

  saveUserAuth: () => {},
  clearUserAuth: () => {},
};

export const AuthContext = createContext<authContextState>(initialState);

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState, () => {
    getStorageAuthState(initialState);
  });

  // save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("AuthState", serialize(state, { isJSON: true }));
    }
  }, [state]);

  // actions
  function saveUserAuth(response: authResponse) {
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

export function useAuth() {
  const { userInfo, isLoggedIn, saveUserAuth, clearUserAuth } =
    useContext(AuthContext);

  return { userInfo, isLoggedIn, saveUserAuth, clearUserAuth };
}
