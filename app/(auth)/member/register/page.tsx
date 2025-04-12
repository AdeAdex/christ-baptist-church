// app/(auth)/register/page.tsx

"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useRegistrationForm from "@/app/hooks/members/useRegistrationForm";
import AuthIllustration from "@/app/components/auth/AuthIllustration";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthSubmitButton from "@/app/components/auth/AuthSubmitButton";
import Link from "next/link";

const RegistrationPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    formik,
    loading,
    countries,
    states,
    countryLoading,
    handleCountryChange,
    handleStateChange,
  } = useRegistrationForm();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-0 w-full h-screen overflow-hidden">
      {/* Left side image */}
      <div className="hidden md:block w-1/2 h-full">
        <AuthIllustration />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 overflow-y-auto px-4 md:px-12 h-full py-6">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-2xl w-full mx-auto "
        >
          <AuthHeader
            title="Sign Up"
            subtitle="Register with Christ Baptist Church"
          />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phoneNumber", label: "Phone Number", type: "text" },
              { name: "password", label: "Password", type: "password" },
              {
                name: "confirmPassword",
                label: "Confirm Password",
                type: "password",
              },
            ].map((field) => {
              const isPasswordField =
                field.name === "password" || field.name === "confirmPassword";
              const isPasswordVisible =
                field.name === "password" ? showPassword : showConfirmPassword;

              const error =
                formik.errors[field.name as keyof typeof formik.errors];
              const touched =
                formik.touched[field.name as keyof typeof formik.touched];
              const value =
                formik.values[field.name as keyof typeof formik.values];

              return (
                <div key={field.name} className="relative">
                  <input
                    type={
                      isPasswordField && isPasswordVisible ? "text" : field.type
                    }
                    className={`w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100 
    ${touched && error ? "placeholder-red-500" : ""}`}
                    placeholder={
                      value
                        ? field.label
                        : typeof error === "string"
                          ? error
                          : field.label
                    }
                    {...formik.getFieldProps(field.name)}
                  />

                  {isPasswordField && (
                    <button
                      type="button"
                      onClick={() =>
                        field.name === "password"
                          ? setShowPassword(!showPassword)
                          : setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                    >
                      {isPasswordVisible ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  )}

                  {/* Show error below ONLY after user types */}
                  {touched && error && value && (
                    <p className="text-red-500 text-sm mt-1">{String(error)}</p>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="text-[16px] uppercase font-bold mt-6 text-gray-800 dark:text-white">
            Optional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            {/* Gender */}
            <div>
              <select
                className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100"
                {...formik.getFieldProps("gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <input
                type="date"
                className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100"
                {...formik.getFieldProps("dateOfBirth")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { name: "street", label: "Street" },
              { name: "city", label: "City" },
            ].map((field) => {
              const error =
                formik.errors.address?.[
                  field.name as keyof typeof formik.errors.address
                ];
              const touched =
                formik.touched.address?.[
                  field.name as keyof typeof formik.touched.address
                ];
              const value =
                formik.values.address?.[
                  field.name as keyof typeof formik.values.address
                ];

              return (
                <div key={field.name}>
                  <input
                    type="text"
                    name={`address.${field.name}`}
                    className={`w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100 ${
                      touched && error ? "border-red-500" : ""
                    }`}
                    onChange={formik.handleChange}
                    value={value || ""}
                    placeholder={value ? field.label : error || field.label}
                    style={{
                      color: value ? "inherit" : error ? "red" : "inherit",
                    }}
                  />
                  {touched && error && value && (
                    <p className="text-red-500 text-sm mt-1">{String(error)}</p>
                  )}
                </div>
              );
            })}

            {/* Country Select */}
            <div>
              <select
                name="address.country"
                className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100"
                onChange={handleCountryChange}
                value={formik.values.address?.country || ""}
                disabled={countryLoading}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country}
                  </option>
                ))}
              </select>
            </div>

            {/* State Select */}
            <div>
              <select
                name="address.state"
                className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100"
                onChange={handleStateChange}
                value={formik.values.address?.state || ""}
                disabled={
                  !formik.values.address?.country || states.length === 0
                }
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <AuthSubmitButton
            loading={loading || formik.isSubmitting}
            label="Register"
            submitText="Registering..."
            className="w-full mt-6"
          />

          <div className="flex justify-center items-center mt-4">
            Do you have an account?{" "}
            <Link href="/member/login" className="text-primary-button dark:text-white ml-2">
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
