import React, { useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import { Container } from "@material-ui/core";
import Layout from "../models/Theme/Layout";
import TouchableModel from "../models/Theme/Touchable";
import styles from "../constants/theme";

const useTouchable = ({}) => {
  const [state, setState] = useState(TouchableModel());
  const ref = useRef(null);

  const onPress = () => {};
  const onLongPress = () => {};
  const onRelease = () => {};
  const onHoverStart = () => {};
  const onHoverEnd = () => {};
  const onDragStart = () => {};
  const onDrag = () => {};
  const onDrop = () => {};

  return { state, ref };
};

const Touchable = (props) => {
  const {
    children,
    onPress = () => {},
    onLongPress = () => {},
    onRelease = () => {},
    onHoverStart = () => {},
    onHoverEnd = () => {},
    onDragStart = () => {},
    onDrag = () => {},
    onDrop = () => {},
  } = props;

  try {
    const style = buildStyle(props);
    const classes = buildClasses(props);
    return (
      <Container
        onMouseEnter={onMouseEnter}
        onMouseOver={onMouseOver}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        onTouchMove={onTouchMove}
        style={style.state}
        className={classes}
      >
        {children}
      </Container>
    );
  } catch (e) {
    console.log(e);
    return <div>{children}</div>;
  }
};

const onMouseEnter = () => {
  console.log("enter");
};
const onMouseOver = () => {
  console.log("over");
};
const onMouseDown = () => {
  console.log("down");
};
const onMouseUp = () => {
  console.log("up");
};
const onMouseLeave = () => {
  console.log("leave");
};
const onClick = () => {
  console.log("click");
};
const onTouchStart = () => {
  console.log("touched");
};
const onTouchEnd = () => {
  console.log("released");
};
const onTouchLeave = () => {
  console.log("Leave");
};
const onTouchCancel = () => {
  console.log("Cancel");
};
const onTouchMove = () => {
  console.log("Move");
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
  let layout = Layout();

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
  if (variant === "pressable") classes += styles.pressable;

  return classes;
};

export default Touchable;
