const canHandleModel = (model) => ({
  set: (key, value) => {
    model.state[key] = value;
    return model;
  },
  get: (key, defaultValue) => {
    if (model.state[key] !== undefined) return model.state[key];
    else return defaultValue;
  },
  assign: (nextState = {}) => {
    Object.assign(model.state, nextState);
    return model;
  },
  equal: (key, value) => model.state[key] === value,
  notEqual: (key, value) => model.state[key] !== value,
  is: (key) => (model.state[key] ? true : false),
  isnt: (key) => (model.state[key] ? false : true),
  toggle: (key) => model.set(key, !model.state[key]),
  push: (key, value) => {
    model.state[key].push(value);
    return model;
  },
  unshift: (key, value) => {
    model.state[key].unshift(value);
    return model;
  },
  filter: (key, fn) => model.state[key].filter(fn),
  map: (key, fn) => model.state[key].map(fn),
  find: (key, fn) => model.state[key].find(fn),
  debug: () => {
    console.log(JSON.stringify(model.state, null, 2));
    return model;
  },
});

export default canHandleModel;
