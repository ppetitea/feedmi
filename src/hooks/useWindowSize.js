import React, { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width, height } = size;
  const vw = (k) => width * k;
  const vh = (k) => height * k;

  return { width, height, vh, vw };
};

export default useWindowSize;
