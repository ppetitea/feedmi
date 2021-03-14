import React, { useState, useRef } from "react";
import LayoutModel from "../models/Theme/Layout";
import Model from "../models/Theme/Touchable";
import styles from "../constants/theme";
import { isMobile } from "react-device-detect";

const useTouchable = (props) => {
  const [state, setState] = useState(Model());
  const ref = useRef(null);

  const onMouseEnter = (e) => setState(Model(state.state).onMouseEnter(e));
  const onMouseOver = (e) => setState(Model(state.state).onMouseOver(e));
  const onMouseLeave = (e) => setState(Model(state.state).onMouseLeave(e));
  const onMouseDown = (e) => setState(Model(state.state).onMouseDown(e));
  const onMouseUp = (e) => setState(Model(state.state).onMouseUp(e));
  const onClick = (e) => setState(Model(state.state).onClick(e));
  const onTouchStart = (e) => setState(Model(state.state).onTouchStart(e));
  const onTouchEnd = (e) => setState(Model(state.state).onTouchEnd(e));
  const onTouchCancel = (e) => setState(Model(state.state).onTouchCancel(e));

  return {
    status: state.state,
    ref,
    onMouseEnter,
    onMouseOver,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  };
};

/**
 * Creer un composant layout touchable
 */

const Touchable = (props) => {
  const {
    children,
    forwardedProps = {},
    onPress = () => {},
    onLongPress = () => {},
  } = props;

  const touchable = useTouchable(props);
  const Container = buildContainer(props);

  try {
    const style = buildStyle(props, touchable.status);
    const classes = buildClasses(style, touchable.status);

    return (
      <Container
        onMouseEnter={(e) => {
          touchable.onMouseEnter(e);
          //console.log("onMouseEnter");
        }}
        onMouseLeave={(e) => {
          touchable.onMouseLeave(e);
          //console.log("onMouseLeave");
        }}
        onMouseDown={(e) => {
          touchable.onMouseDown(e);
          //console.log("onMouseDown");
        }}
        onMouseUp={(e) => {
          touchable.onMouseUp(e);
          //console.log("onMouseUp");
          onPress();
        }}
        onClick={(e) => {
          touchable.onClick(e);
          //console.log("onClick");
        }}
        onTouchStart={(e) => {
          touchable.onTouchStart(e);
          //console.log("onTouchStart");
        }}
        onTouchEnd={(e) => {
          touchable.onTouchEnd(e);
          //console.log("onTouchEnd");
        }}
        onTouchCancel={(e) => {
          touchable.onTouchCancel(e);
          //console.log("onTouchCancel");
        }}
        style={style.state}
        className={classes}
        {...forwardedProps}
      >
        {children}
      </Container>
    );
  } catch (e) {
    console.log(e);
    return <div>{children}</div>;
  }
};

const buildClasses = (style, status) => {
  const { elevation } = style.state;

  let classes = styles.baseline;
  if (elevation) classes += styles.elevations[elevation];

  if (isMobile) {
    style.set("opacity", status.touched ? 0.6 : 1);
  } else {
    if (status.down) style.set("opacity", 0.4);
    else if (status.hover) style.set("opacity", 0.6);
  }
  return classes;
};

const buildContainer = ({ variant, Component }) => {
  let layout = (props) => <div {...props}>{props.children}</div>;
  if (variant === "button") {
    layout = (props) => <button {...props}>{props.children}</button>;
  } else if (variant === "form") {
    layout = (props) => <form {...props}>{props.children}</form>;
  }
  return layout;
};

const buildStyle = (
  {
    flex,
    row,
    items,
    align,
    self,
    height,
    hmax,
    hmin,
    width,
    wmax,
    wmin,
    mode,
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
    noborder,
    color,
    bgColor,
    bdColor,
    radius,
    nowrap,
    nooverflow,
    elevation,
  },
  status
) => {
  let style = LayoutModel();
  if (flex) style.flex(flex);
  if (row) style.row().itemsCenter();
  if (items) style.items(items);
  if (align) style.align(align);
  if (self) style.self(self);
  if (height) style.height(height);
  if (hmax !== undefined) style.hmax(hmax);
  if (hmin !== undefined) style.hmin(hmin);
  if (width) style.width(width);
  if (wmax !== undefined) style.wmax(wmax);
  if (wmin !== undefined) style.wmin(wmin);
  if (mode) style[mode](color);
  if (margin !== undefined) style.margin(margin);
  if (marginV !== undefined) style.marginV(marginV);
  if (marginH !== undefined) style.marginH(marginH);
  if (marginT !== undefined) style.marginT(marginT);
  if (marginB !== undefined) style.marginB(marginB);
  if (marginL !== undefined) style.marginL(marginL);
  if (marginR !== undefined) style.marginR(marginR);
  if (padding !== undefined) style.padding(padding);
  if (paddingV !== undefined) style.paddingV(paddingV);
  if (paddingH !== undefined) style.paddingH(paddingH);
  if (paddingT !== undefined) style.paddingT(paddingT);
  if (paddingB !== undefined) style.paddingB(paddingB);
  if (paddingL !== undefined) style.paddingL(paddingL);
  if (paddingR !== undefined) style.paddingR(paddingR);
  if (noborder) style.noborder();
  if (bgColor) style.bgColor(bgColor);
  if (bdColor) style.bdColor(bdColor);
  if (radius !== undefined) style.radius(radius);
  if (nowrap) style.nowrap();
  if (nooverflow) style.nooverflow();
  if (elevation !== undefined) style.elevation(elevation);
  return style;
};

export default Touchable;
