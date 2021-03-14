import canHandleId from "../handlers/canHandleId";
import canHandleModel from "../handlers/canHandleModel";

const Product = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      label: "",
      ...lastState,
    },
  };

  const behavior = (model) => ({
    ...canHandleProduct(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleProduct = (model) => ({
  ...canHandleModel(model),
  ...canHandleId(model),
});

export default Product;
