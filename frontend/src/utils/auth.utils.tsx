import React from "react";
import { Redirect, Route } from "react-router-dom";

export function getStorageAuthState(initialState = { isLoggedIn: false }) {
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
}

interface PrivateRouteProps {
  component: React.FC;
  exact: boolean;
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  exact,
}) => {
  const { isLoggedIn } = getStorageAuthState();

  return (
    <Route
      path={path}
      render={() =>
        isLoggedIn ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login", state: { referrer: path } }} />
        )
      }
      exact={exact}
    />
  );
};
