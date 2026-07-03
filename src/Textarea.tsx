import * as React from "react";
import { cx } from "./utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cx(
      "min-h-24 w-full rounded-md border bg-white px-3 py-2 text-[13px] text-gray-800 transition-colors",
      "placeholder:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
      "read-only:cursor-default read-only:bg-gray-50 read-only:text-gray-500",
      "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
      invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
