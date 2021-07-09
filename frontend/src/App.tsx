import React, { Suspense, lazy } from "react";
const { BrowserRouter, Switch, Route } = require("react-router-dom");
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback="Loading...">
          <Route path="/" component={Home} exact />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
