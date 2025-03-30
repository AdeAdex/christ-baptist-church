"use client";

import { useState, useEffect, ReactElement, ReactNode, cloneElement } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiSettings,
  FiUsers,
  FiCalendar,
  FiBookOpen,
  FiGift,
  FiBell,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSnackbar } from "notistack";
import { IChurchMember } from "@/app/types/user";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useAuthToken } from "@/app/hooks/useAuthToken";
import { fetchUser } from "@/app/actions/fetchUser";
import { handleLogout } from "@/app/actions/logout";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import DashboardNavbar from "@/app/components/navbar/dashboard/DashboardNavbar";
import LogoSection from "@/app/components/navbar/LogoSection";
import BackdropLoader from "@/app/components/BackdropLoader"; // ✅ Import Backdrop Loader

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarLinks = [
  { name: "Dashboard", path: "home", icon: FiGrid, adminOnly: false },
  { name: "Settings", path: "settings", icon: FiSettings, adminOnly: false },
  { name: "Ministries", path: "ministries", icon: FiBookOpen, adminOnly: false },
  { name: "Events", path: "events", icon: FiCalendar, adminOnly: false },
  { name: "Donations", path: "donations", icon: FiGift, adminOnly: false },
  { name: "Announcements", path: "announcements", icon: FiBell, adminOnly: false },
  { name: "Members", path: "members", icon: FiUsers, adminOnly: true },
  { name: "Reports", path: "reports", icon: FiBarChart2, adminOnly: true },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useIsMobile();
  const token = useAuthToken();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [drawerOpened, { toggle: toggleDrawer, open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [loading, setLoading] = useState(false); // ✅ Track loading state

  const member = useAppSelector((state) => state.auth.member);

  useEffect(() => {
    fetchUser(dispatch, token, enqueueSnackbar);
  }, [token, dispatch, enqueueSnackbar]);

  // Hide loader when route changes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  if (!member) return <div className="text-center py-10 text-xl">Loading...</div>;

  return (
    <div className="flex h-screen dark:bg-dark-mode relative">

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <motion.aside
          className={`bg-sidebar-blue text-white h-full flex flex-col transition-all ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
          initial={{ width: "5rem" }}
          animate={{ width: isSidebarOpen ? "16rem" : "5rem" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center items-center py-3 shadow-2xl border-b border-gray-300 dark:border-gray-600">
            <LogoSection width={45} height={45} textClassName="text-xs md:text-xs" isSidebarOpen={isSidebarOpen} />
          </div>

          <div className="flex flex-col p-4 mt-5">
            <ul className="space-y-4 flex-1">
              {sidebarLinks
                .filter((link) => !link.adminOnly || member?.role === "admin")
                .map(({ name, path, icon: Icon }) => (
                  <li
                    key={path}
                    className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                      pathname === `/dashboard/${path}` ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setLoading(true); // ✅ Show backdrop before navigating
                      router.push(`/dashboard/${path}`);
                    }}
                  >
                    <Icon className="text-2xl" />
                    {isSidebarOpen && <span>{name}</span>}
                  </li>
                ))}
            </ul>

            <ThemeToggle />

            {/* Logout Button (Desktop) */}
            <button
              onClick={() => handleLogout(dispatch, router, enqueueSnackbar)}
              className="flex items-center space-x-3 p-2 rounded-md cursor-pointer text-red-400 hover:bg-red-600"
            >
              <FiLogOut className="text-2xl" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
      {loading && <BackdropLoader />}
        <DashboardNavbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} toggleDrawer={toggleDrawer} setLoading={setLoading}/>
        {cloneElement(children as ReactElement<{ member: IChurchMember }>, { member })}
      </div>

      {/* Mobile Drawer */}
      <Drawer opened={drawerOpened} onClose={closeDrawer} title="Menu" padding="md">
        <ul className="space-y-4">
          {sidebarLinks
            .filter((link) => !link.adminOnly || member?.role === "admin")
            .map(({ name, path, icon: Icon }) => (
              <li
                key={path}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setLoading(true); // ✅ Show backdrop before navigating
                  router.push(`/dashboard/${path}`);
                  closeDrawer();
                }}
              >
                <Icon className="text-2xl" />
                <span>{name}</span>
              </li>
            ))}
        </ul>

        <ThemeToggle />

        {/* Logout Button (Mobile) */}
        <button
          onClick={() => handleLogout(dispatch, router, enqueueSnackbar)}
          className="mt-4 flex items-center space-x-3 p-2 rounded-md text-red-500 hover:bg-red-600 cursor-pointer w-full"
        >
          <FiLogOut className="text-2xl" />
          <span>Logout</span>
        </button>
      </Drawer>
    </div>
  );
}
