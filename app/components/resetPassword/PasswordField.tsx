"use client";

import { Field } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

interface PasswordFieldProps {
  name: string;
  label?: string;
  placeholder: string;
}

const PasswordField = ({ name/* , label */, placeholder }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-1 mt-2">
      {/* <label className="font-bold dark:text-white text-[#434343]" htmlFor={name}>
        {label}
      </label> */}
      <Field
        type={showPassword ? "text" : "password"}
        name={name}
        autoComplete="on"
        className="w-full p-3 rounded-md dark:bg-gray-700 bg-slate-100 mb-3"
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        className="absolute right-3 top-[40%] transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
      </button>
    </div>
  );
};

export default PasswordField;
