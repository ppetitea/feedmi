import { AUTH_SET } from "../constants";

const authSet = (payload) => ({ type: AUTH_SET, payload });

export { authSet };
export default authSet;
