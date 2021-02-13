import canHandleModel from "../handlers/canHandleModel";

const Dimensions = () => {
  const model = { state: {} };

  const behavior = (model) => ({
    ...canHandleModel(model),
    ...canHandleDimensions(model),
    ...canHandleTransformations(model),
  });
  Object.assign(model, behavior(model));
  model.init();
  return model;
};

const canHandleDimensions = (model) => ({
  init: () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    model.set("width", width);
    model.set("height", height);
    model.set("hwratio", height / width);
    model.set("hwratio", height / width);
    model.set("whratio", width / height);
    model.set("max", width > height ? width : height);
    model.set("min", width < height ? width : height);
  },
  hwratio: () => model.get("hwratio"),
  whratio: () => model.get("whratio"),
  min: () => model.get("min"),
  max: () => model.get("max"),
  vw: (k) => model.get("width") * k,
  vh: (k) => model.get("height") * k,
});

const canHandleTransformations = (model) => ({
  fitSizeToScreenWidth: (size) => {
    const { width, height } = size;
    const nextSize = {
      width: model.get("width"),
      height: height * (model.get("width") / width),
    };
    return nextSize;
  },
  fitSizeToScreenHeight: (size) => {
    const { width, height } = size;
    const nextSize = {
      height: model.get("height"),
      width: width * (model.get("height") / height),
    };
    return nextSize;
  },
  scale: (size, k) => {
    const { width, height } = size;
    return { width: width * k, height: height * k };
  },
  scaleToFitScreenWidth: (size, k) => {
    let nextSize = model.fitSizeToScreenWidth(size);
    nextSize = model.scale(nextSize, k);
    return nextSize;
  },
  verticalCenterByMarginTop: (height = 0) => (model.get("height") - height) / 2,
});

export default Dimensions;
