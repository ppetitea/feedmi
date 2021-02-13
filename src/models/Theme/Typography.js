import canHandleModel from "../handlers/canHandleModel";
import palette from "../../constants/colors/palette";

const Typography = (lastState = {}) => {
  let model = { state: {} };
  const behavior = (model) => ({
    ...canHandleTypography(model),
    init: (lastState = {}) => {
      model.flex(1).center().centerV().nowrap().nooverflow();
      model.color(palette.text.primary);
      Object.assign(model.state, lastState);
    },
  });
  Object.assign(model, behavior(model));
  model.init(lastState);
  return model;
};

const canHandleTypography = (model) => ({
  ...canHandleModel(model),
  ...canHandleTypographyAlignement(model),
  ...canHandleTypographyVariant(model),
});

const canHandleTypographyAlignement = (model) => ({
  flex: (v) => model.set("flex", v),
  nowrap: (v) => model.set("flexWrap", "nowrap"),
  nooverflow: () => model.set("overflow", "hidden"),
  top: () => model.set("textAlignVertical", "top"),
  centerV: () => model.set("textAlignVertical", "center"),
  bottom: () => model.set("textAlignVertical", "bottom"),
  left: () => model.set("textAlign", "left"),
  center: () => model.set("textAlign", "center"),
  right: () => model.set("textAlign", "right"),
  justify: () => model.set("textAlign", "justify"),
  align: (v) => {
    if (v === "start") model.left();
    if (v === "center") model.center();
    if (v === "end") model.right();
    if (v === "justify") model.justify();
    return model;
  },
  size: (v) => model.set("fontSize", v),
  weight: (v) => model.set("fontWeight", v),
  spacing: (v) => model.set("letterSpacing", v),
  color: (v) => model.set("color", v),
  lowercase: () => model.set("textTransform", "lowercase"),
  uppercase: () => model.set("textTransform", "uppercase"),
  capitalize: () => model.set("textTransform", "capitalize"),
  italic: () => model.set("fontStyle", "italic"),
});

const canHandleTypographyVariant = (model) => ({
  h1: () => model.size(96).weight(100).spacing(-1.5),
  h2: () => model.size(60).weight(100).spacing(-0.5),
  h3: () => model.size(48).weight("normal").spacing(0),
  h4: () => model.size(34).weight("normal").spacing(0.25),
  h5: () => model.size(24).weight("normal").spacing(0),
  h6: () => model.size(20).weight("bold").spacing(0.15),
  subtitle1: () => model.size(16).weight("normal").spacing(0.15),
  subtitle2: () => model.size(14).weight("bold").spacing(0.1),
  body1: () => model.size(16).weight("normal").spacing(0.15),
  body2: () => model.size(14).weight("normal").spacing(0.15),
  button: () => model.size(14).uppercase().weight("bold").spacing(0.4),
  caption: () => model.size(12).weight("normal").spacing(0.4),
  overline: () => model.size(12).uppercase().weight("normal").spacing(1),
  variant: (v) => {
    if (v === "h1") model.h1();
    if (v === "h2") model.h2();
    if (v === "h3") model.h3();
    if (v === "h4") model.h4();
    if (v === "h5") model.h5();
    if (v === "h6") model.h6();
    if (v === "subtitle1") model.subtitle1();
    if (v === "subtitle2") model.subtitle2();
    if (v === "body1") model.body1();
    if (v === "body2") model.body2();
    if (v === "button") model.button();
    if (v === "caption") model.caption();
    if (v === "overline") model.overline();
    return model;
  },
});

export default Typography;
