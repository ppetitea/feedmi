import axios from "axios";

export const GET = "getRequest";
export const PUT = "putRequest";
export const PATCH = "patchRequest";
export const DEL = "delRequest";

export const Axios = (init = {}) => {
  let model = {
    state: {
      timeout: 60 * 1000,
      ...init,
    },
  };

  const behavior = (model) => ({
    ...canHandleRequest(model),
  });
  Object.assign(model, behavior(model));
  return model;
};

const canHandleRequest = (model) => ({
  request: async (
    payload,
    {
      onPending = () => {},
      onPendingEnd = () => {},
      onSuccess = () => {},
      onFailure = () => {},
    }
  ) => {
    const config = {
      timeout: model.state.timeout,
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
      },
      ...payload,
    };

    onPending();
    await axios(config)
      .then(function (res) {
        onPendingEnd();
        onSuccess(res?.data);
        return res?.data;
      })
      .catch(function (err) {
        onPendingEnd();
        onFailure(err);
        return err?.response;
      });
  },
  get: async ({ url }, callbacks) => {
    const payload = { method: "get", url };
    await model.request(payload, callbacks);
  },
  put: async ({ url, data }, callbacks) => {
    const payload = { method: "put", url, data: JSON.parse(data) };
    await model.request(payload, callbacks);
  },
  patch: async ({ url, data }, callbacks) => {
    const payload = { method: "patch", url, data: JSON.parse(data) };
    await model.request(payload, callbacks);
  },
  del: async ({ url, data }, callbacks) => {
    const payload = { method: "del", url, data: JSON.parse(data) };
    await model.request(payload, callbacks);
  },
});

export default Axios;
