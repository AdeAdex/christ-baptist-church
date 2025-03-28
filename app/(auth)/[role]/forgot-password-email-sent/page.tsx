"use client";

import React from "react";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";


const ForgotPasswordEmailSentPage = () => {

  return (
    <div
      className={`pt-[80px] md:pt-[100px] h-screen dark:bg-dark-mode dark:text-white bg-[#F4F4F4] text-[#434343] `}
    >

      <div
        className={`relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-[30px] px-[10px] md:px-[30px] mb-[30px] dark:bg-gray-700 dark:border-gray-600 bg-white border-gray-300`}
      >
        <div className="pt-[20px] pb-[10px]">
          <small className="flex gap-[10px]">
            <IoMdCheckmark className="my-auto" size={20} /> A password reset
            link has been sent to your account&rsquo;s primary address.
          </small>
        </div>

        <div>
          <small>
            <Link
              href="/"
              className={`underline flex dark:text-red-400 text-[#FF2E51] `}
            >
              <IoIosArrowRoundBack className="my-auto" size={20} /> Return home
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmailSentPage;
