import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  FC,
} from "react";
import SiteReducer from "./SiteReducer";
import serialize from "serialize-javascript";
import { ISiteContextState } from "./types";

const initialState: ISiteContextState = {
  header: {},
  hero: {},
  about: {},
  menu: {},
  contact: {},
  footer: {},

  updateSection: () => {},
};

export const SiteContext = createContext<ISiteContextState>(initialState);

export const SiteContextProvider: FC = ({ children }) => {
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
  function updateSection(name: string, data: object) {
    dispatch({
      type: "UPDATE_SECTION",
      payload: {
        name,
        data,
      },
    });
  }

  return (
    <SiteContext.Provider
      value={{
        header: state.header,
        hero: state.hero,
        about: state.about,
        menu: state.menu,
        contact: state.contact,
        footer: state.footer,
        updateSection,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

// export function useSite() {
//   const { userInfo, isLoggedIn, saveUserSite, clearUserSite } =
//     useContext(SiteContext);

//   return { userInfo, isLoggedIn, saveUserSite, clearUserSite };
// }
