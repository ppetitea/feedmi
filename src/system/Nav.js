import canHandleModel from "../models/handlers/canHandleModel";
import canHandleRole from "../models/handlers/canHandleRole";

const Nav = (init = {}, app) => {
  let model = {
    state: {
      actions: ["offline", "secure", "goBack", "navigate", "replace"],
      ...init,
    },
  };

  const behavior = (model, app) => ({
    ...canHandleModel(model),
    ...canHandleRole(model, app),
    ...canHandleNav(model, app),
  });
  Object.assign(model, behavior(model, app));
  return model;
};

const canHandleNav = (model, app) => ({
  ...canHandleNavActions(model, app),
  ...canHandleNavRequest(model, app),
  hasEmailAndPassword: () => {
    const email = model.get("email");
    const pass = model.get("password");
    if (email && email !== "" && pass && pass != "") return true;
    else return false;
  },
});

const canHandleNavActions = (model, app) => ({
  init: () => {
    if (!firebase.apps.length) firebase.initializeApp(model.get("config"));
    else firebase.app(); // if already initialized, use that one
    console.log("init firebase");
    if (model.hasEmailAndPassword()) {
      const email = model.get("email");
      const password = model.get("password");
      model.login(email, password);
    } else {
      model.set("actions", ["createUser", "login"]);
      app.as("nav").do("offline");
    }
  },
  createUser: (email, password) => {
    const req = firebase.auth().createUserWithEmailAndPassword;
    const payload = { req, args: [email, password] };
    const callbacks = {
      onSuccess: (res) => {
        model.set("email", email).set("password", password);
        console.log(res);
      },
      onFailure: (err) => {
        console.log(err);
      },
    };
    model.request(payload, callbacks);
  },
  login: (email, password) => {
    const req = firebase.auth().signInWithEmailAndPassword;
    const payload = { req, args: [email, password] };
    const callbacks = {
      onSuccess: (res) => {
        console.log(res);
      },
      onFailure: (err) => {
        console.log(err);
      },
    };
    model.request(payload, callbacks);
  },
  logout: () => {
    const req = firebase.auth().signOut;
    const payload = { req };
    const callbacks = {
      onSuccess: (res) => {
        console.log(res);
        model.set("logged", false);
        model.set("password", null);
        app.as("nav").do("offline")();
      },
      onFailure: (err) => {
        console.log(err);
      },
    };
    model.request(payload, callbacks);
  },
});

const canHandleNavRequest = (model, app) => ({
  request: async (
    payload,
    {
      onPending = () => {},
      onPendingEnd = () => {},
      onSuccess = () => {},
      onFailure = () => {},
    }
  ) => {
    const { req, args = [] } = payload;
    onPending();
    await req(...args)
      .then((res) => {
        onPendingEnd();
        onSuccess(res);
        return res;
      })
      .catch((err) => {
        onPendingEnd();
        onFailure(err);
        return err;
      });
  },
});

export default Nav;
