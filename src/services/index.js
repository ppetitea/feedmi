import { appConfig } from "../config";
import Config from "../models/Config";
import { Axios } from "../models/Axios";
import Dimensions from "../models/Theme/Dimension";
const config = Config(appConfig);
const dimensions = Dimensions();
const request = Axios();

export { config, dimensions, request };
