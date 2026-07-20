import * as React from "react";
import { cx } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    className={cx(
      "h-9 w-full rounded-md border bg-white px-3 text-[12px] text-gray-800 transition-colors",
      "placeholder:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
      "read-only:cursor-default read-only:bg-gray-50 read-only:text-gray-500",
      "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
      invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
