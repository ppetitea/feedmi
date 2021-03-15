import canHandleModel from "../models/handlers/canHandleModel";
import { TRACE, DEBUG, INFO, WARN, ERROR, NOLOG } from "./Log";

export const Config = (init = {}, app) => {
  let model = {
    state: {
      logLevel: DEBUG,
      autofill: false,
      ...init,
    },
  };

  const behavior = (model, app) => ({
    ...canHandleModel(model),
    ...canHandleConfig(model, app),
  });
  Object.assign(model, behavior(model, app));
  return model;
};

const canHandleConfig = (model, app) => ({});
