import * as React from "react";
import { cx } from "./utils";

export type BadgeTone = "blue" | "green" | "gray" | "red" | "amber" | "indigo";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClass: Record<BadgeTone, string> = {
  blue: "bg-[color:var(--ydmnypg-color-primary-subtle)] text-[color:var(--ydmnypg-color-primary)]",
  green: "bg-[color:var(--ydmnypg-color-success-subtle)] text-[color:var(--ydmnypg-color-success)]",
  gray: "bg-[color:var(--ydmnypg-color-surface-muted)] text-[color:var(--ydmnypg-color-text-muted)]",
  red: "bg-[color:var(--ydmnypg-color-danger-subtle)] text-[color:var(--ydmnypg-color-danger)]",
  amber: "bg-[color:var(--ydmnypg-color-warning-subtle)] text-[color:var(--ydmnypg-color-warning)]",
  indigo: "bg-[color:var(--ydmnypg-color-indigo-subtle)] text-[color:var(--ydmnypg-color-indigo)]",
};

export function Badge({ className, tone = "gray", ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[length:var(--ydmnypg-font-size-meta)] font-medium leading-[var(--ydmnypg-line-height-meta)]",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}
