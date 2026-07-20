import * as React from "react";
import { cx } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, invalid, ...props }, ref) => (
  <input
    ref={ref}
    className={cx(
      "h-9 w-full rounded-[var(--ydmnypg-radius-md)] border bg-[color:var(--ydmnypg-color-surface)] px-3 text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)] text-[color:var(--ydmnypg-color-text-primary)] transition-colors",
      "placeholder:text-[color:var(--ydmnypg-color-border)] disabled:cursor-not-allowed disabled:bg-[color:var(--ydmnypg-color-surface-subtle)] disabled:text-[color:var(--ydmnypg-color-text-subtle)]",
      "read-only:cursor-default read-only:bg-[color:var(--ydmnypg-color-surface-subtle)] read-only:text-[color:var(--ydmnypg-color-text-muted)]",
      "focus:border-[color:var(--ydmnypg-color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ydmnypg-color-primary-subtle)]",
      invalid
        ? "border-[color:var(--ydmnypg-color-danger-border)] focus:border-[color:var(--ydmnypg-color-danger)] focus:ring-[color:var(--ydmnypg-color-danger-subtle)]"
        : "border-[color:var(--ydmnypg-color-border)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
