"use client";

import { Menu, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSnackbar } from "notistack"; // ✅ Import useSnackbar
import { handleLogout } from "@/app/actions/logout";


interface AuthMenuProps {
  setLoading?: (value: boolean) => void;
}

const AuthMenu = ({ setLoading }: AuthMenuProps) => {
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
          <Menu.Dropdown className="dark:bg-gray-900">
            <Menu.Item onClick={() => { 
                if (setLoading) setLoading(true); router.push("/dashboard/settings")}} className="dark:hover:!bg-gray-500 dark:text-white">
              <IoMdPerson size={20} className="mr-2 inline-block" />
              Settings
            </Menu.Item>
            <Menu.Item onClick={() => { 
                if (setLoading) setLoading(true); router.push("/dashboard/home")}} className="dark:hover:!bg-gray-500 dark:text-white">
              <IoMdSpeedometer size={20} className="mr-2 inline-block" />
              Dashboard
            </Menu.Item>
            <Menu.Item onClick={() => handleLogout(dispatch, router, enqueueSnackbar)} className="text-red-500 dark:hover:!bg-gray-500">
              <IoMdLogOut size={20} className="mr-2 inline-block" />
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Link
        href="/member/register"
        className="hidden lg:block px-4 lg:px-12 py-[5px] font-[400] text-[16px] rounded-3xl bg-secondary-button hover:bg-yellow transition duration-300"
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
