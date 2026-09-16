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
      "h-9 w-full rounded-[var(--ydmnypg-radius-md)] border bg-[color:var(--ydmnypg-color-surface)] px-3 text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)] text-[color:var(--ydmnypg-color-text-primary)] transition-colors",
      "disabled:cursor-not-allowed disabled:bg-[color:var(--ydmnypg-color-surface-subtle)] disabled:text-[color:var(--ydmnypg-color-text-subtle)]",
      "focus:border-[color:var(--ydmnypg-color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ydmnypg-color-primary-subtle)]",
      invalid
        ? "border-[color:var(--ydmnypg-color-danger-border)] focus:border-[color:var(--ydmnypg-color-danger)] focus:ring-[color:var(--ydmnypg-color-danger-subtle)]"
        : "border-[color:var(--ydmnypg-color-border)]",
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
