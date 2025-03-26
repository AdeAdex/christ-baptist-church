"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import { IoMdLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "@/app/redux/hooks";
import { loginSchema } from "@/app/components/validation/loginSchema";
import { handleLogin, fetchAuthProviders, handleLoginError } from "@/app/actions/loginActions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@mantine/core";

interface AuthProvider {
  id: string;
  name: string;
}

const LoginPage = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error"); // Get error from URL
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, AuthProvider> | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchAuthProviders(enqueueSnackbar).then(setProviders);
  }, [enqueueSnackbar]);


   // Show authentication error in UI
   useEffect(() => {
    if (errorParam) {
      handleLoginError(errorParam, enqueueSnackbar, router);
    }
  }, [errorParam, enqueueSnackbar, router]);
  


  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          Sign in to continue
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleLogin(
              values,
              dispatch,
              session,
              enqueueSnackbar,
              setLoading,
              setSubmitting,
              router
            )
          }
        >
          {({ isSubmitting /* , errors, touched, values */ }) => (
            <Form className="space-y-4">
              <div>
                {/* <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label> */}
                <Field
                  type="text" // Changed from "email" to "text"
                  name="email"
                  placeholder="Enter your email, username, or phone number"
                  className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100"
                />
              </div>

              <div className="relative">
                {/* <label className="block text-sm text-gray-700 dark:text-gray-300">Password</label> */}
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-3 rounded-md  dark:bg-gray-700 bg-slate-100 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={20} />
                    ) : (
                      <IoMdEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                disabled={loading || isSubmitting}
              >
                {loading ? "Signing in..." : "Sign In"}
                <IoMdLock className="ml-2" />
              </button>
            </Form>
          )}
        </Formik>

        <div className="my-4 text-center text-gray-500 dark:text-gray-400">
          OR
        </div>

        {providers &&
          Object.values(providers).map((provider) =>
            provider.id !== "credentials" ? (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="w-full flex items-center justify-center py-2 rounded-lg hover:opacity-80 transition mt-2"
              >
                {provider.id === "google" && (
                  <FcGoogle className="mr-2 text-xl" />
                )}
                {provider.id === "facebook" && (
                  <FaFacebook className="mr-2 text-xl" />
                )}
                Sign in with {provider.name}
              </button>
            ) : null
          )}

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

        <div className="flex justify-between w-full mt-8">
          <div className="">
            <Checkbox
              defaultChecked
              label={
                <span className="text-[12px] font-[400]">Remember me </span>
              }
              className=""
              // color="#174978"
            />
          </div>

          <Link href="/forgot-password" className="font-[400] text-[12px] ">
            Forgot your password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
