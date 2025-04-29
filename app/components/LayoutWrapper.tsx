// /app/components/LayoutWrapper.tsx


"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import useAuthSync from "@/app/hooks/useAuthSync";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useAuthSync();


  const isHomePage = pathname === "/";

  const isMinimalLayoutPage =
    pathname.includes("/dashboard") ||
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/forgot-password") ||
    pathname.includes("/reset-password") ||
    pathname.includes("/verify-email");

  const bodyClass = `${
    isHomePage || isMinimalLayoutPage ? "" : "mt-[100px] px-4 md:px-16"
  }`;

  return (
    <div>
      {!isMinimalLayoutPage && <Navbar />}
      <div className={bodyClass}>{children}</div>
      {!isMinimalLayoutPage && <Footer />}
    </div>
  );
}
