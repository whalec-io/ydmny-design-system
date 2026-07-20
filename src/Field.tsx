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
      <span className="text-[11px] text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
      {error ? (
        <span className="text-[10px] text-red-500">{error}</span>
      ) : (
        hint && <span className="text-[10px] text-gray-400">{hint}</span>
      )}
    </label>
  );
}
