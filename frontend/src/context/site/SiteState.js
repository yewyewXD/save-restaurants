import React, { createContext, useReducer, useEffect, useContext } from "react";
import SiteReducer from "./SiteReducer";
import serialize from "serialize-javascript";

const initialState = {};

export const SiteContext = createContext(initialState);

export const SiteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SiteReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const storedSite = localStorage.getItem("SiteState");
      return storedSite ? JSON.parse(storedSite) : initialState;
    } else {
      return initialState;
    }
  });

  // save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("SiteState", serialize(state, { isJSON: true }));
    }
  }, [state]);

  // actions
  //   function saveUserSite(userData) {
  //     dispatch({
  //       type: "SAVE_USER_Site",
  //       payload: { userData },
  //     });
  //   }

  return <SiteContext.Provider value={{}}>{children}</SiteContext.Provider>;
};

// export function useSite() {
//   const { userInfo, isLoggedIn, saveUserSite, clearUserSite } =
//     useContext(SiteContext);

//   return { userInfo, isLoggedIn, saveUserSite, clearUserSite };
// }
