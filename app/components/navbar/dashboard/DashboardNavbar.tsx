"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSnackbar } from "notistack";
import { handleLogout } from "@/app/actions/logout";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import { Avatar, Burger, Menu } from "@mantine/core";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import NotificationIcon from "./notification-icon/NotificationIcon";

export default function DashboardNavbar({
  isSidebarOpen,
  toggleSidebar,
  toggleDrawer,
  setLoading,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleDrawer: () => void;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const member = useAppSelector((state) => state.auth.member);

  return (
    <nav
  className={`fixed transition-all duration-300 z-50 right-0 ${
    isSidebarOpen ? "w-full md:w-[calc(100%-16rem)]" : "w-full md:w-[calc(100%-5rem)]"
  } flex items-center justify-between px-6 py-4  bg-primary-button text-white`}
>

      {/* Sidebar/Mobile Drawer Toggle Button */}
      <Burger
        className="md:hidden" // Show only on mobile
        onClick={toggleDrawer}
        aria-label="Toggle mobile navigation"
        color="#fff"
      />
      <Burger
        className="hidden md:block" // Show only on desktop
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        color="#fff"
      />

      {/* Page Title */}
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Right Side: Profile & Theme Toggle */}
      <div className="flex items-center space-x-4">
        <NotificationIcon/>
        <ThemeToggle />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              src={member?.profilePicture}
              alt={`${member?.firstName} profile`}
              radius="xl"
              className="cursor-pointer"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => {
                setLoading(true); 
                router.push("/dashboard/settings");
              }}>
              <IoMdPerson size={20} className="mr-2 inline-block" />
              Settings
            </Menu.Item>
            <Menu.Item onClick={() => {
                setLoading(true); 
                router.push("/dashboard/home");
              }}>
              <IoMdSpeedometer size={20} className="mr-2 inline-block" />
              Dashboard
            </Menu.Item>
            <Menu.Item
              onClick={() => handleLogout(dispatch, router, enqueueSnackbar)}
              className="text-red-500"
            >
              <IoMdLogOut size={20} className="mr-2 inline-block" />
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
}
