import React, { Suspense, lazy } from "react";
import * as Sentry from "@sentry/react";
import { AuthContextProvider } from "./context/auth/AuthState";
import { ModalProvider } from "./context/modal/ModalState";
import { NotificationProvider } from "./context/notification/NotificationState";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./utils/auth.utils";
import { SiteContextProvider } from "./context/site/SiteState";

const Home = lazy(() => import("./pages/Home/Home.page"));
const SiteNew = lazy(() => import("./pages/SiteNew/SiteNew.page"));
const SiteSingle = lazy(() => import("./pages/SiteSingle/SiteSingle.page"));
const Login = lazy(() => import("./pages/Login/Login.page"));
const PasswordReset = lazy(() => import("./pages/PasswordReset.page"));
const SiteAll = lazy(() => import("./pages/Dashboard/SiteAll.page"));

function handleRedirect(path: string) {
  return <Redirect to={path} />;
}

function App() {
  return (
    <SiteContextProvider>
      <AuthContextProvider>
        <NotificationProvider>
          <ModalProvider>
            <Switch>
              <Suspense fallback="Loading...">
                <Route path="/" component={Home} exact />
                <Route path="/home" render={() => handleRedirect("/")} exact />
                <Route
                  path="/dashboard"
                  render={() => handleRedirect("/dashboard/sites")}
                  exact
                />
                <PrivateRoute
                  path="/dashboard/sites"
                  component={SiteAll}
                  exact
                />
                <PrivateRoute
                  path="/dashboard/sites/:id"
                  component={SiteSingle}
                  exact
                />
                <PrivateRoute
                  path="/dashboard/sites/new"
                  component={SiteNew}
                  exact
                />

                <Route path="/login" component={Login} exact />
                <Route path="/password-reset" component={PasswordReset} exact />
              </Suspense>
            </Switch>
          </ModalProvider>
        </NotificationProvider>
      </AuthContextProvider>
    </SiteContextProvider>
  );
}

export default Sentry.withProfiler(App);
