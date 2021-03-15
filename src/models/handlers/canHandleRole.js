import canHandleModel from "./canHandleModel";

const norole = () => {
  let model = { state: {} };
  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleRole(model),
  });
  return Object.assign(model, behavior(model));
};

export const canHandleRole = (model, app) => ({
  as: (role) => {
    let found = model.get(role);
    if (found?.do) return found;
    else {
      console.log(`unexpected role '${role}' detected`);
      return norole();
    }
  },
  can: (action) => {
    const actions = model.get("actions", []);
    const callback = (value) => value === action;
    return actions.find(callback) !== undefined ? true : false;
  },
  do: (action) => {
    const logger = app.get("logger");
    if (model.can(action) && model[action] !== undefined) {
      if (logger) logger.trace(action);
      return model[action];
    }
    return () => {
      if (logger) logger.warn(`l'action '${action}' n'est pas disponible`);
      return model;
    };
  },
});

export default canHandleRole;
