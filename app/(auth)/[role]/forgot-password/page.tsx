"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import AuthIllustration from "@/app/components/auth/AuthIllustration";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthSubmitButton from "@/app/components/auth/AuthSubmitButton";

const ForgotPasswordPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { role } = useParams();
  // console.log("role",role);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      const responseData = await response.json();
      const status = response.status; // Access the status from the response object
      // console.log(responseData);

      if (status === 200) {
        router.push(`/${role}/forgot-password-email-sent`);
      } else {
        enqueueSnackbar(responseData.message, { variant: "error" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("An unexpected error occurred.", { variant: "error" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-4 md:p-0 ">
      {/* Left side image */}
      <AuthIllustration />

      <div className="flex flex-col pt-[7px] max-w-lg w-full">
        <AuthHeader
          title="Reset Password"
          subtitle="Enter the email address you registered with and we will send you a
          link to reset your password."
          subtitleSize="text-[12px] md:text-[14px]"
        />

        <form onSubmit={handleSubmit} className="text-[13px]">
          <div className="w-full flex flex-col gap-[5px]">
            {/* <label className="w-full font-bold" htmlFor="email">
              Email:
            </label> */}
            <input
              type="email"
              autoComplete="on"
              name="email"
              className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100"
              placeholder="Email is Required"
              required
            />
          </div>
          <div className="py-[25px] flex gap-4">
            <AuthSubmitButton
              loading={submitting}
              label="Submit"
              submitText="Connecting..."
              className="px-14 w-1/2"
            />
            <div className="flex my-auto w-1/2 text-[12px] md:text-[14px]">
              <span>or </span>
              <Link href={`/${role}/login`} className="ml-[5px] underline text-button dark:text-white">
                Login
              </Link>
            </div>
          </div>
        </form>
        <div>
          <small>
            If you are having trouble accessing your account, please{" "}
            <Link
              href="/support"
              className="underline dark:text-red-400 text-[#FF2E51]"
            >
              contact Support
            </Link>
            .
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
