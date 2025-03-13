import React from "react";
import Link from "next/link";
import { Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import { NavLinkProps } from "@/app/types/navbarLinks";

interface DesktopNavLinksProps {
  navLinks: NavLinkProps[];
}

const DesktopNavLinks: React.FC<DesktopNavLinksProps> = ({ navLinks }) => (
  <div className="hidden md:flex space-x-6 items-center relative">
    {navLinks.map((link) =>
      link.dropdown ? (
        <Menu key={link.path} trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <span className="text-white cursor-pointer">{link.label}</span>
          </Menu.Target>
          <Menu.Dropdown className="dark:!bg-gray-800">
            {link.dropdown.map((subLink) => (
              <Menu.Item key={subLink.path} className="dark:hover:!bg-gray-500">
                <Link
                  href={subLink.path}
                  className="hover:text-purple-700 dark:text-white"
                >
                  {subLink.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Link key={link.path} href={link.path} className="text-white">
          {link.label}
        </Link>
      )
    )}
  </div>
);

export default DesktopNavLinks;
