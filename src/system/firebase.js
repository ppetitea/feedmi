import canHandleModel from "../models/handlers/canHandleModel";
import canHandleRole from "../models/handlers/canHandleRole";
import firebase from "firebase/app";
import "firebase/auth";

const Firebase = (init = {}, app) => {
  let model = {
    state: {
      config: {
        apiKey: "AIzaSyAjMN8ziJ-V3Yepzy2EzDBbNrStSnqP8FI",
        authDomain: "feedmi-7c574.firebaseapp.com",
        databaseURL:
          "https://feedmi-7c574-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "feedmi-7c574",
        storageBucket: "feedmi-7c574.appspot.com",
        messagingSenderId: "351827549147",
        appId: "1:351827549147:web:2bdf80dd902fe64ac6e5fe",
      },
      logged: false,
      email: null,
      password: null,
      actions: ["init"],
      ...init,
    },
  };

  const behavior = (model, app) => ({
    ...canHandleModel(model),
    ...canHandleRole(model, app),
    ...canHandleFirebase(model, app),
  });
  Object.assign(model, behavior(model, app));
  return model;
};

const canHandleFirebase = (model, app) => ({
  ...canHandleFirebaseActions(model, app),
  ...canHandleFirebaseRequest(model, app),
  hasEmailAndPassword: () => {
    const email = model.get("email");
    const pass = model.get("password");
    if (email && email !== "" && pass && pass !== "") return true;
    else return false;
  },
});

const canHandleFirebaseActions = (model, app) => ({
  init: () => {
    if (!firebase.apps.length) firebase.initializeApp(model.get("config"));
    else firebase.app(); // if already initialized, use that one
    if (model.hasEmailAndPassword()) {
      const email = model.get("email");
      const password = model.get("password");
      model.login(email, password);
    } else {
      model.set("actions", ["createUser", "login"]);
    }
    return model;
  },
  createUser: async (email, password) => {
    const req = async () => {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
    const payload = { req };
    const callbacks = {
      onSuccess: async (res) => {
        app.get("logger").info("createUser with success");
        model.set("email", email).set("password", password);
      },
      onFailure: (err) => {
        app.get("logger").error("fail to createUser");
        app.get("logger").error(err);
      },
    };
    await model.request(payload, callbacks);
    return model;
  },
  login: async (email, password) => {
    const req = async () => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    const payload = { req };
    const callbacks = {
      onSuccess: (res) => {
        app.get("logger").info("login with success");
        model.set("email", email).set("password", password);
        model.set("actions", ["logout"]);
      },
      onFailure: (err) => {
        app.get("logger").error("fail to login");
        app.get("logger").error(err);
      },
    };
    await model.request(payload, callbacks);
    return model;
  },
  logout: async () => {
    const req = async () => firebase.auth().signOut();
    const payload = { req };
    const callbacks = {
      onSuccess: (res) => {
        app.get("logger").info("logout with success");
        model.set("logged", false);
        model.set("password", null);
        model.set("actions", ["createUser", "login"]);
        // app.as("nav").do("offline")();
      },
      onFailure: (err) => {
        app.get("logger").error("fail to logout");
        app.get("logger").error(err);
      },
    };
    await model.request(payload, callbacks);
    return model;
  },
});

const canHandleFirebaseRequest = (model, app) => ({
  request: async (
    payload,
    {
      onPending = () => {},
      onPendingEnd = () => {},
      onSuccess = () => {},
      onFailure = () => {},
    }
  ) => {
    const { req } = payload;
    onPending();
    await req()
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

export default Firebase;
