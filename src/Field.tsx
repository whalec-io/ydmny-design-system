import * as React from "react";
import { cx } from "./utils";

export interface FieldProps {
  label: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, required, hint, error, children, className }: FieldProps) {
  return (
    <label className={cx("flex flex-col gap-1", className)}>
      <span className="text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)] text-[color:var(--ydmnypg-color-text-muted)]">
        {label}
        {required && <span className="ml-0.5 text-[color:var(--ydmnypg-color-danger)]">*</span>}
      </span>
      {children}
      {error ? (
        <span className="text-[length:var(--ydmnypg-font-size-meta)] leading-[var(--ydmnypg-line-height-meta)] text-[color:var(--ydmnypg-color-danger)]">
          {error}
        </span>
      ) : (
        hint && (
          <span className="text-[length:var(--ydmnypg-font-size-meta)] leading-[var(--ydmnypg-line-height-meta)] text-[color:var(--ydmnypg-color-text-subtle)]">
            {hint}
          </span>
        )
      )}
    </label>
  );
}
