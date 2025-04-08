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
            <Menu.Item onClick={() => router.push("/dashboard/settings")}>
              <IoMdPerson size={20} className="mr-2 inline-block" />
              Settings
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/dashboard/home")}>
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
        href="/member/register"
        className="px-4 lg:px-12 py-[5px] font-[400] text-[16px] rounded-3xl bg-secondary-button hover:bg-primary-button-hover transition duration-300"
      >
        Sign Up
      </Link>
      )}

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default AuthMenu;
