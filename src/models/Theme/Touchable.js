import canHandleModel from "../handlers/canHandleModel";

const Touchable = (laststate = {}) => {
  let model = {
    lastState: null,
    state: {
      pressed: false,
      hover: false,
      dragged: false,
      dropped: false,
      posX: 0,
      posY: 0,
      offsetX: 0,
      offsetY: 0,
      ...laststate,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleTouchable(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

export const canHandleTouchable = (model) => ({
  setPressed: (v) => model.set("pressed", v),
  setHover: (v) => model.set("hover", v),
  setDragged: (v) => model.set("dragged", v),
  setDropped: (v) => model.set("dropped", v),
  handleHoverStart: () => {
    model.setHover(true);
  },
  handleHoverStop: () => {
    model.setHover(false);
  },
  handlePress: () => {
    model.setPressed(true);
  },
  handleReleased: () => {
    model.setPressed(false);
  },
  handleDrag: () => {
    model.setDragged(true);
  },
  handleDrag: () => {
    model.setDragged(false);
    model.setDropped(true);
  },
});

export default Touchable;
