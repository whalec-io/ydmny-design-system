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

DateTimePicker.displayName = "DateTimePicker";
