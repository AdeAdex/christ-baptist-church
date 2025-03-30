import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo-transparent.png";

interface LogoSectionProps {
  width?: number;
  height?: number;
  textClassName?: string;
  isSidebarOpen?: boolean
}

const LogoSection: React.FC<LogoSectionProps> = ({
  width = 72,
  height = 72,
  textClassName,
  isSidebarOpen
}) => (
  <Link href="/" className="flex gap-2 items-center">
    <Image
      src={logo}
      alt="Christ Baptist Church Logo"
      width={width}
      height={height}
      priority
      className="rounded-md bg-white"
    />
    {isSidebarOpen && <div
      className={`hidden md:flex flex-col font-bold font-roboto leading-tight tracking-wide text-white  ${textClassName}`}
    >
      <span className="tracking-[2.5px]">CHRIST</span>
      <span>BAPTIST</span>
      <span>CHURCH</span>
    </div> }
    
  </Link>
);

export default LogoSection;
