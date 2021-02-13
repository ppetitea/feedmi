import { ButtonBase } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import palette, { primary, secondary } from "../../constants/colors/palette";
import Layout from "../../fragments/Layout";
import Touchable from "../../fragments/Touchable";
import Typography from "../../fragments/Typography";
import useWindowSize from "../../hooks/useWindowSize";

const DevelopPage = (props) => {
  const {} = props;

  const { vh, vw } = useWindowSize();
  const router = useHistory();

  return (
    <Layout margin={0} height={vh(1)} width={vw(1)}>
      <Layout
        margin={10}
        mode="contained"
        color={"white"}
        elevation={4}
        onPress={() => console.log("button card")}
        hmax={vh(0.4)}
        bgColor={palette.primary.background}
        Component={ButtonBase}
      >
        {/* <Typography>Text d'exemple</Typography>
        <p>Environnement {config.get("env")}</p>
        <p>height {window.innerHeight}</p>
        <p>width {window.innerWidth}</p>
        <button onClick={() => history.push("/lost")}>Perdu</button>
        <button onClick={() => history.goBack()}>retour</button> */}
        <Layout
          marginT="auto"
          margin={10}
          row={true}
          mode="contained"
          color={primary}
          hmax={40}
        >
          <Typography color={palette.primary.text}>
            Ajouter un magasin
          </Typography>
        </Layout>
        <Layout
          variant={"button"}
          onPress={() => console.log("button secondary")}
          marginT="auto"
          margin={10}
          row={true}
          mode="contained"
          color={secondary}
          hmax={40}
        >
          <Typography variant="button" color={palette.primary.text}>
            Ajouter un magasin
          </Typography>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DevelopPage;
