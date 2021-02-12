import React from "react";
import AppNavigation from "./navigation/AppNavigation";

require("dotenv").config();

function App() {
  return (
    <div className="App">
      <AppNavigation />
    </div>
  );
}

export default App;
