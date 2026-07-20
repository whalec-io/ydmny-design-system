import * as React from "react";
import { cx } from "./utils";

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  invalid?: boolean;
}

// 네이티브 <input type="date"> 기반 날짜 선택기 (값은 "YYYY-MM-DD" 문자열)
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    type="date"
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
  />
));

DatePicker.displayName = "DatePicker";
