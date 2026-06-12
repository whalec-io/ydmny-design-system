import * as React from "react";
import { cx } from "./utils";

export type BadgeTone = "blue" | "green" | "gray" | "red" | "amber" | "indigo";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClass: Record<BadgeTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  gray: "bg-gray-100 text-gray-600",
  red: "bg-red-50 text-red-700",
  amber: "bg-amber-50 text-amber-700",
  indigo: "bg-indigo-50 text-indigo-700",
};

export function Badge({ className, tone = "gray", ...props }: BadgeProps) {
  return (
    <span
      className={cx("inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[11px] font-medium", toneClass[tone], className)}
      {...props}
    />
  );
}
