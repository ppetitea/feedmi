import canHandleModel from "./handlers/canHandleModel";

const App = (laststate = {}) => {
  let model = {
    state: {
      hasToken: false,
      isTokenValid: false,
      hasRessource: false,
      canAccessSecureNav: false,
      ...laststate,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleApp(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

export const canHandleApp = (model) => ({});

export default App;
