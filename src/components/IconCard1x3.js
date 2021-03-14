import React from "react";
import palette from "../constants/colors/palette";
import Layout from "../fragments/Layout";
import Typo from "../fragments/Typo";
import { dimensions } from "../services";

const { vh, vw, vmin } = dimensions;

const IconCard1x3 = (props) => {
  const {
    IconComponent,
    label,
    labelProps = {},
    layoutProps = {},
    iconStyle = {},
    onPress = () => {},
  } = props;

  return (
    <Layout
      hmix={vw(0.3)}
      wmix={vw(0.3)}
      contained={palette.other.white}
      variant="button"
      effect="opacity"
      onPress={onPress}
      {...layoutProps}
    >
      <IconComponent
        style={{
          color: palette.text.secondary,
          height: vmin(0.22),
          width: vmin(0.22),
          ...iconStyle,
        }}
      />
      <Typo variant="subtitle1" {...labelProps}>
        {label}
      </Typo>
    </Layout>
  );
};

export default IconCard1x3;
