"use client";

interface ResendOtpProps {
  resendLoading: boolean;
  cooldown: number;
  handleResendOtp: () => void;
}

const ResendOtp: React.FC<ResendOtpProps> = ({ resendLoading, cooldown, handleResendOtp }) => {
  return (
    <div className="text-center text-sm mt-4">
      Didn&apos;t receive the code?{" "}
      <button
        onClick={handleResendOtp}
        disabled={resendLoading || cooldown > 0}
        className={`font-semibold ${
          cooldown > 0 ? "text-gray-400 cursor-not-allowed" : "text-primary-button hover:underline"
        }`}
      >
        {resendLoading ? "Resending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
      </button>
    </div>
  );
};

export default ResendOtp;
