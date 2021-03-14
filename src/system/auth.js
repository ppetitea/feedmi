import canHandleModel from "../models/handlers/canHandleModel";
import canHandleRole from "../models/handlers/canHandleRole";
import { request } from "../services";

const Auth = (init = {}, app) => {
  let model = {
    state: {
      tokenValid: false,
      token: null,
      login: null,
      actions: ["init"],
      ...init,
    },
  };

  const behavior = (model, app) => ({
    ...canHandleModel(model),
    ...canHandleRole(model),
    ...canHandleAuth(model, app),
  });
  Object.assign(model, behavior(model, app));
  return model;
};

const canHandleAuth = (model, app) => ({
  init: () => {
    if (model.notEqual("token", undefined)) model.checkToken();
    else model.logout();
  },
  checkToken: async () => {
    const url = `example.com`;
    await request.get(url, {
      onSuccess: () => {
        model.set("tokenValid", true);
        model.set("actions", ["logout"]);
      },
      onFailure: () => {
        model.set("tokenValid", false);
        model.set("actions", ["signin", "resetPassword", "login"]);
      },
    });
  },
  signin: async (data) => {
    const url = `example.com`;
    const payload = { url, data };
    await request.get(payload, {
      onSuccess: () => {},
      onFailure: () => {
        model.set("tokenValid", false);
      },
    });
  },
  login: async () => {
    const url = `example.com`;
    const payload = { url, data };
    await request.get(payload, {
      onSuccess: () => {},
      onFailure: () => {
        model.set("tokenValid", false);
      },
    });
  },
  logout: async () => {
    const url = `example.com`;
    const payload = { url, data };
    await request.get(payload, {
      onSuccess: () => {},
      onFailure: () => {
        model.set("tokenValid", false);
      },
    });
  },
  resetPassword: async () => {
    const url = `example.com`;
    const payload = { url, data };
    await request.get(payload, {
      onSuccess: () => {},
      onFailure: () => {
        model.set("tokenValid", false);
      },
    });
  },
});

export default Auth;
