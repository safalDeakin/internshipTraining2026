import { Loader } from "lucide-react";
import type { ButtonProps } from "../../../types/posSessionTypes";

// Button color variants
const variants = {
  primary: "bg-orange-500 text-white ",
  secondary: "bg-gray-700 text-white ",
  outline: "border border-gray-300 text-gray-700 ",
  danger: "bg-red-600 text-white ",
  success: "bg-green-600 text-white",
};

// Button sizes
const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const ReusableButton = ({
  title,
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg
        font-medium transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant]}
        ${sizes[size]}
        ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader size={18} className="animate-spin" />
        </>
      ) : (
        <>
          {icon}
          {children || title}
        </>
      )}
    </button>
  );
};

export default ReusableButton;
