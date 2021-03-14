import React from "react";
import { dimensions } from "../services";
import Layout from "../fragments/Layout";
import palette from "../constants/colors/palette";

const { vh, vw } = dimensions;

const IconButton = (props) => {
  const { children, type = "primary", mode = "contained" } = props;

  const isContained = mode === "contained";
  const isPrimary = type === "primary";
  const layoutColor = () => {
    const variant1 = isPrimary ? "primary" : "secondary";
    const variant2 = isContained ? "main" : "border";
    return palette[variant1][variant2];
  };

  let nextProps = {
    row: true,
    radius: vh(0.06),
    wmix: vh(0.06),
    hmix: vh(0.06),
    self: "stretch",
    ...props,
  };
  if (isContained) {
    nextProps.bgColor = layoutColor();
  } else {
    nextProps.bdWidth = 1;
    nextProps.bdStyle = "solid";
    nextProps.bdColor = layoutColor();
    nextProps.bgColor = palette.other.white;
  }

  return <Layout {...nextProps}>{children}</Layout>;
};

export default IconButton;
