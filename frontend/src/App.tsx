import React, { Suspense, lazy } from "react";
import { AuthContextProvider } from "./context/auth/AuthState";
import { ModalProvider } from "./context/modal/ModalState";
import { NotificationProvider } from "./context/notification/NotificationState";
import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./utils/auth.utils";

const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const SiteNew = lazy(() => import("./pages/SiteNew/SiteNew"));
const SiteSingle = lazy(() => import("./pages/SiteSingle/SiteSingle"));

function HandleRedirect(path: string) {
  return <Redirect to={path} />;
}

function App() {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <ModalProvider>
          <Switch>
            <Suspense fallback="Loading...">
              <Route path="/" component={Home} exact />
              <Route path="/home" render={() => HandleRedirect("/")} exact />
              <PrivateRoute path="/dashboard" component={Dashboard} exact />
              <PrivateRoute
                path="/dashboard/sites/new"
                component={SiteNew}
                exact
              />
              <PrivateRoute
                path="/dashboard/sites/:id"
                component={SiteSingle}
                exact
              />
            </Suspense>
          </Switch>
        </ModalProvider>
      </NotificationProvider>
    </AuthContextProvider>
  );
}

export default App;
