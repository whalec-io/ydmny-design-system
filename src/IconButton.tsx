import * as React from "react";
import { cx } from "./utils";

type IconButtonVariant = "ghost" | "secondary" | "danger";
type IconButtonSize = "sm" | "md";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const variantClass: Record<IconButtonVariant, string> = {
  ghost: "border-transparent bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700",
  secondary: "border-gray-300 bg-white text-gray-600 hover:bg-gray-50",
  danger: "border-transparent bg-transparent text-red-500 hover:bg-red-50",
};

const sizeClass: Record<IconButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  ),
);

IconButton.displayName = "IconButton";
