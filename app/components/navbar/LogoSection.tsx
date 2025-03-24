import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo-transparent.png";

const LogoSection = () => (
  <Link href="/" className="flex gap-2 items-center">
    <Image
      src={logo}
      alt="Christ Baptist Church Logo"
      width={72}
      height={72}
      priority
      className="rounded-md bg-white"
    />
    <div className="flex flex-col text-sm md:text-base font-bold font-roboto leading-tight tracking-wide text-white hidden md:flex">
      <span className="tracking-[2.5px]">CHRIST</span>
      <span>BAPTIST</span>
      <span>CHURCH</span>
    </div>
  </Link>
);

export default LogoSection;
