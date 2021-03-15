import canHandleModel from "../models/handlers/canHandleModel";
import canHandleRole from "../models/handlers/canHandleRole";
import { Config } from "./Config";
import { Logger } from "./Log";
import Firebase from "./Firebase";

const App = (init = {}) => {
  let model = {
    state: {
      config: null,
      logger: null,
      auth: null,
      nav: null,
      user: null,
      data: null,
      redux: null,
      actions: ["init"],
      ...init,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleRole(model, model),
    ...canHandleApp(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleApp = (model) => ({
  init: () => {
    model.set("config", Config({}, model));
    model.set("logger", Logger({}, model));
    model.set("auth", Firebase({}, model));
    model.as("auth").do("init")();
    return model;
  },
});

export default App;
