import { useState, useEffect } from "react";

const useDelay = (ms) => {
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    // Happens when a dependency changes
    if (delayed) {
      const timer = setTimeout(() => {
        setDelayed(false);
      }, ms);

      return function cleanup() {
        // Happens when the component unmounts
        clearTimeout(timer);
      };
    }
  }, [delayed, ms]);
  return [delayed, setDelayed];
};

export default useDelay;
