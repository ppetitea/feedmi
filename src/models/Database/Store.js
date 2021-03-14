import canHandleId from "../handlers/canHandleId";
import canHandleModel from "../handlers/canHandleModel";

const Store = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      label: "",
      address: null,
      shelfs: [],
      ...lastState,
    },
  };

  const behavior = (model) => ({
    ...canHandleStore(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleStore = (model) => ({
  ...canHandleModel(model),
  ...canHandleId(model),
});

export default Store;
