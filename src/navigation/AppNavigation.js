import React from "react";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import DevelopPage from "../screens/Develop/Develop";
import { config } from "../services";

export default function AppNavigation() {
  const Router = config.isProdEnv() ? HashRouter : BrowserRouter;
  const basename = config.isProdEnv() ? "/feedmi/" : "/";

  return (
    <Router basename={basename}>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <DevelopPage />
        </Route>
      </Switch>
    </Router>
  );
}
