import canHandleId from "../handlers/canHandleId";
import canHandleModel from "../handlers/canHandleModel";

const List = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      label: "",
      products: [],
      ...lastState,
    },
  };

  const behavior = (model) => ({
    ...canHandleList(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleList = (model) => ({
  ...canHandleModel(model),
  ...canHandleId(model),
});

export default List;
