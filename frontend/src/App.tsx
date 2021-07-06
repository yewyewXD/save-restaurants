import React from "react";
import Home from "./pages/Home";
const { BrowserRouter, Switch, Route } = require("react-router-dom");

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
