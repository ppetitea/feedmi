const palette = {
  primary: {
    main: "rgb(33,150,243)",
    dark: "rgb(11, 121, 208)",
    light: "rgb(100, 182, 247)",
    text: "#FFFFFF",
    background: "rgba(33,150,243,0.08)",
    border: "rgba(33,150,243,0.5)",
  },
  secondary: {
    main: "rgb(233,30,99)",
    dark: "rgb(190,19,77)",
    light: "rgb(240,97,145)",
    text: "#FFFFFF",
    background: "rgba(233,30,99,0.08)",
    border: "rgba(233,30,99,0.5)",
  },
  text: {
    primary: "rgba(0,0,0,0.87)",
    secondary: "rgba(0,0,0,0.54)",
    disabled: "rgba(0,0,0,0.38)",
    hint: "rgba(0,0,0,0.38)",
  },
  action: {
    main: "rgb(224,224,224)",
    hover: "rgba(0,0,0,0.04)",
    selected: "rgba(0,0,0,0.08)",
    disabledBg: "rgba(0,0,0,0.12)",
    disabled: "rgba(0,0,0,0.26)",
    focus: "rgba(0,0,0,0.12)",
  },
  other: {
    border: "rgba(0,0,0,0.23)",
    white: "rgb(255,255,255)",
    divider: "rgba(0,0,0,0.12)",
  },
  info: {
    main: "rgb(33,150,243)",
    dark: "rgb(11,121,208)",
    light: "rgb(100,182,247)",
    text: "rgb(255,255,255)",
    textDark: "rgb(13,60,97)",
    lightBg: "rgb(232,244,254)",
  },
  success: {
    main: "rgb(76,175,80)",
    dark: "rgb(59,135,62)",
    light: "rgb(123,198,126)",
    text: "rgb(255,255,255)",
    textDark: "rgb(30,70,32)",
    lightBg: "rgb(237,247,237)",
  },
  error: {
    main: "rgb(244,67,54)",
    dark: "rgb(227,27,12)",
    light: "rgb(248,128,120)",
    text: "rgb(255,255,255)",
    textDark: "rgb(98,27,22)",
    lightBg: "rgb(254,236,234)",
  },
  warning: {
    main: "rgb(255,152,0)",
    dark: "rgb(119,119,0)",
    light: "rgb(255,181,71)",
    text: "rgb(33,20,0)",
    textDark: "rgb(102,61,0)",
    lightBg: "rgb(255,244,229)",
  },
};

export const primary = palette.primary.main;
export const secondary = palette.secondary.main;
export const text = palette.text.primary;
export const action = palette.action.main;
export const info = palette.info.main;
export const success = palette.success.main;
export const error = palette.error.main;
export const warning = palette.warning.main;
export default palette;
