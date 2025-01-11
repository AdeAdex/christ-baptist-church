"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import logo from "@/public/images/logo-transparent.png";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import navLinks from "./navLinks";
import { Menu } from "@mantine/core";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav
      className={`top-0 left-0 w-full z-50 shadow-lg bg-gray-800/70 border-b border-gray-300 dark:border-gray-600 py-6 ${
        scrolled ? "fixed" : "absolute"
      }`}
    >
      <div className="mx-auto px-4 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center h-full">
            <Link href="/" className="flex gap-2 items-center">
              <Image
                src={logo}
                alt="Christ Baptist Church Logo"
                width={72}
                height={72}
                priority
                className="rounded-md bg-white"
              />
              <div className="flex flex-col text-sm md:text-base font-bold font-roboto leading-tight tracking-wide text-white">
                <span className="tracking-[2.5px]">CHRIST</span>
                <span>BAPTIST</span>
                <span>CHURCH</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 items-center relative">
            {navLinks.map((link) => {
              if (link.label === "About Us") {
                return (
                  <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
                      <span className="text-white">About Us</span>
                    </Menu.Target>
                    <Menu.Dropdown className="dark:!bg-gray-800">
                      <Menu.Item className="dark:hover:!bg-gray-500">
                        <Link
                          href="/about-us"
                          className="hover:text-purple-700 dark:text-white"
                        >
                          About Us
                        </Link>
                      </Menu.Item>
                      <Menu.Item className="dark:hover:!bg-gray-500">
                        <Link
                          href="/about-us/leadership"
                          className="hover:text-purple-700 dark:text-white "
                        >
                          Our Pastors
                        </Link>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                );
              }
              return (
                <Link key={link.path} href={link.path} className="text-white">
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <Burger
              opened={opened}
              onClick={toggle}
              color="#fff"
              aria-label="Toggle navigation"
              lineSize={2}
              size="lg"
            />
            <ThemeToggle />
          </div>

          {/* Mobile Dropdown */}
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-gray-800 text-white flex flex-col p-6 z-50 transform transition-all duration-300 ease-in-out md:hidden ${
              opened
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex gap-2 items-center">
                <Image
                  src={logo}
                  alt="Christ Baptist Church Logo"
                  width={72}
                  height={72}
                  priority
                  className="rounded-md bg-white"
                />
                <div className="flex flex-col text-sm md:text-base font-bold font-roboto leading-tight tracking-wide text-white">
                  <span className="tracking-[2.5px]">CHRIST</span>
                  <span>BAPTIST</span>
                  <span>CHURCH</span>
                </div>
              </Link>
              <Burger
                opened={opened}
                onClick={toggle}
                color="#fff"
                aria-label="Toggle navigation"
                lineSize={2}
                size="lg"
              />
            </div>
            {navLinks.map((link) => {
              if (link.label === "About Us") {
                return (
                  <div key={link.path}>
                    <div
                      className="cursor-pointer mb-4 text-lg"
                      onClick={handleDropdownToggle}
                    >
                      {link.label}
                    </div>
                    {dropdownOpen && (
                      <div className="ml-4 space-y-2">
                        <Link
                          href="/about-us"
                          className="block text-sm text-gray-200"
                          onClick={() => {
                            toggle();
                            setDropdownOpen(false);
                          }}
                        >
                          About Us
                        </Link>
                        <Link
                          href="/about-us/leadership"
                          className="block text-sm text-gray-200"
                          onClick={() => {
                            toggle();
                            setDropdownOpen(false);
                          }}
                        >
                          Our Pastors
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="mb-4 text-lg"
                  onClick={toggle}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
