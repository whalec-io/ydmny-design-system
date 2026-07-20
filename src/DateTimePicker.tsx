import * as React from "react";
import { cx } from "./utils";

export interface DateTimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

// 네이티브 <input type="datetime-local"> 기반 (값은 "YYYY-MM-DDTHH:mm" 문자열)
export const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    type="datetime-local"
    className={cx(
      "h-9 w-full rounded-md border bg-white px-3 text-[13px] text-gray-800 transition-colors",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
      "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
      invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300",
      className,
    )}
    {...props}
  />
));

DateTimePicker.displayName = "DateTimePicker";
