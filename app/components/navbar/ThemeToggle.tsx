"use client";

import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check and set the theme on initial load
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button className="cursor-pointer my-auto" onClick={toggleTheme}>
      <div className="toggle my-auto">
        <input type="checkbox" />
        <span className={`button bg-slate-300 dark:bg-white`}></span>

        <span className="label"> {isDarkMode ? "☼" : "🌙"}</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
