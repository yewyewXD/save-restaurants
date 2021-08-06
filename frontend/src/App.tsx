import React, { Suspense, lazy } from "react";
import { ModalProvider } from "./context/modal/ModalState";
import { NotificationProvider } from "./context/notification/NotificationState";
const { BrowserRouter, Switch, Route } = require("react-router-dom");
const Home = lazy(() => import("./pages/Home/Home"));

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ModalProvider>
          <Switch>
            <Suspense fallback="Loading...">
              <Route path="/" component={Home} exact />
            </Suspense>
          </Switch>
        </ModalProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
