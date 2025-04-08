"use client";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import navLinks from "./navLinks";
import LogoSection from "./LogoSection";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenu from "./MobileMenu";
import AuthMenu from "./AuthMenu";

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
        scrolled ? "fixed bg-primary-button" : "absolute bg-primary-button/70"
      }`}
    >
      <div className="mx-auto px-4 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <LogoSection />


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
