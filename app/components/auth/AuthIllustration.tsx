import Image from "next/image";
import React from "react";
import AuthImage from "@/public/images/AuthFrame.png";

const AuthIllustration = () => {
  return (
    <div className="hidden md:block w-full max-w-lg">
      <Image
        src={AuthImage}
        alt="Login Illustration"
        className="rounded-lg shadow-md w-full object-contain"
        priority
      />
    </div>
  );
};

export default AuthIllustration;
