import React, { Suspense, lazy } from "react";
import { AuthContextProvider } from "./context/auth/AuthState";
import { ModalProvider } from "./context/modal/ModalState";
import { NotificationProvider } from "./context/notification/NotificationState";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const SiteNew = lazy(() => import("./pages/SiteNew/SiteNew"));
const SiteSingle = lazy(() => import("./pages/SiteSingle/SiteSingle"));

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationProvider>
          <ModalProvider>
            <Switch>
              <Suspense fallback="Loading...">
                <Route path="/" component={Home} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/dashboard/sites/new" component={SiteNew} exact />
                <Route
                  path="/dashboard/sites/:id"
                  component={SiteSingle}
                  exact
                />
              </Suspense>
            </Switch>
          </ModalProvider>
        </NotificationProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
