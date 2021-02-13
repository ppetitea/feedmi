import React from "react";
import { Typography as Typo } from "@material-ui/core";
import TypographyModel from "../models/Theme/Typography";

const Typography = (props) => {
  const { children } = props;

  try {
    const style = buildStyle(props);
    return <Typo style={style.state}>{children}</Typo>;
  } catch (e) {
    console.log(e);
    return <Typo>{children}</Typo>;
  }
};

const buildStyle = ({
  flex,
  top,
  bottom,
  left,
  right,
  center,
  centerV,
  justify,
  size,
  weight,
  spacing,
  color,
  lowercase,
  uppercase,
  capitalize,
  italic,
  variant,
  nowrap,
  nooverflow,
}) => {
  let typo = TypographyModel();

  if (variant) typo.variant(variant);
  if (flex) typo.flex(flex);
  if (top) typo.top();
  if (bottom) typo.bottom();
  if (left) typo.left();
  if (right) typo.right();
  if (center) typo.center();
  if (centerV) typo.centerV();
  if (justify) typo.justify();
  if (size) typo.size(size);
  if (weight) typo.weight(weight);
  if (spacing) typo.spacing(spacing);
  if (color) typo.color(color);
  if (lowercase) typo.lowercase();
  if (uppercase) typo.uppercase();
  if (capitalize) typo.capitalize();
  if (italic) typo.italic();
  if (nowrap) typo.nowrap();
  if (nooverflow) typo.nooverflow();
  return typo;
};

export default Typography;
