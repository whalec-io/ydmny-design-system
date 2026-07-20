import * as React from "react";
import { cx } from "./utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  ghost: "border-transparent bg-transparent text-gray-600 hover:bg-gray-100",
  danger: "border-red-600 bg-red-600 text-white hover:bg-red-700",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-9 px-4 text-[13px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", icon, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
