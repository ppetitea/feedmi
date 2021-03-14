import React, { useEffect, useState } from "react";
import { ButtonBase, Icon, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import palette from "../../constants/colors/palette";
import * as colors from "../../constants/colors/colors";
import Layout from "../../fragments/Layout";
import Typo from "../../fragments/Typo";
import { dimensions } from "../../services";
import { connect } from "react-redux";

const { vh, vw, vmin } = dimensions;

const LoadingPage = ({ app, auth }) => {
  const logic = useLogic({ app, auth });

  return (
    <Layout page={true} bgColor={palette.primary.main}>
      <Layout items="center">
        <Typo variant="h6" flex={null} color={palette.other.white}>
          Loading
        </Typo>
      </Layout>
    </Layout>
  );
};

const useLogic = ({ auth, app }) => {
  const { token } = auth;
  const router = useHistory();

  /**
   * useEffect
   * if token => check token
   * else navig to /auth
   *
   * if token valid => load data
   * else wipe token & navig /auth
   *
   * if data loaded => canAccessSecureNav = true
   *
   */

  /**
   * setup auth flow (redux, persist, firebase)
   */

  const checkToken = (token, app) => {
    // firebase check token
  };

  useEffect(() => {
    if (token) checkToken(token);
    else router.push("/auth");
  }, [token]);

  return {};
};

const MapStateToProps = (state) => ({
  app: state.app,
  auth: state.auth,
});

export default connect(MapStateToProps)(LoadingPage);
