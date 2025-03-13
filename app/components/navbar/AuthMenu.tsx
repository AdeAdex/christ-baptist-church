"use client";

import { Menu, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import Link from "next/link";
import { logout } from "@/app/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

const AuthMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const member = useAppSelector((state) => state.auth.member);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
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
