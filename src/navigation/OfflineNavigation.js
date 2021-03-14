import React from "react";
import { Switch, Route } from "react-router-dom";
import LostPage from "../screens/LostPage/LostPage";
import LoadingPage from "../screens/LoadingPage/LoadingPage";
import AuthPage from "../screens/AuthPage/AuthPage";
import { config } from "../services";
import Develop from "../screens/Develop/Develop";

export default function OfflineNavigation() {
  return (
    <Switch>
      <Route path="/auth">
        <AuthPage />
        {/* <Develop /> */}
      </Route>
      <Route exact path="/">
        <LoadingPage />
      </Route>
      <Route path="*">
        <LostPage />
      </Route>
    </Switch>
  );
}
