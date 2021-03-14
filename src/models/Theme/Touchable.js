import canHandleModel from "../handlers/canHandleModel";

const Touchable = (laststate = {}) => {
  let model = {
    lastState: null,
    state: {
      hover: false,
      down: false,
      touched: false,
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
  onMouseEnter: () => model.set("hover", true),
  onMouseOver: () => model.set("hover", false),
  onMouseLeave: () => model.set("hover", false),
  onMouseDown: () => model.set("down", true),
  onMouseUp: () => model.set("down", false).set("touched", false),
  onClick: () => model.set("down", false).set("touched", false),
  onTouchStart: () => model.set("touched", true),
  onTouchEnd: () => model.set("touched", false),
  onTouchCancel: () => model.set("touched", false),
});

export default Touchable;
