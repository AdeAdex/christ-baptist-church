"use client";

import { Formik, Form } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { resetPasswordSchema } from "@/app/components/validation/members/resetPasswordSchema";
import PasswordField from "@/app/components/resetPassword/PasswordField";
import Loader from "@/app/components/Loader";
import { useResetPassword } from "@/app/hooks/members/useResetPassword";
import { resetPasswordAction } from "@/app/actions/members/resetPasswordAction";
import AuthIllustration from "@/app/components/auth/AuthIllustration";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthSubmitButton from "@/app/components/auth/AuthSubmitButton";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get URL parameters
  const role = searchParams.get("role") || "member";

  const { enqueueSnackbar } = useSnackbar();
  const { token, loading, message, success, username } = useResetPassword();

  if (loading) return <Loader />;

  const subtitle = success
    ? `Please provide a new password for ${username}.`
    : message
      ? `Error: ${message}`
      : "Please request a new link if the token has expired.";

  const subtitleColorClass = success ? "text-green-500" : "text-red-500";
  const subtitleSize = "text-[12px] md:text-[14px]";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-0 w-full h-screen overflow-hidden">
      {/* Left side image */}
      <div className="hidden md:block w-1/2 h-full">
        <AuthIllustration />
      </div>

      <div className="w-full md:w-1/2 overflow-y-auto px-4 md:px-12 h-full py-6">
      <div className="max-w-xl w-full mx-auto"> 
        <AuthHeader
          title="Reset Password"
          subtitle={subtitle}
          subtitleSize={subtitleSize}
          subtitleColorClass={subtitleColorClass}
        />

        {success && (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              const response = await resetPasswordAction(
                token,
                values.password,
                role
              );

              if (response.success) {
                enqueueSnackbar(response.success, { variant: "success" });
                router.push(`/${role}/login`);
              } else {
                enqueueSnackbar(response.error || "Failed to reset password", {
                  variant: "error",
                });
              }

              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="text-sm">
                <PasswordField
                  name="password"
                  placeholder="Enter new password"
                />
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />

                <div className="py-6 flex gap-4">
                  <AuthSubmitButton
                    loading={isSubmitting}
                    label="Submit"
                    submitText="Connecting..."
                    className="px-14 w-1/2"
                  />
                  <div className="flex items-center text-sm">
                    <span>or </span>
                    <Link
                      href={`/${role}/login`}
                      className="ml-2 underline text-primary-button dark:text-white"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

      </div>
      </div>
    </div>
  );
};

export default ResetPassword;
