import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../fragments/Layout";
import HeaderBar from "../../components/HeaderBar";
import IconCard1x3 from "../../components/IconCard1x3";
import StoreIcon from "@material-ui/icons/Store";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { dimensions } from "../../services";
import { connect } from "react-redux";
import Typo from "../../fragments/Typo";
import palette from "../../constants/colors/palette";
import { grey } from "../../constants/colors/colors";
import Button from "../../components/Button";
import TextField from "./components/TextField";
import Carousel from "react-elastic-carousel";
import App from "../../system/App";

let app = App().do("init")();
let render = 0;

const { vh, vw, vmin } = dimensions;

const AuthPage = (props) => {
  let user = {
    email: "pierre.petiteau.4985@gmail.com",
    password: "pp169518185",
  };
  console.log("render ", render);
  render++;

  let logLevel = app.get("config")?.get("logLevel");

  useEffect(() => {
    const fn = async () => {
      await app.as("auth").do("login")(user.email, user.password);
      await app.as("auth").do("logout")();
    };
    fn();
  }, [logLevel]);

  return (
    <Layout page={true} row={true} bgColor={grey[900]}>
      <Layout hmix={vh(0.2)} items="end">
        <Layout
          variant="button"
          onPress={() => {
            console.log(logLevel);
            app.get("config")?.set("logLevel", logLevel + 1);
            console.log(app.get("config")?.get("logLevel"));
          }}
          forwardedProps={{ type: "submit" }}
          marginT="auto"
          row={true}
          contained={palette.action.main}
          hmix={vh(0.08)}
        >
          <Typo h6={true} color={palette.text.secondary}>
            Suivant
          </Typo>
        </Layout>
      </Layout>
      {/* <Layout noborder={true} wmax={vmin(1)}>
        <Layout row={true} hmix={vh(0.2)}>
          <Typo h3={true} color={palette.text.secondary} textShadow={true}>
            Connexion
          </Typo>
        </Layout>
        <form>
          <Layout items="center" hmin={vh(0.5)} wmin={vw(1)}>
            <Carousel itemsToShow={1}>
              <TextField name="mail" label="Email" inputProps={{}} />
              <TextField
                name="password"
                label="Mot de passe"
                inputProps={{
                  type: "password",
                }}
              />
            </Carousel>
          </Layout>
        </form>
      </Layout> */}
    </Layout>
  );
};

const useLogic = () => {
  const router = useHistory();

  const headerHandlePress = () => {
    router.push("/");
  };
  const storeHandlePress = () => {
    router.push("/stores");
  };
  const listsHandlePress = () => {
    router.push("/lists");
  };
  const shoppingHandlePress = () => {
    router.push("/shopping");
  };

  return {
    headerHandlePress,
    storeHandlePress,
    listsHandlePress,
    shoppingHandlePress,
  };
};

const MapStateToProps = (state) => ({
  app: state.app,
  auth: state.auth,
});

export default connect(MapStateToProps)(AuthPage);
