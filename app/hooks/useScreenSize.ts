// /app/hooks/useScreenSize.ts

import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreen("mobile");
      else if (width >= 640 && width < 1024) setScreen("tablet");
      else setScreen("desktop");
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
};
