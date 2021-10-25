import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { useAuth } from "../context/auth/AuthState";

interface PrivateRouteProps {
  component: React.ComponentType;
  exact: boolean;
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  exact,
}) => {
  const isLoggedIn = true;
  // const {isLoggedIn}=useAuth()
  // todo: reactivate isLoggedIn check

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
