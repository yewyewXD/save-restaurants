import React, { Suspense, lazy } from "react";
import { ModalProvider } from "./context/modal/ModalState";
const { BrowserRouter, Switch, Route } = require("react-router-dom");
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Switch>
          <Suspense fallback="Loading...">
            <Route path="/" component={Home} exact />
          </Suspense>
        </Switch>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
