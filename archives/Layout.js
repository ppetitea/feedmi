import { ButtonBase, Container } from "@material-ui/core";
import React from "react";
import LayoutModel from "../models/Theme/Layout";
import styles from "../constants/theme";

const Layout = (props) => {
  const { children, forwardedProps = {} } = props;

  const LayoutContainer = buildLayoutContainer(props);
  try {
    const style = buildStyle(props);
    const classes = buildClasses(props);

    return (
      <LayoutContainer
        style={style.state}
        className={classes}
        {...forwardedProps}
      >
        {children}
      </LayoutContainer>
    );
  } catch (e) {
    console.log(e);
    return <div>{children}</div>;
  }
};

const buildLayoutContainer = ({ variant, Component }) => {
  let layout = (props) => <div {...props}>{props.children}</div>;
  if (variant === "button") {
    layout = (props) => <button {...props}>{props.children}</button>;
  } else if (variant === "form") {
    layout = (props) => <form {...props}>{props.children}</form>;
  }
  return layout;
};
const buildStyle = ({
  flex,
  row,
  align,
  items,
  self,
  height,
  hmax,
  hmin,
  width,
  wmax,
  wmin,
  noborder,
  nowrap,
  nooverflow,
  margin,
  marginV,
  marginH,
  marginT,
  marginB,
  marginL,
  marginR,
  padding,
  paddingV,
  paddingH,
  paddingT,
  paddingB,
  paddingL,
  paddingR,
  mode,
  radius,
  color,
  bgColor,
  bdColor,
  elevation,
}) => {
  let layout = LayoutModel();

  if (flex) layout.flex(flex);
  if (row) layout.row().itemsCenter();
  if (items) layout.items(items);
  if (align) layout.align(align);
  if (self) layout.self(self);
  if (height) layout.height(height);
  if (hmax !== undefined) layout.hmax(hmax);
  if (hmin !== undefined) layout.hmin(hmin);
  if (width) layout.width(width);
  if (wmax !== undefined) layout.wmax(wmax);
  if (wmin !== undefined) layout.wmin(wmin);
  if (mode) layout[mode](color);
  if (margin !== undefined) layout.margin(margin);
  if (marginV !== undefined) layout.marginV(marginV);
  if (marginH !== undefined) layout.marginH(marginH);
  if (marginT !== undefined) layout.marginT(marginT);
  if (marginB !== undefined) layout.marginB(marginB);
  if (marginL !== undefined) layout.marginL(marginL);
  if (marginR !== undefined) layout.marginR(marginR);
  if (padding !== undefined) layout.padding(padding);
  if (paddingV !== undefined) layout.paddingV(paddingV);
  if (paddingH !== undefined) layout.paddingH(paddingH);
  if (paddingT !== undefined) layout.paddingT(paddingT);
  if (paddingB !== undefined) layout.paddingB(paddingB);
  if (paddingL !== undefined) layout.paddingL(paddingL);
  if (paddingR !== undefined) layout.paddingR(paddingR);
  if (noborder) layout.noborder();
  if (bgColor) layout.bgColor(bgColor);
  if (bdColor) layout.bdColor(bdColor);
  if (radius !== undefined) layout.radius(radius);
  if (nowrap) layout.nowrap();
  if (nooverflow) layout.nooverflow();
  if (elevation !== undefined) layout.elevation(elevation);

  return layout;
};

const buildClasses = ({ elevation, variant }) => {
  let classes = styles.baseline;

  if (elevation) classes += styles.elevations[elevation];

  return classes;
};

export default Layout;
