import React, { useState, useRef } from "react";
import LayoutModel from "../models/Theme/Layout";
import Model from "../models/Theme/Touchable";
import styles from "../constants/theme";
import { isMobile } from "react-device-detect";
import { HSL } from "../constants/colors/palette";

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

const Layout = (props) => {
  const { children, forwardedProps = {}, onPress } = props;

  const touchable = useTouchable(props);

  try {
    let style = LayoutModel().fromProps(props);

    if (onPress) {
      layoutEffect(props, style, touchable.status);
      return (
        <div
          onMouseEnter={(e) => touchable.onMouseEnter(e)}
          onMouseLeave={(e) => touchable.onMouseLeave(e)}
          onMouseDown={(e) => touchable.onMouseDown(e)}
          onMouseUp={(e) => {
            touchable.onMouseUp(e);
            onPress(e);
          }}
          onClick={(e) => touchable.onClick(e)}
          onTouchStart={(e) => touchable.onTouchStart(e)}
          onTouchEnd={(e) => touchable.onTouchEnd(e)}
          onTouchCancel={(e) => touchable.onTouchCancel(e)}
          style={style.state}
          className={style.classes}
          {...forwardedProps}
        >
          {children}
        </div>
      );
    } else {
      return (
        <div style={style.state} className={style.classes} {...forwardedProps}>
          {children}
        </div>
      );
    }
  } catch (e) {
    console.log(e);
    return <div>{children}</div>;
  }
};

const layoutEffect = ({ effect }, style, status) => {
  if (!style.get("backgroundColor")) return null;

  const bgColor = HSL().parse(style.get("backgroundColor"));
  if (!effect) effect = bgColor.state.l > 70 ? "dark" : "light";
  if (isMobile) {
    if (effect === "dark") {
      if (status.touched) style.bgColor(bgColor.darker().string());
    } else if (effect === "light") {
      if (status.touched) style.bgColor(bgColor.lighter().string());
    } else if (effect === "opacity") {
      style.set("opacity", status.touched ? 0.6 : 1);
    }
  } else {
    if (effect === "dark") {
      if (status.hover) style.bgColor(bgColor.darker(5).string());
      if (status.down) style.bgColor(bgColor.darker(10).string());
    } else if (effect === "light") {
      if (status.hover) style.bgColor(bgColor.lighter(5).string());
      if (status.down) style.bgColor(bgColor.lighter(10).string());
    } else if (effect === "opacity") {
      if (status.down) style.set("opacity", 0.4);
      else if (status.hover) style.set("opacity", 0.6);
    }
  }
};

// const buildStyle = (props) => {
//   let style = LayoutModel();
//   Object.entries(props).map((item) => style.run(item));
//   return style;
// };

// const buildClasses = (props) => {
//   let classes = "";
//   for (const [key, value] of Object.entries(props)) {
//     if (styles[key]) {
//       if (Array.isArray(styles[key])) classes += styles[key][value];
//       else classes += styles[key];
//     }
//   }
//   return classes;
// };

export default Layout;
