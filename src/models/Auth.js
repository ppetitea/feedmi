import canHandleModel from "./handlers/canHandleModel";

const Auth = (laststate = {}) => {
  let model = {
    state: {
      token: null,
      login: "",
      ...laststate,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleAuth(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

export const canHandleAuth = (model) => ({});

export default Auth;
