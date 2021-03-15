import App from "../../system/App";
import { APP_SET } from "../constants";

const appReducer = (state = App().do("init").state, action) => {
  switch (action.type) {
    case APP_SET: {
      const nextState = { ...action.payload };
      return nextState;
    }
    default: {
      return state;
    }
  }
};

export { appReducer };
export default appReducer;
