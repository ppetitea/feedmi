import palette, { HSL } from "../../constants/colors/palette";
import { dimensions } from "../../services";
import canHandleModel from "../handlers/canHandleModel";
import styles from "../../constants/theme";

const { vw, vh, vmin } = dimensions;

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
      model.wmax("none");
      model.width("auto");
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
  ...canHandleLayoutColor(model),
  ...canHandleLayoutShadow(model),
  ...canHandleLayoutType(model),
  ...canHandleLayoutWrap(model),
  add: (key, value) => {
    const v = model.get(key);
    const n = v ? parseFloat(v) + value : value;
    model.set(key, n);
    return model;
  },
  exist: (key) => key !== undefined && model[key] !== undefined,
  fromProps: (props) => {
    for (const [key, value] of Object.entries(props)) {
      if (model.exist(key)) model[key](value);
    }
    model.classesFromProps(props);
    return model;
  },
  classesFromProps: (props) => {
    let classes = "";
    for (const [key, value] of Object.entries(props)) {
      if (styles[key]) {
        if (Array.isArray(styles[key])) classes += styles[key][value];
        else classes += styles[key];
      }
    }
    model.set("classes", classes);
    return model;
  },
  toProps: () => ({ style: model.state, classes: model.classes }),
});

const canHandleLayoutDirection = (model) => ({
  direction: (v) => model.set("flexDirection", v),
  col: () => model.direction("column"),
  row: () => model.direction("row").itemsCenter(),
  itemsStart: () => model.set("justifyContent", "flex-start"),
  itemsCenter: () => model.set("justifyContent", "center"),
  itemsEnd: () => model.set("justifyContent", "flex-end"),
  alignStart: () => model.set("alignItems", "flex-start"),
  alignCenter: () => model.set("alignItems", "center"),
  alignEnd: () => model.set("alignItems", "flex-end"),
  selfStretch: () => model.set("alignSelf", "stretch"),
  selfCenter: () => model.set("alignSelf", "center"),
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
  wmix: (v) => model.wmin(v).wmax(v),
  hmix: (v) => model.hmin(v).hmax(v),
});

const canHandleLayoutWrap = (model) => ({
  wrap: () => model.set("flexWrap", "wrap"),
  wrapR: () => model.set("flexWrap", "wrapReverse"),
  nowrap: () => model.set("flexWrap", "nowrap"),
  gap: (v) => model.set("gap", v),
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
  paddingV: (v) => model.paddingT(v).paddingB(v),
  paddingH: (v) => model.paddingL(v).paddingR(v),
  paddingT: (v) => model.set("paddingTop", v),
  paddingB: (v) => model.set("paddingBottom", v),
  paddingL: (v) => model.set("paddingLeft", v),
  paddingR: (v) => model.set("paddingRight", v),
  bdWidth: (v) => model.set("borderWidth", v),
  bdColor: (v) => model.set("borderColor", v),
  bdStyle: (v) => model.set("borderStyle", v),
  radius: (v) => model.set("borderRadius", v),
});

const canHandleLayoutColor = (model) => ({
  bgColor: (v) => model.set("backgroundColor", v),
});

const canHandleLayoutShadow = (model) => ({
  shadow: (v) => model.set("boxShadow", v),
});

const canHandleLayoutType = (model) => ({
  rounded: () => model.radius(20),
  outlined: (c) => {
    model.rounded().bdWidth(1).bdColor(c).bdStyle("solid");
    return model.bgColor(palette.other.white);
  },
  contained: (c) => model.rounded().bgColor(c),
  page: () => model.margin(0).width(vw(1)).height(vh(1)),
});

export default Layout;
