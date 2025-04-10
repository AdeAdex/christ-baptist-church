"use client";

import { useSearchParams } from "next/navigation";
import { PinInput, Group } from "@mantine/core";
import { useOtp } from "@/app/hooks/useOtp";
import ResendOtp from "@/app/components/auth/ResendOtp";
import AuthIllustration from "@/app/components/auth/AuthIllustration";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthSubmitButton from "@/app/components/auth/AuthSubmitButton";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const role = searchParams.get("role") || "";

  const {
    otp,
    setOtp,
    loading,
    handleVerify,
    resendLoading,
    handleResendOtp,
    cooldown,
  } = useOtp(email, role);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-0 w-full h-screen overflow-hidden">
      {/* Left side image */}
      <div className="hidden md:block w-1/2 h-full">
        <AuthIllustration />
      </div>

      <div className="w-full md:w-1/2 overflow-y-auto px-4 md:px-12 h-full py-6">
        <div className="max-w-xl w-full mx-auto">
          <AuthHeader
            title="Verify Your Email"
            subtitle={`Enter the OTP sent to ${email}.`}
            subtitleSize="text-[12px] md:text-[14px]"
          />

          {/* Mantine PinInput Component */}
          <Group justify="center" mb="md">
            <PinInput
              length={6}
              type="number"
              value={otp}
              onChange={setOtp}
              oneTimeCode
              unstyled
              classNames={{
                root: "flex gap-2",
                input:
                  "w-8 h-8 sm:w-12 sm:h-12 text-lg text-center rounded-md dark:bg-gray-700 bg-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-300 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-green-400 dark:focus:ring-green-500",
              }}
            />
          </Group>

          <AuthSubmitButton
            onClick={handleVerify}
            loading={loading}
            label="Verify Email"
            submitText="Verifying..."
            className="px-14 w-full mt-6"
          />

          {/* Resend OTP Component */}
          <ResendOtp
            resendLoading={resendLoading}
            cooldown={cooldown}
            handleResendOtp={handleResendOtp}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
