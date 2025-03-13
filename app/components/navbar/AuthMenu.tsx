"use client";

import { Menu, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import Link from "next/link";
import { logout } from "@/app/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { persistor } from "@/app/redux/store";
import { useSnackbar } from "notistack"; // ✅ Import useSnackbar

const AuthMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar(); // ✅ Initialize Snackbar
  const member = useAppSelector((state) => state.auth.member);


  let isSnackbarShown = false;

const handleLogout = async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });

    await persistor.flush();
    await persistor.purge();

    dispatch(logout());

    // ✅ Prevent multiple snackbars
    if (!isSnackbarShown) {
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      isSnackbarShown = true;
    }

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1000);
  } catch (error) {
    console.error("Logout failed:", error);
    enqueueSnackbar("Logout failed. Try again.", { variant: "error" });
  }
};


  return (
    <div className="flex items-center space-x-4">
      {member ? (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              src={member.profilePicture}
              alt="User Avatar"
              radius="xl"
              className="cursor-pointer"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => router.push("/profile")}>
              <IoMdPerson size={20} className="mr-2 inline-block" />
              Profile
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/dashboard")}>
              <IoMdSpeedometer size={20} className="mr-2 inline-block" />
              Dashboard
            </Menu.Item>
            <Menu.Item onClick={handleLogout} className="text-red-500">
              <IoMdLogOut size={20} className="mr-2 inline-block" />
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Link
          href="/login"
          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </Link>
      )}

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default AuthMenu;
