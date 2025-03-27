"use client";

import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { resetPasswordSchema } from "@/app/components/validation/members/resetPasswordSchema";
import PasswordField from "@/app/components/resetPassword/PasswordField";
import Loader from "@/app/components/Loader";
import { useResetPassword } from "@/app/hooks/members/useResetPassword";
import { resetPasswordAction } from "@/app/actions/members/resetPasswordAction";

const ResetPassword = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { token, loading, message, success, username } = useResetPassword();
  console.log("success", success);

  if (loading) return <Loader />;

  return (
    <div className="h-screen ">
      <main className="h-screen pt-[80px] md:pt-[100px]">
        <div className="relative w-full lg:w-[60%] mx-auto rounded-sm border-2 py-6 px-4 md:px-8">
          <h3 className="border-b font-bold md:text-[20px] border-gray-300 dark:border-gray-600 pb-2">
            Reset Password
          </h3>

          <div className="py-4">
            {message && (
              <div className={`text-sm ${success ? "text-green-500" : "text-red-500"}`}>
                {success ? null : <small>Error: {message}</small>}
              </div>
            )}
            {success ? (
              <small>Please provide a new password for {username}.</small>
            ) : (
              <small>Please request a new link if the token has expired.</small>
            )}
          </div>

          {success && (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={resetPasswordSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const response = await resetPasswordAction(token, values.password);

                if (response.success) {
                  enqueueSnackbar(response.success, { variant: "success" });
                  router.push("/members/login");
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
                  <PasswordField name="password" label="Password:" placeholder="Enter new password" />
                  <PasswordField name="confirmPassword" label="Repeat Password:" placeholder="Confirm new password" />

                  <div className="py-6 flex gap-4">
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded text-white ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      } dark:bg-red-600 bg-[#FF2E51]`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Submit"}
                    </button>
                    <div className="flex items-center text-sm">
                      <span>or </span>
                      <Link href="/members/login" className="ml-2 underline text-[#FF2E51] dark:text-red-400">
                        Login
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
