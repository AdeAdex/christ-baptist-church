"use client";

import { FiUser } from "react-icons/fi";
import { useAppSelector } from "@/app/redux/hooks";
import ThemeToggle from "../ThemeToggle";
import { Burger } from "@mantine/core";

export default function DashboardNavbar({
  toggleSidebar,
  toggleDrawer,
}: {
  toggleSidebar: () => void;
  toggleDrawer: () => void;
}) {
  const member = useAppSelector((state) => state.auth.member);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-2xl border-b border-gray-300 dark:border-gray-600 dark:bg-gray-600 bg-gray-50">
      {/* Sidebar/Mobile Drawer Toggle Button */}
      <Burger
        className="md:hidden" // Show only on mobile
        onClick={toggleDrawer}
        aria-label="Toggle mobile navigation"
      />
      <Burger
        className="hidden md:flex" // Show only on desktop
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      />

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
