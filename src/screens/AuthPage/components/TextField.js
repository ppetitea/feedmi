import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../../fragments/Layout";
import { dimensions } from "../../../services";
import Typo from "../../../fragments/Typo";
import TypoModel from "../../../models/Theme/Typo";
import palette from "../../../constants/colors/palette";
import useBoolean from "../../../hooks/useBoolean";

const { vh, vw, vmin } = dimensions;

const TextField = (props) => {
  const { name, label, inputProps = {} } = props;

  const logic = useLogic();
  const { ref, fieldListeners, containerStyles } = logic;

  return (
    <Layout key={name} noborder={true} items="center">
      <Layout paddingL={10} flex={null} row={true}>
        <Typo h4={true} weight="bold">
          {label}
        </Typo>
      </Layout>
      <Layout
        flex={null}
        padding={10}
        row={true}
        outlined={palette.other.border}
        {...containerStyles}
      >
        <input
          key={name}
          ref={ref}
          type={"text"}
          {...fieldListeners}
          {...inputProps}
          {...TypoModel().h5().toProps()}
        />
      </Layout>
      <Layout paddingL={10} flex={null} row={true} noborder={true}>
        <Typo subtitle1={true} color={palette.error.main}></Typo>
      </Layout>
    </Layout>
  );
};

const useLogic = () => {
  const focused = useBoolean();
  const ref = useRef(null);
  const focus = () => ref?.current?.focus();
  const blur = () => ref?.current?.focus();

  const containerStyles = {
    bdColor: focused.value ? palette.primary.main : palette.other.border,
    bdWidth: focused.value ? 2 : 1,
    margin: focused.value ? 9 : 10,
  };
  const fieldListeners = {
    onFocus: () => {
      focused.enable();
      //   console.log(ref);
      //   focus();
    },
    onBlur: () => focused.disable(),
  };
  return { ref, fieldListeners, containerStyles };
};

export default TextField;
