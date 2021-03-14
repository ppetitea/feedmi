import { v4 as uuidv4 } from "uuid";

const canHandleId = (model) => ({
  setId: (key, v = uuidv4()) => model.set(key, v),
});

export default canHandleId;
