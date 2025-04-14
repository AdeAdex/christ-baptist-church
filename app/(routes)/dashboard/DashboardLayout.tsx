"use client";

import {
  useState,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSnackbar } from "notistack";
import { IChurchMember } from "@/app/types/user";
import { useAuthToken } from "@/app/hooks/useAuthToken";
import { fetchUser } from "@/app/actions/fetchUser";
import { handleLogout } from "@/app/actions/logout";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import DashboardNavbar from "@/app/components/navbar/dashboard/DashboardNavbar";
import LogoSection from "@/app/components/navbar/LogoSection";
import BackdropLoader from "@/app/components/BackdropLoader";
import { sidebarLinks } from "@/app/data/sidebarLinks";
import { useScreenSize } from "@/app/hooks/useScreenSize";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const screen = useScreenSize();
  const token = useAuthToken();

  // console.log("token", token)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const member = useAppSelector((state) => state.auth.member);

  // Keep track of the previous pathname
  const prevPathname = useRef<string | null>(null);

  // Fetch user data
  // Fetch user data
  useEffect(() => {
    if (token === "loading") return; // ⏳ Wait until token is retrieved
    if (!token) {
      router.replace(`/${member?.role}/login`);
      return;
    }
    fetchUser(dispatch, token);
  }, [token, dispatch, router]);

  // Hide loader when route changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setLoading(false); // Set loader to false when the page path changes
    }
    prevPathname.current = pathname; // Update the previous pathname
  }, [pathname]);

  // 🚀 Redirect if not authenticated
  if (!token) return null; // Prevent rendering before redirect

  return (
    <div className="dark:bg-dark-mode">
      {/* Sidebar (Fixed on Desktop) */}
      {screen !== "mobile" && (
        <motion.aside
          className={`fixed top-0 left-0 h-screen bg-sidebar-blue text-white z-30 flex flex-col transition-all ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
          initial={{ width: "5rem" }}
          animate={{ width: isSidebarOpen ? "16rem" : "5rem" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center items-center py-3 shadow-2xl border-b border-gray-300 dark:border-gray-600">
            <LogoSection
              width={45}
              height={45}
              textClassName="text-xs md:text-xs"
              isSidebarOpen={isSidebarOpen}
            />
          </div>

          <div className="flex flex-col p-4 mt-5 flex-1 overflow-y-auto">
            <ul className="space-y-4 flex-1">
              {sidebarLinks
                .filter((link) => !link.adminOnly || member?.role === "admin")
                .map(({ name, path, icon: Icon }) => (
                  <li
                    key={path}
                    className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                      pathname === `/dashboard/${path}`
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      if (pathname !== `/dashboard/${path}`) {
                        setLoading(true);
                        router.push(`/dashboard/${path}`);
                      }
                    }}
                  >
                    <Icon className="text-2xl" />
                    {isSidebarOpen && <span>{name}</span>}
                  </li>
                ))}
            </ul>

            <ThemeToggle />

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

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ml-0 ${
          screen !== "mobile" ? (isSidebarOpen ? "ml-64" : "ml-20") : ""
        }`}
      >
        <div className="flex flex-col h-screen overflow-y-auto relative">
          {loading && <BackdropLoader />}

          <DashboardNavbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            toggleDrawer={toggleDrawer}
            setLoading={setLoading}
          />

          <div className="mt-[80px] px-4 pb-4">
            {cloneElement(
              children as ReactElement<{ member: IChurchMember | undefined }>,
              { member: member || undefined }
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {screen === "mobile" && (
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          title="Menu"
          padding="md"
          classNames={{
            header: "dark:bg-sidebar-blue",
            content: "dark:bg-sidebar-blue",
          }}
        >
          <ul className="space-y-4">
            {sidebarLinks
              .filter((link) => !link.adminOnly || member?.role === "admin")
              .map(({ name, path, icon: Icon }) => (
                <li
                  key={path}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setLoading(true);
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

          <button
            onClick={() => handleLogout(dispatch, router, enqueueSnackbar)}
            className="mt-4 flex items-center space-x-3 p-2 rounded-md text-red-500 hover:bg-red-600 cursor-pointer w-full"
          >
            <FiLogOut className="text-2xl" />
            <span>Logout</span>
          </button>
        </Drawer>
      )}
    </div>
  );
}
