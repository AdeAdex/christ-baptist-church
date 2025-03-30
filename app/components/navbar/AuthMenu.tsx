"use client";

import { Menu, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSnackbar } from "notistack"; // ✅ Import useSnackbar
import { handleLogout } from "@/app/actions/logout";

const AuthMenu = () => {
  const router = useRouter(); 
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar(); // ✅ Initialize Snackbar
  const member = useAppSelector((state) => state.auth.member);

 
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
            <Menu.Item onClick={() => router.push("/settings")}>
              <IoMdPerson size={20} className="mr-2 inline-block" />
              Settings
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/dashboard")}>
              <IoMdSpeedometer size={20} className="mr-2 inline-block" />
              Dashboard
            </Menu.Item>
            <Menu.Item onClick={() => handleLogout(dispatch, router, enqueueSnackbar)} className="text-red-500">
              <IoMdLogOut size={20} className="mr-2 inline-block" />
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Link
        href="/member/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
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
