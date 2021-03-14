import canHandleId from "../handlers/canHandleId";
import canHandleModel from "../handlers/canHandleModel";

const Shelf = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      label: "",
      products: [],
      ...lastState,
    },
  };

  const behavior = (model) => ({
    ...canHandleShelf(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleShelf = (model) => ({
  ...canHandleModel(model),
  ...canHandleId(model),
});

export default Shelf;
