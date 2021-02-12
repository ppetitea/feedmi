import { appConfig } from "../config";
import Config from "../models/Config";

const config = Config(appConfig);

export { config };
