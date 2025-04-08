"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isDashboard = pathname.includes("/dashboard");

  return (
    <div
      className={`${
        isHomePage || isDashboard ? "" : "mt-[100px] px-4 md:px-16 py-0"
      }`}
    >
      {!isDashboard && <Navbar />}
      {children}
    </div>
  );
};

export default LayoutWrapper;
