import React from "react";
import { dimensions } from "../services";
import Layout from "../fragments/Layout";
import Typo from "../fragments/Typo";
import palette from "../constants/colors/palette";

const { vh } = dimensions;

const Button = (props) => {
  const {
    children,
    type = "primary",
    mode = "contained",
    typoProps = {},
    onPress = () => {},
  } = props;

  const isContained = mode === "contained";
  const isPrimary = type === "primary";
  const layoutColor = () => {
    const variant1 = isPrimary ? "primary" : "secondary";
    const variant2 = isContained ? "main" : "border";
    return palette[variant1][variant2];
  };

  let nextProps = {
    row: true,
    radius: 20,
    hmax: 40,
    self: "stretch",
    variant: "button",
    onPress,
    ...props,
  };
  if (isContained) {
    nextProps.contained = layoutColor();
  } else {
    nextProps.outlined = layoutColor();
    nextProps.bgColor = palette.other.white;
  }

  const textColor = () => {
    const variant1 = isPrimary ? "primary" : "secondary";
    const variant2 = isContained ? "text" : "main";
    return palette[variant1][variant2];
  };
  const typoNextProps = {
    color: textColor(),
    variant: "button",
    ...typoProps,
  };

  return (
    <Layout {...nextProps}>
      <Typo {...typoNextProps}>{children}</Typo>
    </Layout>
  );
};

export default Button;
