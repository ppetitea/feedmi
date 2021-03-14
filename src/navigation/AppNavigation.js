import React from "react";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import OfflineNavigation from "./OfflineNavigation";
import SecureNavigation from "./SecureNavigation";
import { config } from "../services";
import { connect } from "react-redux";
import App from "../models/App";
import Auth from "../models/Auth";

const AppNavigation = ({ app, auth }) => {
  const Router = config.isProdEnv() ? HashRouter : BrowserRouter;
  const basename = config.isProdEnv() ? "/feedmi/" : "/";

  const canAccessToSecure = app.get("canAccessSecureNav");

  return (
    <Router basename={basename}>
      <Switch>
        <Route path="*">
          {canAccessToSecure ? <SecureNavigation /> : <OfflineNavigation />}
        </Route>
      </Switch>
    </Router>
  );
};

const MapStateToProps = (state) => ({
  app: App(state.app),
  auth: Auth(state.auth),
});

export default connect(MapStateToProps)(AppNavigation);
