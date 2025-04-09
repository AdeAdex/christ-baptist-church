import Image from "next/image";
import React from "react";
import Logo from "@/public/images/logo-transparent.png";

const Footer = () => {
  return (
    <div className="flex flex-col  w-full px-4 lg:px-16 py-8 items-center justify-center">
      <div className="w-full flex flex-col md:flex-row md:justify-between items-center p-4 gap-5 md:gap-0">
        <div className="flex flex-col gap-5 w-full md:w-1/2 justify-center items-center md:justify-normal md:items-start">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={100}
            className="h-16 w-16 md:h-24 md:w-24"
          />

          <div>
            <h4 className="mb-2 text-[20px] font-semibold text-center md:text-start dark:text-gray-500">Address</h4>
            <p>Ogbomoso, Oyo State, Nigeria</p>
          </div>

          <div className="">
            <h4 className="mb-2 text-[20px] font-semibold text-center md:text-start dark:text-gray-500">Contact</h4>
            <p>+234 903 123 4567</p>
            <p>info@CBC.org</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-1/2 gap-5 md:gap-0">
          <div className="w-full md:w-1/2">
            <h4 className="mb-2 text-[20px] font-semibold text-center md:text-start dark:text-gray-500">Social</h4>
            <div className="flex flex-col gap-1 justify-center items-center md:justify-normal md:items-start">
              <a href="#" className="">
                Facebook
              </a>
              <a href="#" className="">
                Twitter
              </a>
              <a href="#" className="">
                Instagram
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:justify-normal md:items-start">
            <h4 className="mb-2 text-[20px] font-semibold text-center md:text-start dark:text-gray-500">Ministries</h4>
            <p className="">Youth</p>
            <p className="">Children</p>
          </div>
        </div>
      </div>
      <div className="text-[14px] font-[500] text-center">{new Date().getFullYear()}. All rights reserved.</div>
    </div>
  );
};

export default Footer;
