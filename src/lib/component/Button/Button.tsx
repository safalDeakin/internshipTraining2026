import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

export default function Button({
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    children,
    className = "",
    ...props
}: ButtonProps) {

    const base =
        "inline-flex items-center justify-center gap-2 font-medium transition-colors " +
        "disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<ButtonVariant, string> = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline:
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
        ghost:
            "text-gray-700 hover:bg-gray-100",
        danger:
            "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes: Record<ButtonSize, string> = {
        sm: "h-8 px-3 text-xs rounded",
        md: "h-9 px-4 text-sm rounded",
        lg: "h-10 px-5 text-sm rounded",
    };

    return (
        <button
            {...props}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    );
}