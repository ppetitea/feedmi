import canHandleId from "../handlers/canHandleId";
import canHandleModel from "../handlers/canHandleModel";

const Address = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      mainstreet: "",
      secondarystreet: "",
      zipcode: "",
      city: "",
      country: "",
      ...lastState,
    },
  };

  const behavior = (model) => ({
    ...canHandleAddress(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleAddress = (model) => ({
  ...canHandleModel(model),
  ...canHandleId(model),
});

export default Address;
