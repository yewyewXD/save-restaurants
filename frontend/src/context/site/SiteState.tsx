import React, {
  createContext,
  useReducer,
  // useEffect,
  useContext,
  FC,
  useEffect,
} from "react";
import SiteReducer from "./SiteReducer";
import { ISiteContextState, IActionTypes } from "./types";
import { set, createStore } from "idb-keyval";

const initialState: ISiteContextState = {
  header: {},
  hero: {},
  about: {},
  menu: {},
  contact: {},
  social: {},

  updateSection: () => {},
};

export const SiteContext = createContext<ISiteContextState>(initialState);

export const SiteContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(SiteReducer, initialState, () => {
    // if (typeof window !== "undefined") {
    //   const storedSite = localStorage.getItem("SiteState");
    //   return storedSite ? JSON.parse(storedSite) : initialState;
    // } else {
    return initialState;
    // }
  });

  async function testIndexedDB() {
    const myStore = createStore("siteStore", "template1");
    await set("header", "header value", myStore);
  }

  // save to localStorage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("SiteState", serialize(state, { isJSON: true }));
  //   }
  // }, [state]);
  useEffect(() => {
    testIndexedDB();
  }, []);

  // actions
  function updateSection(field: string, data: object): void {
    dispatch({
      type: IActionTypes.UPDATE,
      payload: {
        field,
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
        social: state.social,
        updateSection,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export function useSite(): ISiteContextState {
  const { header, hero, about, menu, contact, social, updateSection } =
    useContext(SiteContext);

  return { header, hero, about, menu, contact, social, updateSection };
}
