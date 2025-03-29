"use client";

import { useSearchParams } from "next/navigation";
import { PinInput, Group } from "@mantine/core";
import { useOtp } from "@/app/hooks/useOtp";
import ResendOtp from "@/app/components/ResendOtp";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const role = searchParams.get("role") || "";

  const { otp, setOtp, loading, handleVerify, resendLoading, handleResendOtp, cooldown } = useOtp(email, role);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Verify Your Email
        </h2>
        <p className="text-center mb-6">
          Enter the OTP sent to <strong>{email}</strong>
        </p>

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

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Resend OTP Component */}
        <ResendOtp resendLoading={resendLoading} cooldown={cooldown} handleResendOtp={handleResendOtp} />
      </div>
    </div>
  );
};

export default VerifyEmail;
