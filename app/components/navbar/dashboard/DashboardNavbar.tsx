"use client";

import { FiMenu, FiUser } from "react-icons/fi";
import { useAppSelector } from "@/app/redux/hooks";
import ThemeToggle from "../ThemeToggle";

export default function DashboardNavbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const member = useAppSelector((state) => state.auth.member);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-2xl border-b border-gray-300 dark:border-gray-600 dark:bg-gray-600 bg-gray-50">
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="text-2xl">
        <FiMenu />
      </button>

      {/* Page Title */}
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Right Side: Profile & Theme Toggle */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="flex items-center space-x-2">
          <FiUser className="text-xl" />
          <span>{member?.firstName || "User"}</span>
        </div>
      </div>
    </nav>
  );
}
