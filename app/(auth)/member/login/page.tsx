"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Formik, Form, Field, FieldInputProps, FieldMetaProps } from "formik";
import {  IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "@/app/redux/hooks";
import { loginSchema } from "@/app/components/validation/members/loginSchema";
import {
  handleLogin,
  fetchAuthProviders,
  handleLoginError,
} from "@/app/actions/members/loginActions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@mantine/core";
import ResendOtp from "@/app/components/auth/ResendOtp";
import { useOtp } from "@/app/hooks/useOtp";
import "./login.css";
import AuthIllustration from "@/app/components/auth/AuthIllustration";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthSubmitButton from "@/app/components/auth/AuthSubmitButton";
import { Session } from "next-auth";

const LoginPage = () => {
  // const { data: session } = useSession();
  const { data: session } = useSession() as { data: Session | null };
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Record<
    string,
    { id: string; name: string }
  > | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // Store email for OTP

  useEffect(() => {
    fetchAuthProviders(enqueueSnackbar).then(setProviders);
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (errorParam) {
      handleLoginError(errorParam, enqueueSnackbar, router);
    }
  }, [errorParam, enqueueSnackbar, router]);

  // OTP Hook for Resend OTP
  const { resendLoading, handleResendOtp, cooldown } = useOtp(email, "member");

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-0 w-full h-screen overflow-hidden">
      {/* Left side image */}
      <div className="hidden md:block w-1/2 h-full">
        <AuthIllustration />
      </div>
      {/* Login Form */}
      <div className="w-full md:w-1/2 overflow-y-auto px-4 md:px-0 h-full py-6">
      <div className="max-w-xl w-full mx-auto">

        <AuthHeader title="Sign In" subtitle="Welcome Back" />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setEmail(values.email); // Store email on form submission
            handleLogin(
              values,
              dispatch,
              session,
              enqueueSnackbar,
              setLoading,
              setSubmitting,
              router
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field name="email">
                  {({
                    field,
                    meta,
                  }: {
                    field: FieldInputProps<string>;
                    meta: FieldMetaProps<string>;
                  }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder={
                        meta.touched && meta.error
                          ? meta.error
                          : "Enter your Email, Phone Number or Username"
                      }
                      className={`w-full p-3 rounded-md login-input ${
                        meta.touched && meta.error ? "placeholder-red-500" : ""
                      }`}
                      onChange={(e) => {
                        field.onChange(e);
                        setEmail(e.target.value); // Update state as user types
                      }}
                    />
                  )}
                </Field>
              </div>

              <div className="relative">
                <Field name="password">
                  {({
                    field,
                    meta,
                  }: {
                    field: FieldInputProps<string>;
                    meta: FieldMetaProps<string>;
                  }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={
                          meta.touched && meta.error
                            ? meta.error
                            : "Enter your password"
                        }
                        className={`w-full p-3 rounded-md login-input pr-10 ${
                          meta.touched && meta.error
                            ? "placeholder-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-8 flex items-center text-gray-500 dark:text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <IoMdEyeOff size={20} />
                        ) : (
                          <IoMdEye size={20} />
                        )}
                      </button>
                    </div>
                  )}
                </Field>
              </div>

              <AuthSubmitButton
                loading={loading || isSubmitting}
                label="Sign In"
                submitText="Signing in..."
                icon
                className="w-full"
              />
            </Form>
          )}
        </Formik>

        {/* Resend OTP Section */}
        {email && (
          <ResendOtp
            resendLoading={resendLoading}
            cooldown={cooldown}
            handleResendOtp={handleResendOtp}
          />
        )}

        <div className="my-4 text-center text-gray-500 dark:text-gray-400">
          OR
        </div>

        {providers && (
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {Object.values(providers).map((provider) =>
              provider.id !== "credentials" ? (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="flex items-center px-4 py-2 rounded-lg hover:opacity-80 transition bg-gray-100 dark:bg-gray-800"
                >
                  {provider.id === "google" && (
                    <FcGoogle className="mr-2 text-xl" />
                  )}
                  {provider.id === "facebook" && (
                    <FaFacebook className="mr-2 text-xl text-blue-600" />
                  )}
                  Sign in with {provider.name}
                </button>
              ) : null
            )}
          </div>
        )}

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/member/register" className="text-primary-button dark:text-white hover:underline">
            Sign up
          </Link>
        </p>

        <div className="flex justify-between w-full mt-8">
          <Checkbox
            defaultChecked
            label={<span className="text-[12px] font-[400]">Remember me </span>}
            classNames={{
              input: 'border-button checked:bg-primary-button checked:border-button',
            }}
          />

          <Link
            href="/member/forgot-password"
            className="font-[400] text-[12px]"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
