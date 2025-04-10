// components/LayoutWrapper.tsx
// "use client";

// import { usePathname } from "next/navigation";
// import Navbar from "./navbar/Navbar";
// import Footer from "./footer/Footer";

// export default function LayoutWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isHomePage = pathname === "/";
//   const isDashboard = pathname.includes("/dashboard");

//   const bodyClass = `${
//     isHomePage || isDashboard ? "" : "mt-[100px] px-4 md:px-16 py-0"
//   }`;

//   return (
//     <div className={bodyClass}>
//       {!isDashboard && <Navbar />}
//       {children}
//       {!isDashboard && <Footer />}
//     </div>
//   );
// }







"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const isMinimalLayoutPage =
    pathname.includes("/dashboard") ||
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/forgot-password") ||
    pathname.includes("/reset-password") ||
    pathname.includes("/verify-email");

  const bodyClass = `${
    isHomePage || isMinimalLayoutPage ? "" : "mt-[100px] px-4 md:px-16 py-0"
  }`;

  return (
    <div className={bodyClass}>
      {!isMinimalLayoutPage && <Navbar />}
      {children}
      {!isMinimalLayoutPage && <Footer />}
    </div>
  );
}
