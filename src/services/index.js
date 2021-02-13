import { appConfig } from "../config";
import Config from "../models/Config";
import Dimensions from "../models/Theme/Dimension";

const config = Config(appConfig);
const dimensions = Dimensions();

export { config, dimensions };
