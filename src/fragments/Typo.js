import React from "react";
import TypoModel from "../models/Theme/Typo";
import styles from "../constants/theme";

const Typo = (props) => {
  const { children, input, forwardedProps = {} } = props;

  try {
    const style = TypoModel().fromProps(props);
    const nextProps = { ...style.toProps(), ...forwardedProps };
    if (input) return <input {...nextProps} />;
    else return <span {...nextProps}>{children}</span>;
  } catch (e) {
    console.log(e);
    return <span>{children}</span>;
  }
};

export default Typo;
