// "use client";

// import React, { useEffect, useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
// import { Burger } from "@mantine/core";
// import navLinks from "./navLinks";
// import ThemeToggle from "@/app/components/navbar/ThemeToggle";
// import LogoSection from "./LogoSection";
// import DesktopNavLinks from "./DesktopNavLinks";
// import MobileMenu from "./MobileMenu";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [opened, { toggle }] = useDisclosure(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 200);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`top-0 left-0 w-full z-50 shadow-lg border-b border-gray-300 dark:border-gray-600 py-6 ${
//         scrolled ? "fixed bg-gray-800" : "absolute bg-gray-800/70"
//       }`}
//     >
//       <div className="mx-auto px-4 lg:px-16">
//         <div className="flex justify-between items-center">
//           {/* Logo Section */}
//           <LogoSection />

//           {/* Desktop Navigation Links */}
//           <DesktopNavLinks navLinks={navLinks} />

//           {/* Mobile Menu */}
//           <div className="flex items-center md:hidden">
//             <Burger
//               opened={opened}
//               onClick={toggle}
//               color="#fff"
//               aria-label="Toggle navigation"
//               lineSize={2}
//               size="lg"
//             />
//             <ThemeToggle />
//           </div>
//         </div>

//         {/* Mobile Dropdown */}
//         <MobileMenu
//           opened={opened}
//           toggle={toggle}
//           navLinks={navLinks}
//         />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





"use client";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Menu, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import { logout } from "@/app/redux/slices/authSlice";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import navLinks from "./navLinks";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import LogoSection from "./LogoSection";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenu from "./MobileMenu";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const member = useAppSelector((state) => state.auth.member);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav
      className={`top-0 left-0 w-full z-50 shadow-lg border-b border-gray-300 dark:border-gray-600 py-6 ${
        scrolled ? "fixed bg-gray-800" : "absolute bg-gray-800/70"
      }`}
    >
      <div className="mx-auto px-4 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <LogoSection />

          {/* Desktop Navigation Links */}
          <DesktopNavLinks navLinks={navLinks} />

          {/* Mobile Menu */}
          <div className="flex items-center">
             {/* Authentication Section */}
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
                  <Menu.Item
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <IoMdLogOut size={20} className="mr-2 inline-block" />
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link href="/login" 
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          <div className="flex items-center md:hidden">
            <Burger
              opened={opened}
              onClick={toggle}
              color="#fff"
              aria-label="Toggle navigation"
              lineSize={2}
              size="lg"
            />

          </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <MobileMenu opened={opened} toggle={toggle} navLinks={navLinks} />
      </div>
    </nav>
  );
};

export default Navbar;
