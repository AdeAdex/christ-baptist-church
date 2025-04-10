import Image from "next/image";
import React from "react";
import AuthImage from "@/public/images/AuthFrame.png";

const AuthIllustration = () => {
  return (
    <div className="h-full w-full">
      <Image
        src={AuthImage}
        alt="Login Illustration"
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
};

export default AuthIllustration;
