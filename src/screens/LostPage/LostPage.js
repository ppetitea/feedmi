import React, { useEffect, useState } from "react";
import { ButtonBase, Icon, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import palette from "../../constants/colors/palette";
import * as colors from "../../constants/colors/colors";
import Layout from "../../fragments/Layout";
import Typo from "../../fragments/Typo";
import useWindowSize from "../../hooks/useWindowSize";
import HeaderBar from "../../components/HeaderBar";
import IconCard1x3 from "../../components/IconCard1x3";
import StoreIcon from "@material-ui/icons/Store";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import YouTubeIcon from "@material-ui/icons/YouTube";
import BatteryCharging20Icon from "@material-ui/icons/BatteryCharging20";
import BatteryCharging30Icon from "@material-ui/icons/BatteryCharging30";
import BatteryCharging50Icon from "@material-ui/icons/BatteryCharging50";
import BatteryCharging60Icon from "@material-ui/icons/BatteryCharging60";
import BatteryCharging80Icon from "@material-ui/icons/BatteryCharging80";
import BatteryCharging90Icon from "@material-ui/icons/BatteryCharging90";
import WorkIcon from "@material-ui/icons/Work";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { connect } from "react-redux";

const LostPage = (props) => {
  const {} = props;

  const { vh, vw, vmin } = useWindowSize();

  const logic = useLogic();

  return (
    <Layout page={true}>
      <HeaderBar title="Hein ?" onPress={logic.headerHandlePress} />
      <Layout flex={null} row={true} items="start" noborder={true} wrap={true}>
        <IconCard1x3
          onPress={() => logic.handlePress("battery")}
          label="Battery"
          IconComponent={logic.battery.Icon}
          iconStyle={{ color: logic.battery.color }}
        />
        <IconCard1x3
          onPress={() => logic.handlePress("work")}
          label="Work"
          IconComponent={WorkIcon}
          iconStyle={{ color: colors.brown[500] }}
        />
        <IconCard1x3
          onPress={() => logic.handlePress("playlist")}
          label="Playlist"
          IconComponent={YouTubeIcon}
          iconStyle={{ color: palette.error.main }}
        />
        <IconCard1x3
          onPress={() => logic.handlePress("tabata")}
          label="Tabata"
          IconComponent={FitnessCenterIcon}
          iconStyle={{ color: colors.grey[700] }}
        />
      </Layout>
    </Layout>
  );
};

const useLogic = () => {
  const router = useHistory();
  const battery = useBatteryLogic();

  const headerHandlePress = () => {
    router.push("/");
  };
  const handlePress = (v) => {
    switch (v) {
      case "playlist": {
        window.location.href = "https://www.youtube.com/watch?v=UuU7Aa3VwYs";
        break;
      }
      case "work": {
        window.location.href = "https://www.apis-artis.com/";
        break;
      }
      case "battery": {
        battery.next();
        break;
      }
      case "tabata": {
        window.location.href = "https://ppetitea.github.io/tabata/#/";
        break;
      }
      default: {
        console.log("no handler");
      }
    }
  };

  return {
    battery,
    headerHandlePress,
    handlePress,
  };
};

const useBatteryLogic = () => {
  const [index, setIndex] = useState(0);
  const data = [
    { Icon: BatteryCharging20Icon, color: palette.error.dark },
    { Icon: BatteryCharging30Icon, color: palette.error.main },
    { Icon: BatteryCharging50Icon, color: palette.warning.dark },
    { Icon: BatteryCharging60Icon, color: palette.warning.main },
    { Icon: BatteryCharging80Icon, color: palette.success.light },
    { Icon: BatteryCharging90Icon, color: palette.success.main },
  ];
  const next = () => {
    setIndex((index + 1) % data.length);
  };
  return {
    next,
    Icon: data[index].Icon,
    color: data[index].color,
  };
};

const MapStateToProps = (state) => ({
  app: state.app,
  auth: state.auth,
});

export default connect(MapStateToProps)(LostPage);
