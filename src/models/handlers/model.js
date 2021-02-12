const canHandleModel = (model) => ({
  set: (key, value) => {
    model.state[key] = value;
    return model;
  },
  get: (key) => model.state[key],
  is: (key, value) => model.state[key] === value,
});

export default canHandleModel;
