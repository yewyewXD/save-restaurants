import React, { useState, useEffect } from "react";
import { useLocation, Redirect, Route } from "react-router-dom";

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
  const [hasAuth, setHasAuth] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const { isLoggedIn } = getStorageAuthState();
    if (isLoggedIn && !hasAuth) {
      setHasAuth(true);
    } else if (!isLoggedIn && hasAuth) {
      setHasAuth(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Route
      path={path}
      render={() => (hasAuth ? <Component /> : <Redirect to="/login" />)}
      exact={exact}
    />
  );
};
