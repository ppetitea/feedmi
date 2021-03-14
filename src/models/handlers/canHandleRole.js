import canHandleModel from "./canHandleModel";

const norole = () => {
  let model = { state: {} };
  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleRole(model),
  });
  return Object.assign(model, behavior(model));
};

export const canHandleRole = (model) => ({
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
    console.log(action);
    if (model.can(action) && model[action] !== undefined) {
      return model[action];
    }
    const error = `l'action '${action}' n'est pas disponible`;
    return () => {
      console.log(error);
      return model;
    };
  },
});

export default canHandleRole;
