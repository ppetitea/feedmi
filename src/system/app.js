import canHandleModel from "../models/handlers/canHandleModel";
import canHandleRole from "../models/handlers/canHandleRole";
import Firebase from "./firebase";

const App = (init = {}) => {
  let model = {
    state: {
      auth: null,
      nav: null,
      user: null,
      data: null,
      actions: ["init"],
      ...init,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleRole(model),
    ...canHandleApp(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleApp = (model) => ({
  init: () => {
    model.set("auth", Firebase({}, model));
    model.as("auth").do("init")();
    return model;
  },
});

export default App;
