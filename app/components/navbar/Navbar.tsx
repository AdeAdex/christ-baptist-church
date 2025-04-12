"use client";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import navLinks from "./navLinks";
import LogoSection from "./LogoSection";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenu from "./MobileMenu";
import AuthMenu from "./AuthMenu";
import SearchMember from "../SearchMember";

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
      className={`top-0 left-0 w-full h-[74px] z-50 shadow-lg py-2 ${
        scrolled ? "fixed bg-primary-button" : "absolute bg-primary-button"
      }`}
    >
      <div className="mx-auto h-full px-4 lg:px-16 flex items-center">
        <div className="flex justify-between items-center w-full h-full relative">
          {/* Logo Section */}
          <LogoSection />

          <SearchMember/>

          <div className="flex items-center gap-[64px]">

          {/* Desktop Navigation Links */}
            <DesktopNavLinks navLinks={navLinks} />

            {/* Auth Button/Avatar and  Mobile Menu */}
            <div className="flex items-center gap-4">
              <AuthMenu />

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
        </div>

        {/* Mobile Dropdown */}
        <MobileMenu opened={opened} toggle={toggle} navLinks={navLinks} />
      </div>
    </nav>
  );
};

export default Navbar;
