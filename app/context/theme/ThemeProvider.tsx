// "use client";
// import { useEffect, useState } from "react";

// export default function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") || "light";
//     const isDark = storedTheme === "dark";
//     setIsDarkMode(isDark);
//     document.documentElement.classList.toggle("dark", isDark);
//   }, []);

//   return <>{children}</>;
// }





"use client";
import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return <>{children}</>;
}
