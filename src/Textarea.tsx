import * as React from "react";
import { cx } from "./utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cx(
      "min-h-24 w-full rounded-[var(--ydmnypg-radius-md)] border bg-[color:var(--ydmnypg-color-surface)] px-3 py-2 text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)] text-[color:var(--ydmnypg-color-text-primary)] transition-colors",
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

Textarea.displayName = "Textarea";
