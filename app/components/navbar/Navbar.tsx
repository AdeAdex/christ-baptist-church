"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "@mantine/core";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import logo from "@/public/images/logo-transparent.png";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 shadow-lg bg-gray-800/70  border-b border-gray-300 dark:border-gray-600 py-6">
      <div className="mx-auto px-4 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center h-full">
            <div className="flex-shrink-0">
              <Link href="/" className="flex gap-2 items-center">
                <Image
                  src={logo}
                  alt="Christ Baptist Church Logo"
                  width={72} // Adjust width for a larger size
                  height={72}
                  priority // Optimizes loading for important images
                  className="rounded-md bg-white"
                />
                <div className="flex flex-col text-sm md:text-base font-bold font-roboto leading-[-20px] tracking-wide text-white gap-[-20px]">
                  <span className="tracking-[2.5px] h-fit overflow-hidden">
                    CHRIST
                  </span>
                  <span className="h-fit overflow-hidden">BAPTIST</span>
                  <span className="h-fit overflow-hidden">CHURCH</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex space-x-6 items-center ">
            <Link href="/" className="text-white">
              Home
            </Link>
            <Menu>
              <Menu.Target>
                <span className="text-white">About Us</span>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Link href="/about-us/leadership" className="hover:text-purple-700">
                    Our Pastors
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/about/history" className="hover:text-purple-700">
                    Our History
                  </Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <ThemeToggle />
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <div className="md:hidden">
              <Menu>
                <Menu.Target>
                  <button className="text-white focus:outline-none my-auto">
                    <svg
                      className="h-7 w-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link href="/" className="block px-4 py-2 text-white">
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/about" className="block px-4 py-2 text-white">
                      About Us
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      href="/contact"
                      className="block px-4 py-2 text-white"
                    >
                      Contact Us
                    </Link>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
