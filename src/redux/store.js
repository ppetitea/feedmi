import { createStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";

const defaultReducers = {
  app: appReducer,
};
const persistReducers = {
  auth: authReducer,
};

const rootReducers = combineReducers({
  ...defaultReducers,
  ...persistReducers,
});

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const persistState = Object.entries(state).filter(([k, v]) => {
      if (persistReducers[k]) return true;
      else return false;
    });
    const serialisedState = JSON.stringify(Object.fromEntries(persistState));
    localStorage.setItem("persistState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStorage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(rootReducers, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
