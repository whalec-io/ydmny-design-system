import * as React from "react";
import { cx } from "./utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cx("rounded-lg border border-gray-200 bg-white", className)} {...props} />;
}

export interface SummaryCardProps extends CardProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "blue" | "green" | "indigo" | "gray";
}

const toneClass = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  indigo: "bg-indigo-50 text-indigo-600",
  gray: "bg-gray-100 text-gray-600",
};

export function SummaryCard({ className, icon, label, value, sub, tone = "gray", ...props }: SummaryCardProps) {
  return (
    <Card className={cx("p-4", className)} {...props}>
      <div className="mb-2 flex items-center gap-2">
        {icon && <div className={cx("flex h-7 w-7 items-center justify-center rounded-md", toneClass[tone])}>{icon}</div>}
        <span className="text-[12px] text-gray-400">{label}</span>
      </div>
      <div className="truncate text-[16px] font-bold text-gray-800">{value}</div>
      {sub && <div className="mt-1 truncate text-[11px] text-gray-400">{sub}</div>}
    </Card>
  );
}
