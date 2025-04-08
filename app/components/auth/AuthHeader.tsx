// components/AuthHeader.tsx
import Image from "next/image";
import Logo from "@/public/images/logo-transparent.png"; 

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
  subtitleSize?: string;
  subtitleColorClass?: string; 
}

const AuthHeader = ({
  title = "Sign In",
  subtitle = "Welcome Back",
  subtitleSize = "text-[20px]",
  subtitleColorClass
}: AuthHeaderProps) => {
  return (
    <div className="text-center">
      <Image
        src={Logo}
        alt="Logo"
        width={100}
        height={100}
        className="mx-auto mb-4"
      />
      <h2 className="text-[24px] font-bold text-primary-button dark:text-white mb-3">
        {title}
      </h2>
      <h2 className={`${subtitleSize} ${subtitleColorClass} font-[500] mb-[33px]`}>
        {subtitle}
      </h2>
    </div>
  );
};

export default AuthHeader;
