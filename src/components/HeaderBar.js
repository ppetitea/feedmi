import React from "react";
import palette from "../constants/colors/palette";
import Layout from "../fragments/Layout";
import Typo from "../fragments/Typo";
import AppsIcon from "@material-ui/icons/Apps";
import { dimensions } from "../services";

const { vh, vw, vmin } = dimensions;

const HeaderBar = (props) => {
  const { title, onPress, showIcon = true } = props;

  return (
    <Layout row={true} items="start" hmix={vh(0.1)}>
      <Typo
        h3={true}
        color={palette.text.secondary}
        left={true}
        textShadow={true}
      >
        {title}
      </Typo>
      {showIcon ? (
        <Layout
          noborder={true}
          onPress={onPress}
          bgColor={palette.other.white}
          hmix={vmin(0.14)}
          wmix={vmin(0.14)}
          radius={vmin(0.14)}
          self="center"
          row={true}
        >
          <AppsIcon
            style={{
              color: palette.text.secondary,
              height: vmin(0.12),
              width: vmin(0.12),
            }}
          />
        </Layout>
      ) : null}
    </Layout>
  );
};

export default HeaderBar;
