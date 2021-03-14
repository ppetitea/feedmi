import Auth from "../../models/Auth";
import { AUTH_SET } from "../constants";

const authReducer = (state = Auth().state, action) => {
  switch (action.type) {
    case AUTH_SET: {
      const nextState = { ...action.payload };
      return nextState;
    }
    default: {
      return state;
    }
  }
};

export { authReducer };
export default authReducer;
