import React from "react";
import AppNavigation from "./navigation/AppNavigation";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store";

require("dotenv").config();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CssBaseline />
        <AppNavigation />
      </div>
    </Provider>
  );
}

export default App;
