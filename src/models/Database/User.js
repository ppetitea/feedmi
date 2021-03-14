import canHandleId from "../handlers/canHandleId";
import canHandleModel from "../handlers/canHandleModel";

const UserProduct = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      index: 0,
      ...lastState,
    },
  };
  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleId(model),
  });
  Object.assign(model, behavior(model));
  return model;
};
const UserShelf = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      index: 0,
      products: [],
      ...lastState,
    },
  };
  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleId(model),
  });
  Object.assign(model, behavior(model));
  return model;
};
const UserStore = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      index: 0,
      shelfs: [],
      ...lastState,
    },
  };
  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleId(model),
  });
  Object.assign(model, behavior(model));
  return model;
};
const UserList = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      index: 0,
      ...lastState,
    },
  };
  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleId(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const User = (lastState = {}) => {
  let model = {
    state: {
      id: null,
      name: "",
      email: "",
      mobil: "",
      addresses: [],
      stores: [],
      lists: [],
      ...lastState,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleId(model),
    ...canHandleUser(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleUser = (model) => ({});

export default User;
