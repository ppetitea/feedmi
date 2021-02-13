import canHandleModel from "../handlers/canHandleModel";

const Layout = (lastState = {}) => {
  let model = { state: {} };
  const behavior = (model) => ({
    ...canHandleLayout(model),
    init: (lastState = {}) => {
      model.set("display", "flex");
      model.flex(1);
      model.col();
      model.itemsStart();
      model.alignCenter();
      model.selfStretch();
      model.margin(5);
      model.padding(5);
      Object.assign(model.state, lastState);
    },
  });
  Object.assign(model, behavior(model));
  model.init(lastState);
  return model;
};

const canHandleLayout = (model) => ({
  ...canHandleModel(model),
  ...canHandleLayoutDirection(model),
  ...canHandleLayoutSize(model),
  ...canHandleLayoutBorder(model),
  ...canHandleLayoutBackground(model),
  ...canHandleLayoutMode(model),
});

const canHandleLayoutDirection = (model) => ({
  col: () => model.set("flexDirection", "column"),
  row: () => model.set("flexDirection", "row"),
  itemsStart: () => model.set("justifyContent", "flex-start"),
  itemsCenter: () => model.set("justifyContent", "center"),
  itemsEnd: () => model.set("justifyContent", "flex-end"),
  alignStart: () => model.set("alignItems", "flex-start"),
  alignCenter: () => model.set("alignItems", "center"),
  alignEnd: () => model.set("alignItems", "flex-end"),
  selfStretch: () => model.set("alignSelf", "stretch"),
  selfCenter: () => model.set("alignSelf", "center"),
  nowrap: (v) => model.set("flexWrap", "nowrap"),
  nooverflow: () => model.set("overflow", "hidden"),
  items: (v) => {
    if (v === "start") return model.itemsStart();
    if (v === "center") return model.itemsCenter();
    if (v === "end") return model.itemsEnd();
  },
  align: (v) => {
    if (v === "start") return model.alignStart();
    if (v === "center") return model.alignCenter();
    if (v === "end") return model.alignEnd();
  },
  self: (v) => {
    if (v === "stretch") return model.selfStretch();
    if (v === "center") return model.selfCenter();
  },
});

const canHandleLayoutSize = (model) => ({
  flex: (v) => model.set("flex", v),
  height: (v) => model.set("height", v),
  width: (v) => model.set("width", v),
  hmax: (v) => model.set("maxHeight", v),
  wmax: (v) => model.set("maxWidth", v),
  hmin: (v) => model.set("minHeight", v),
  wmin: (v) => model.set("minWidth", v),
});

const canHandleLayoutBorder = (model) => ({
  noborder: () => model.set("margin", 0).set("padding", 0),
  margin: (v) => model.set("margin", v),
  padding: (v) => model.set("padding", v),
  marginV: (v) => model.set("marginVertical", v),
  marginH: (v) => model.set("marginHorizontal", v),
  marginT: (v) => model.set("marginTop", v),
  marginB: (v) => model.set("marginBottom", v),
  marginL: (v) => model.set("marginLeft", v),
  marginR: (v) => model.set("marginRight", v),
  paddingV: (v) => model.set("paddingVertical", v),
  paddingH: (v) => model.set("paddingHorizontal", v),
  paddingT: (v) => model.set("paddingTop", v),
  paddingB: (v) => model.set("paddingBottom", v),
  paddingL: (v) => model.set("paddingLeft", v),
  paddingR: (v) => model.set("paddingRight", v),
  bdWidth: (v) => model.set("borderWidth", v),
  bdColor: (v) => model.set("borderColor", v),
  radius: (v) => model.set("borderRadius", v),
  elevation: (v) => model.set("elevation", v),
});

const canHandleLayoutBackground = (model) => ({
  bgColor: (v) => model.set("backgroundColor", v),
});

const canHandleLayoutMode = (model) => ({
  rounded: () => model.radius(20),
  outlined: (c) => model.rounded().bdWidth(1).bdColor(c),
  contained: (c) => model.rounded().elevation(1).bgColor(c),
});

export default Layout;
