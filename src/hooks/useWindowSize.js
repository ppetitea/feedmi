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
  const min = width < height ? width : height;
  const max = width > height ? width : height;

  const vw = (k) => width * k;
  const vh = (k) => height * k;
  const vmin = (k) => min * k;
  const vmax = (k) => max * k;

  return { width, height, vh, vw, vmin, vmax };
};

export default useWindowSize;
