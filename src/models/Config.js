import { ENV_DEV, ENV_PROD } from "../constants";
import canHandleModel from "./handlers/canHandleModel";

const Config = (laststate = {}) => {
  let model = {
    state: {
      env: ENV_DEV,
      ...laststate,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleConfig(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

export const canHandleConfig = (model) => ({
  isDevEnv: () => model.is("env", ENV_DEV),
  isProdEnv: () => model.is("env", ENV_PROD),
  setDevEnv: () => model.set("env", ENV_DEV),
  setProdEnv: () => model.set("env", ENV_PROD),
});

export default Config;
