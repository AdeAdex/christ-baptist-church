// /app/components/auth/AuthSubmitButton.tsx
import { IoMdLock } from "react-icons/io";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface AuthSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  label: string;
  icon?: boolean;
  submitText?: string;
  className?: string;
}

const AuthSubmitButton = ({
  loading,
  label,
  icon = false,
  submitText,
  className,
  disabled,
  ...props
}: AuthSubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={clsx(
        "flex bg-primary-button hover:bg-primary-button-hover text-white items-center justify-center py-2 rounded-2xl transition disabled:bg-gray-400",
        className,
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "cursor-pointer"
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? `${submitText}` : label}
      {icon && <IoMdLock className="ml-2" />}
    </button>
  );
};

export default AuthSubmitButton;
