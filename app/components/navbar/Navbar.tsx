"use client";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import navLinks from "./navLinks";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import LogoSection from "./LogoSection";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        </div>

        {/* Mobile Dropdown */}
        <MobileMenu
          opened={opened}
          toggle={toggle}
          navLinks={navLinks}
        />
      </div>
    </nav>
  );
};

export default Navbar;
