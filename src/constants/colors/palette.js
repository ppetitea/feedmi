import canHandleModel from "../../models/handlers/canHandleModel";

const HSL = (lastState = {}) => {
  let model = {
    state: {
      h: 0,
      s: 0,
      l: 0,
      a: null,
      ...lastState,
    },
  };
  const behavior = (model) => ({
    string: () => {
      const { h, s, l, a } = model.state;
      if (a !== null) {
        return `hsla(${h},${s}%,${l}%,${a})`;
      } else return `hsl(${h},${s}%,${l}%)`;
    },
    luminosity: (n) => {
      const { l } = model.state;
      let next = parseInt(l) + parseInt(n);
      if (next < 0) next = 0;
      if (next > 100) next = 100;
      model.state.l = next;
      return model;
    },
    darker: (n = 11) => model.luminosity(-n),
    lighter: (n = 14) => model.luminosity(n),
    parse: (s) => {
      const reg = /hsla?\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%(?:,\s*(\d+(?:\.\d+)?))?\)/g;
      let color = reg.exec(s).slice(1);
      color = color.filter((i) => i !== undefined);
      model.state.h = color[0];
      model.state.s = color[1];
      model.state.l = color[2];
      if (color.length > 3) model.state.a = color[color.length - 1];
      return model;
    },
  });
  Object.assign(model, behavior(model));
  return model;
};

const hslPalette = {
  primary: {
    main: { h: 207, s: 90, l: 54 },
    dark: { h: 207, s: 90, l: 43 },
    light: { h: 207, s: 90, l: 68 },
    text: { h: 0, s: 0, l: 100 },
    background: { h: 207, s: 90, l: 54, a: 0.08 },
    border: { h: 207, s: 90, l: 54, a: 0.5 },
  },
  secondary: {
    main: { h: 340, s: 82, l: 52 },
    dark: { h: 340, s: 82, l: 41 },
    light: { h: 340, s: 82, l: 66 },
    text: { h: 0, s: 0, l: 100 },
    background: { h: 340, s: 82, l: 52, a: 0.08 },
    border: { h: 340, s: 82, l: 52, a: 0.5 },
  },
  text: {
    primary: { h: 0, s: 0, l: 0, a: 0.87 },
    secondary: { h: 0, s: 0, l: 0, a: 0.54 },
    disabled: { h: 0, s: 0, l: 0, a: 0.38 },
    hint: { h: 0, s: 0, l: 0, a: 0.38 },
  },
  action: {
    main: { h: 0, s: 0, l: 88 },
    hover: { h: 0, s: 0, l: 0, a: 0.04 },
    selected: { h: 0, s: 0, l: 0, a: 0.08 },
    disabledBg: { h: 0, s: 0, l: 0, a: 0.12 },
    disabled: { h: 0, s: 0, l: 0, a: 0.26 },
    focus: { h: 0, s: 0, l: 0, a: 0.12 },
  },
  other: {
    border: { h: 0, s: 0, l: 0, a: 0.23 },
    white: { h: 0, s: 0, l: 100 },
    divider: { h: 0, s: 0, l: 0, a: 0.12 },
    shadow: { h: 0, s: 0, l: 0, a: 0.25 },
  },
  info: {
    main: { h: 207, s: 90, l: 54 },
    dark: { h: 207, s: 90, l: 43 },
    light: { h: 207, s: 90, l: 68 },
    text: { h: 0, s: 0, l: 100 },
    textDark: { h: 207, s: 76, l: 22 },
    lightBg: { h: 207, s: 92, l: 95 },
  },
  success: {
    main: { h: 122, s: 39, l: 49 },
    dark: { h: 122, s: 39, l: 38 },
    light: { h: 122, s: 39, l: 63 },
    text: { h: 0, s: 0, l: 100 },
    textDark: { h: 122, s: 39, l: 20 },
    lightBg: { h: 122, s: 39, l: 95 },
  },
  error: {
    main: { h: 4, s: 90, l: 58 },
    dark: { h: 4, s: 90, l: 47 },
    light: { h: 4, s: 90, l: 72 },
    text: { h: 0, s: 0, l: 100 },
    textDark: { h: 4, s: 90, l: 20 },
    lightBg: { h: 4, s: 90, l: 95 },
  },
  warning: {
    main: { h: 36, s: 100, l: 50 },
    dark: { h: 36, s: 100, l: 39 },
    light: { h: 36, s: 100, l: 64 },
    text: { h: 0, s: 0, l: 100 },
    textDark: { h: 36, s: 100, l: 20 },
    lightBg: { h: 36, s: 100, l: 95 },
  },
};

const palette = Object.fromEntries(
  Object.entries(hslPalette).map(([key, value]) => {
    const nextValue = Object.fromEntries(
      Object.entries(value).map(([key, value]) => {
        return [key, HSL(value).string()];
      })
    );
    return [key, nextValue];
  })
);

export { HSL };
export const primary = palette.primary.main;
export const secondary = palette.secondary.main;
export const text = palette.text.primary;
export const action = palette.action.main;
export const info = palette.info.main;
export const success = palette.success.main;
export const error = palette.error.main;
export const warning = palette.warning.main;
export default palette;
