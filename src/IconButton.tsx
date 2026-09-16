import * as React from "react";
import { cx } from "./utils";

type IconButtonVariant = "ghost" | "secondary" | "danger";
type IconButtonSize = "sm" | "md";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const variantClass: Record<IconButtonVariant, string> = {
  ghost:
    "border-transparent bg-transparent text-[color:var(--ydmnypg-color-text-muted)] hover:bg-[color:var(--ydmnypg-color-surface-muted)] hover:text-[color:var(--ydmnypg-color-text-secondary)]",
  secondary:
    "border-[color:var(--ydmnypg-color-border)] bg-[color:var(--ydmnypg-color-surface)] text-[color:var(--ydmnypg-color-text-muted)] hover:bg-[color:var(--ydmnypg-color-surface-subtle)]",
  danger: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-danger)] hover:bg-[color:var(--ydmnypg-color-danger-subtle)]",
};

const sizeClass: Record<IconButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--ydmnypg-radius-md)] border transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ydmnypg-color-primary)] focus-visible:ring-offset-1",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  ),
);

IconButton.displayName = "IconButton";
