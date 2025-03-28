"use client";

import { Field, useField } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

interface PasswordFieldProps {
  name: string;
  placeholder: string;
}

const PasswordField = ({ name, placeholder }: PasswordFieldProps) => {
  const [field, meta] = useField(name); // Get field and meta info from Formik
  const [showPassword, setShowPassword] = useState(false);

  const hasError = meta.touched && meta.error;
  const placeholderText = hasError ? meta.error : placeholder;

  return (
    <div className="relative w-full flex flex-col gap-1 mt-2 mb-4">
      <div className="relative">
        <Field
          {...field}
          type={showPassword ? "text" : "password"}
          autoComplete="on"
          className={`w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100 border ${
            hasError ? "placeholder-red-500 text-red-500" : "border-gray-300"
          }`}
          placeholder={placeholderText} // Show error in red placeholder
        />
        <button
          type="button"
          className="absolute right-3 top-[50%] transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </button>
      </div>
      {/* Show error below input only when user starts typing */}
      {hasError && field.value.length > 0 && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default PasswordField;
