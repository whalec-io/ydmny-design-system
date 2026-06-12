import * as React from "react";
import { cx } from "./utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, options, placeholder, invalid, ...props }, ref) => (
  <select
    ref={ref}
    className={cx(
      "h-9 w-full rounded-md border bg-white px-3 text-[13px] text-gray-800 transition-colors",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
      "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
      invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-300",
      className,
    )}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

Select.displayName = "Select";
