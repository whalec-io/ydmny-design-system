import * as React from "react";
import { cx } from "./utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-[var(--ydmnypg-radius-lg)] border border-[color:var(--ydmnypg-color-border-subtle)] bg-[color:var(--ydmnypg-color-surface)]",
        className,
      )}
      {...props}
    />
  );
}

export interface SummaryCardProps extends CardProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "blue" | "green" | "indigo" | "gray";
}

const toneClass = {
  blue: "bg-[color:var(--ydmnypg-color-primary-subtle)] text-[color:var(--ydmnypg-color-primary)]",
  green: "bg-[color:var(--ydmnypg-color-success-subtle)] text-[color:var(--ydmnypg-color-success)]",
  indigo: "bg-[color:var(--ydmnypg-color-indigo-subtle)] text-[color:var(--ydmnypg-color-indigo)]",
  gray: "bg-[color:var(--ydmnypg-color-surface-muted)] text-[color:var(--ydmnypg-color-text-muted)]",
};

export function SummaryCard({ className, icon, label, value, sub, tone = "gray", ...props }: SummaryCardProps) {
  return (
    <Card className={cx("p-4", className)} {...props}>
      <div className="mb-2 flex items-center gap-2">
        {icon && (
          <div className={cx("flex h-7 w-7 items-center justify-center rounded-[var(--ydmnypg-radius-md)]", toneClass[tone])}>{icon}</div>
        )}
        <span className="text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)] text-[color:var(--ydmnypg-color-text-subtle)]">
          {label}
        </span>
      </div>
      <div className="truncate text-[length:var(--ydmnypg-font-size-section-title)] font-bold leading-[var(--ydmnypg-line-height-section-title)] text-[color:var(--ydmnypg-color-text-primary)]">
        {value}
      </div>
      {sub && (
        <div className="mt-1 truncate text-[length:var(--ydmnypg-font-size-meta)] leading-[var(--ydmnypg-line-height-meta)] text-[color:var(--ydmnypg-color-text-subtle)]">
          {sub}
        </div>
      )}
    </Card>
  );
}
