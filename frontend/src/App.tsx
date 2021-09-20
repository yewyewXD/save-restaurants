import React, { Suspense, lazy, useState, useEffect } from "react";
import { AuthContextProvider } from "./context/auth/AuthState";
import { ModalProvider } from "./context/modal/ModalState";
import { NotificationProvider } from "./context/notification/NotificationState";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { getStorageAuthState } from "./utils/authState.utils";

const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const SiteNew = lazy(() => import("./pages/SiteNew/SiteNew"));
const SiteSingle = lazy(() => import("./pages/SiteSingle/SiteSingle"));

function HandleRedirect(path: string) {
  return <Redirect to={path} />;
}

function App() {
  const [hasAuth, setHasAuth] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log("checked");

    const { isLoggedIn } = getStorageAuthState();
    if (isLoggedIn && !hasAuth) {
      setHasAuth(true);
    } else if (!isLoggedIn && hasAuth) {
      setHasAuth(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AuthContextProvider>
      <NotificationProvider>
        <ModalProvider>
          <Switch>
            <Suspense fallback="Loading...">
              <Route path="/" component={Home} exact />
              <Route path="/home" render={() => HandleRedirect("/")} exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/dashboard/sites/new" component={SiteNew} exact />
              <Route path="/dashboard/sites/:id" component={SiteSingle} exact />
            </Suspense>
          </Switch>
        </ModalProvider>
      </NotificationProvider>
    </AuthContextProvider>
  );
}

export default App;
