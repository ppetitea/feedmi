import React from "react";
import { Switch, Route } from "react-router-dom";
import DevelopPage from "../screens/Develop/Develop";
import { config } from "../services";

export default function AppNavigation() {
  return (
    <Switch>
      <Route path="*">
        <DevelopPage />
      </Route>
    </Switch>
  );
}
