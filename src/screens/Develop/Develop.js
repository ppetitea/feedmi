import { config } from "../../services";

const DevelopPage = (props) => {
  const {} = props;

  return (
    <div>
      <p>Developpement page</p>
      <p>Environnement {config.get("env")}</p>
    </div>
  );
};

export default DevelopPage;
