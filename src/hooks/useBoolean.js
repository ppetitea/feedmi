import React, { useState } from "react";

const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const enable = () => setState(true);
  const disable = () => setState(false);
  const toggle = () => setState(!state);

  return { value: state, enable, disable, toggle };
};

export default useBoolean;
