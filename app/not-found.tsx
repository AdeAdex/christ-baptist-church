import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionButton from "@/app/components/home/SectionButton";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <div className="mt-8">
          <Image
            src="/images/404-error.png"
            alt="Not Found Illustration"
            width={400}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        <p className="mt-2 text-lg text-gray-400">
          The page you are looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
          >
            <SectionButton
              title="Go Back to Home"
              className="hover:bg-primary-button-hover text-white py-2 px-8 text-[16px] font-[500] rounded-3xl transition mt-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
