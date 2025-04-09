// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isDashboard = pathname.includes("/dashboard");

  const bodyClass = `${
    isHomePage || isDashboard ? "" : "mt-[100px] px-4 md:px-16 py-0"
  }`;

  return (
    <div className={bodyClass}>
      {!isDashboard && <Navbar />}
      {children}
    </div>
  );
}
