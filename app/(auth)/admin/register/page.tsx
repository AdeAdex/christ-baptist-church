"use client";

import { useState } from "react";
import Link from "next/link";
import useAdminRegistrationForm from "@/app/hooks/admin/useAdminRegistrationForm";

const AdminRegister = () => {
  const { formik, loading } = useAdminRegistrationForm();
  const [showPassword, setShowPassword] = useState(false);

  type AdminFields =
    | "firstName"
    | "lastName"
    | "phoneNumber"
    | "email"
    | "password"
    | "secretKey";

  const fields: { name: AdminFields; label: string; type: string }[] = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "secretKey", label: "Secret Key", type: "text" },
  ];

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-[16px] uppercase font-bold mb-4 text-gray-800 dark:text-white">
          Admin Registration
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => {
            const error =
              formik.touched[field.name] && formik.errors[field.name];
            const value = formik.values[field.name];
            const isPasswordField = field.name === "password";

            return (
              <div key={field.name} className="col-span-1 relative">
                <input
                  type={isPasswordField && showPassword ? "text" : field.type}
                  className={`w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100 pr-10 ${
                    error ? "border-red-500 placeholder-red-500" : ""
                  }`}
                  placeholder={
                    error ? String(formik.errors[field.name]) : field.label
                  }
                  style={{
                    color: value ? "inherit" : error ? "red" : "inherit",
                  }} // Make placeholder text red on error
                  {...formik.getFieldProps(field.name)}
                />

                {/* Eye Icon for Password Field */}
                {isPasswordField && (
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                )}

                {error && value && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(formik.errors[field.name])}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-6 disabled:bg-gray-400"
          disabled={formik.isSubmitting || loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Already Registered? Login */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Already registered?{" "}
          <Link href="/admin/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
