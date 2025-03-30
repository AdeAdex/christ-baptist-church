"use client";

import PageTransitionLoader from "./PageTransitionLoader";

export default function BackdropLoader() {
  return (
    <div className="absolute inset-0 bg-sidebar-blue/50 bg-opacity-40 flex items-center justify-center z-40 transition-opacity duration-300">
      <PageTransitionLoader />
    </div>
  );
}
