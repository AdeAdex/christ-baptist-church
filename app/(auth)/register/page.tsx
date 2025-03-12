"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import registrationSchema from "@/app/components/validation/registrationSchema";
import { useRouter } from "next/navigation";
import { /* Address, */ FormValues } from "@/app/types/registration";
import { SnackbarProvider, useSnackbar } from "notistack";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegistrationPage: React.FC = () => {
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
      },
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        enqueueSnackbar("Registration successful!", { variant: "success" });

        setTimeout(() => {
          router.push("/login");
        }, 3000);

        resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: "error" });
        } else {
          enqueueSnackbar("An unknown error occurred", { variant: "error" });
        }
      }
       finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-[16px] uppercase font-bold mb-4 text-gray-800 dark:text-white">
          Register with Christ Baptyist Church
        </h2>

        {/* Required Fields */}
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

            const hasError =
              !formik.values[field.name as keyof FormValues] &&
              formik.errors[field.name as keyof FormValues];

            return (
              <div key={field.name} className="relative">
                <input
                  type={
                    isPasswordField && isPasswordVisible ? "text" : field.type
                  }
                  className={`w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white border-gray-300 
          ${hasError ? "placeholder-red-500" : ""}`}
                  placeholder={
                    hasError
                      ? (formik.errors[
                          field.name as keyof FormValues
                        ] as string)
                      : `Enter ${field.label.toLowerCase()}`
                  }
                  {...formik.getFieldProps(field.name as keyof FormValues)}
                  onBlur={formik.handleBlur}
                />

                {isPasswordField && (
                  <button
                    type="button"
                    onClick={
                      field.name === "password"
                        ? togglePasswordVisibility
                        : toggleConfirmPasswordVisibility
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

                {formik.touched[field.name as keyof FormValues] &&
                formik.errors[field.name as keyof FormValues] &&
                formik.values[field.name as keyof FormValues] ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[field.name as keyof FormValues] as string}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Optional Fields */}
        <h3 className="text-[16px] uppercase font-bold mt-6 text-gray-800 dark:text-white">
          Optional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {/* Gender */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender
            </label> */}
            <select
              className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white"
              {...formik.getFieldProps("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date of Birth
            </label> */}
            <input
              type="date"
              className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white"
              {...formik.getFieldProps("dateOfBirth")}
            />
          </div>
        </div>

        {/* Address Section */}
        {/* <h3 className="text-lg font-semibold mt-6 text-gray-700 dark:text-gray-300">
          Address (Optional)
        </h3> */}
        {/* Address Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {/* Street */}
          <div className="w-full">
            <input
              type="text"
              name="address.street"
              className="w-full p-2 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
              onChange={formik.handleChange}
              value={formik.values.address.street}
              placeholder="Enter your street"
            />
          </div>

          {/* City */}
          <div className="w-full">
            <input
              type="text"
              name="address.city"
              className="w-full p-2 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
              onChange={formik.handleChange}
              value={formik.values.address.city}
              placeholder="Enter your city"
            />
          </div>

          {/* State Dropdown */}
          <div className="w-full">
            <select
              name="address.state"
              className="w-full p-2 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
              onChange={formik.handleChange}
              value={formik.values.address.state}
            >
              <option value="">Select State</option>
              <option value="California">California</option>
              <option value="Texas">Texas</option>
              <option value="Ontario">Ontario</option>
              <option value="Lagos">Lagos</option>
              {/* Add more states based on country selection */}
            </select>
          </div>

          {/* Country Dropdown */}
          <div className="w-full">
            <select
              name="address.country"
              className="w-full p-2 border rounded-md mt-1 dark:bg-gray-700 dark:text-white"
              onChange={formik.handleChange}
              value={formik.values.address.country}
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Nigeria">Nigeria</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 mt-6"
          disabled={formik.isSubmitting || loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;
