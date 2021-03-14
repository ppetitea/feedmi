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
import Button from "../../components/Button";
import TextField from "./components/TextField";
import Carousel from "react-elastic-carousel";
import App from "../../system/app";

const app = App().do("init")();

const { vh, vw, vmin } = dimensions;

const AuthPage = (props) => {
  const {
    headerHandlePress,
    storeHandlePress,
    listsHandlePress,
    shoppingHandlePress,
  } = useLogic();
  const items = [
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ];

  let user = {
    email: "pierre.petiteau.4985@gmail.com",
    password: "pp169518185",
  };
  useEffect(() => {
    const fn = async () => {
      console.log("start");
      await app.as("auth").do("createUser")(user.email, user.password);
      await app.as("auth").do("login")(user.email, user.password);
      await app.as("auth").do("logout")();
      console.log("stop");
    };
    fn();
  }, []);

  return (
    <Layout page={true} row={true}>
      <Layout noborder={true} wmax={vmin(1)}>
        {/* <Layout row={true} hmix={vh(0.2)}>
          <Typo h3={true} color={palette.text.secondary} textShadow={true}>
            Connexion
          </Typo>
        </Layout> */}
        {/* <form>
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
        </form> */}
        <Layout hmix={vh(0.2)} items="end">
          <Layout
            variant="button"
            onPress={() => {}}
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
      </Layout>
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
