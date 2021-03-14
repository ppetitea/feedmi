import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../fragments/Layout";
import HeaderBar from "../../components/HeaderBar";
import IconCard1x3 from "../../components/IconCard1x3";
import StoreIcon from "@material-ui/icons/Store";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { dimensions } from "../../services";
import { connect } from "react-redux";

const { vh, vw, vmin } = dimensions;

const HomePage = (props) => {
  const {} = props;

  const {
    headerHandlePress,
    storeHandlePress,
    listsHandlePress,
    shoppingHandlePress,
  } = useLogic();

  return (
    <Layout page={true}>
      <HeaderBar title="FeedMi" onPress={headerHandlePress} />
      <Layout flex={null} row={true} items="start" noborder={true} wrap={true}>
        <IconCard1x3
          onPress={storeHandlePress}
          label="Magasins"
          IconComponent={StoreIcon}
        />
        <IconCard1x3
          onPress={listsHandlePress}
          label="Listes"
          IconComponent={FormatListBulletedIcon}
        />
        <IconCard1x3
          onPress={shoppingHandlePress}
          label="Courses"
          IconComponent={ShoppingCartIcon}
        />
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

export default connect(MapStateToProps)(HomePage);
