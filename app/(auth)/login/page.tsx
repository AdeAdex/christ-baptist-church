"use client";

import { useState, useEffect } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { IoMdLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { loginSchema } from "@/app/components/validation/loginSchema";
import { SnackbarProvider, useSnackbar } from "notistack";

interface Provider {
  id: string;
  name: string;
}

const LoginPage = () => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MyApp />
    </SnackbarProvider>
  );
};

function MyApp() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error("Error fetching providers:", error);
        enqueueSnackbar(
          error instanceof Error ? error.message : "An unknown error occurred.",
          { variant: "error" }
        );
      }
    };
    fetchProviders();
  }, [enqueueSnackbar]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          Sign in to continue
        </p>

        {/* Formik Login Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              const res = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
              });

              if (res?.error) {
                enqueueSnackbar(res.error, { variant: "error" });
              } else {
                enqueueSnackbar("Login successful!", { variant: "success" });
                router.push("/dashboard");
              }
            } catch (error) {
              console.error("Login error:", error);
              enqueueSnackbar(
                error instanceof Error
                  ? error.message
                  : "An unknown error occurred.",
                { variant: "error" }
              );
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder={
                    errors.email && !values.email
                      ? errors.email
                      : "Enter your email"
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white 
                    ${errors.email && !values.email ? "placeholder-red-500" : "placeholder-gray-400"}`}
                />
                {errors.email && touched.email && values.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field with Eye Icon */}
              <div className="relative">
                <label className="block text-sm text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={
                      errors.password && !values.password
                        ? errors.password
                        : "Enter your password"
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10
                      ${errors.password && !values.password ? "placeholder-red-500" : "placeholder-gray-400"}`}
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
                {errors.password && touched.password && values.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
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

        {/* Social Login */}
        {providers &&
          Object.values(providers).map((provider) =>
            provider.id !== "credentials" ? (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className={`w-full flex items-center justify-center py-2 rounded-lg hover:opacity-80 transition mt-2 ${
                  provider.id === "google"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : ""
                } ${provider.id === "facebook" ? "bg-blue-600 text-white" : ""}`}
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
      </div>
    </div>
  );
}

export default LoginPage;
