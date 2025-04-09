import React from "react";
import "@/app/components/Loader.css"; // Import your CSS file for loader styles

const Loader = () => {
  return (
    <figure className="loader">
      <div className="dot white"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </figure>
  );
};

export default Loader;
