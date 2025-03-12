"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { IoMdLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useAppDispatch } from "@/app/redux/hooks";
import { loginSchema } from "@/app/components/validation/loginSchema";
import { handleLogin, fetchAuthProviders } from "@/app/actions/loginActions";


const LoginPage = () => {
  return (
    <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <MyApp />
    </SnackbarProvider>
  );
};

function MyApp() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchAuthProviders(enqueueSnackbar).then(setProviders);
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }

    console.log("Login response:", session);

  }, [session, router]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full">
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
            handleLogin(values, dispatch, session, enqueueSnackbar, setLoading, setSubmitting)
          }
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
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

        <div className="my-4 text-center text-gray-500 dark:text-gray-400">OR</div>

        {providers &&
          Object.values(providers).map((provider) =>
            provider.id !== "credentials" ? (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="w-full flex items-center justify-center py-2 rounded-lg hover:opacity-80 transition mt-2"
              >
                {provider.id === "google" && <FcGoogle className="mr-2 text-xl" />}
                {provider.id === "facebook" && <FaFacebook className="mr-2 text-xl" />}
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
