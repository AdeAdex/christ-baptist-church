"use client";

import { useState } from "react";
import Link from "next/link";
import useAdminLoginForm from "@/app/hooks/admin/useAdminLoginForm";

export default function AdminLogin() {
  const { formik/* , error */ } = useAdminLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  // Explicitly define field types to match Formik's structure
  type FieldName = "email" | "password";
  const fields: { name: FieldName; label: string; type: string }[] = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Admin Login
        </h2>

        {/* {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>} */}

        <div className="space-y-4">
          {fields.map((field) => {
            const isPassword = field.name === "password";
            const fieldError = formik.touched?.[field.name] && formik.errors?.[field.name];
            const value = formik.values[field.name];

            return (
              <div key={field.name} className="relative">
                <input
                  type={isPassword && showPassword ? "text" : field.type}
                  className={`w-full p-3 rounded-md dark:bg-gray-700 bg-gray-100 pr-10 ${
                    fieldError ? "border-red-500 placeholder-red-500" : ""
                  }`}
                  placeholder={fieldError ? String(fieldError) : field.label}
                  style={{
                    color: value ? "inherit" : fieldError ? "red" : "inherit",
                  }}
                  {...formik.getFieldProps(field.name)}
                />

                {/* Toggle Password Visibility */}
                {isPassword && (
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                )}

                {/* Error Message Below Input */}
                {fieldError && value && (
                  <p className="text-red-500 text-sm mt-1">{String(fieldError)}</p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-6 disabled:bg-gray-400"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
          Not registered?{" "}
          <Link href="/admin/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
