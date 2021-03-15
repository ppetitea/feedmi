import moment from "moment";
import canHandleModel from "../models/handlers/canHandleModel";

export const TRACE = 0;
export const DEBUG = 1;
export const INFO = 2;
export const WARN = 3;
export const ERROR = 4;
export const NOLOG = 5;

const Log = (init = {}) => {
  let model = {
    state: {
      level: TRACE, // TRACE | DEBUG | INFO | WARN | ERROR
      date: moment().format("YY/MM/DD hh:mm:ss "),
      message: "",
      ...init,
    },
  };

  const behavior = (model) => ({
    ...canHandleModel(model),
    level: () => {
      let level = model.get("level");
      if (level === TRACE) return { label: "TRACE", color: "color: #607D8B" };
      if (level === DEBUG) return { label: "DEBUG", color: "color: #F0F3F5" };
      if (level === INFO) return { label: "INFO", color: "color: #00e5ff" };
      if (level === WARN) return { label: "WARN", color: "color: #FFC107" };
      if (level === ERROR) return { label: "ERROR", color: "color: #DC3545" };
      return { label: "UNKNOW", color: "color: pink" };
    },
    console: () => {
      const date = model.get("date");
      const level = model.level();
      const message = JSON.stringify(model.get("message"), null, 2);
      console.log(
        `%c${date} %c${level.label} ${message}`,
        "color: #607D8B",
        level.color
      );
      return model;
    },
  });
  Object.assign(model, behavior(model));
  return model;
};

export const Logger = (init = {}, app) => {
  let model = {
    state: {
      history: [],
      ...init,
    },
  };

  const behavior = (model, app) => ({
    ...canHandleModel(model),
    ...canHandleLogger(model, app),
    ...canHandleLoggerHistory(model, app),
  });
  Object.assign(model, behavior(model, app));
  return model;
};

const canHandleLogger = (model, app) => ({
  log: (log) => {
    const configLevel = app.get("config").get("logLevel", 0);
    if (log.get("level") >= configLevel) {
      log.console();
    }
    model.state.history.push(log);
  },
  trace: (message) => model.log(Log({ level: TRACE, message })),
  debug: (message) => model.log(Log({ level: DEBUG, message })),
  info: (message) => model.log(Log({ level: INFO, message })),
  warn: (message) => model.log(Log({ level: WARN, message })),
  error: (message) => model.log(Log({ level: ERROR, message })),
});

const canHandleLoggerHistory = (model, app) => ({
  showHistory: () => {
    for (const log of model.get("history")) log.console();
    return model;
  },
  resetHistory: () => model.set("history", []),
  keepLast: (n = 1) => {
    const lastNItems = model.get("history").slice(-n);
    model.setHistory(lastNItems);
    return model;
  },
  showLast: (n = 1) => {
    const lastNItems = model.get("history").slice(-n);
    lastNItems.map((log) => log.console());
    return model;
  },
  showTrace: () => {
    for (const log of model.get("history")) {
      if (log.equal("level", TRACE)) log.console();
    }
    return model;
  },
  showDebug: () => {
    for (const log of model.get("history")) {
      if (log.equal("level", DEBUG)) log.console();
    }
    return model;
  },
  showInfo: () => {
    for (const log of model.get("history")) {
      if (log.equal("level", INFO)) log.console();
    }
    return model;
  },
  showWarn: () => {
    for (const log of model.get("history")) {
      if (log.equal("level", WARN)) log.console();
    }
    return model;
  },
  showError: () => {
    for (const log of model.get("history")) {
      if (log.equal("level", ERROR)) log.console();
    }
    return model;
  },
});
