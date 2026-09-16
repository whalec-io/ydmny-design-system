import * as React from "react";
import { cx } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "small" | "medium" | "large" | "sm" | "md";
export type ButtonRounded = "small" | "medium" | "large" | "full";
export type ButtonFillMode = "solid" | "flat" | "outline" | "clear" | "link";
export type ButtonThemeColor = "base" | "primary" | "secondary" | "tertiary" | "info" | "success" | "warning" | "error" | "inverse";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @deprecated Use themeColor and fillMode instead. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fillMode?: ButtonFillMode;
  themeColor?: ButtonThemeColor;
  icon?: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-[color:var(--ydmnypg-color-primary)] bg-[color:var(--ydmnypg-color-primary)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-primary-hover)]",
  secondary:
    "border-[color:var(--ydmnypg-color-border)] bg-[color:var(--ydmnypg-color-surface)] text-[color:var(--ydmnypg-color-text-secondary)] hover:bg-[color:var(--ydmnypg-color-surface-subtle)]",
  ghost:
    "border-transparent bg-transparent text-[color:var(--ydmnypg-color-text-muted)] hover:bg-[color:var(--ydmnypg-color-surface-muted)]",
  danger:
    "border-[color:var(--ydmnypg-color-danger)] bg-[color:var(--ydmnypg-color-danger)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-danger-hover)]",
};

const sizeClass: Record<ButtonSize, string> = {
  small: "h-8 px-3 text-[length:var(--ydmnypg-font-size-button)] leading-[var(--ydmnypg-line-height-caption)]",
  medium: "h-9 px-4 text-[length:var(--ydmnypg-font-size-button)] leading-[var(--ydmnypg-line-height-description)]",
  large: "h-10 px-5 text-[length:var(--ydmnypg-font-size-button)] leading-[var(--ydmnypg-line-height-body)]",
  sm: "h-8 px-3 text-[length:var(--ydmnypg-font-size-button)] leading-[var(--ydmnypg-line-height-caption)]",
  md: "h-9 px-4 text-[length:var(--ydmnypg-font-size-button)] leading-[var(--ydmnypg-line-height-description)]",
};

const roundedClass: Record<ButtonRounded, string> = {
  small: "rounded-[var(--ydmnypg-radius-sm)]",
  medium: "rounded-[var(--ydmnypg-radius-md)]",
  large: "rounded-[var(--ydmnypg-radius-lg)]",
  full: "rounded-full",
};

const themeColorClass: Record<ButtonThemeColor, Record<ButtonFillMode, string>> = {
  base: {
    solid:
      "border-[color:var(--ydmnypg-color-base)] bg-[color:var(--ydmnypg-color-base)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-base-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-base-subtle)] text-[color:var(--ydmnypg-color-base)] hover:bg-[color:var(--ydmnypg-color-border-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-base)] bg-transparent text-[color:var(--ydmnypg-color-base)] hover:bg-[color:var(--ydmnypg-color-base-subtle)]",
    clear: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-base)] hover:bg-[color:var(--ydmnypg-color-base-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-base)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-base-hover)]",
  },
  primary: {
    solid:
      "border-[color:var(--ydmnypg-color-primary)] bg-[color:var(--ydmnypg-color-primary)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-primary-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-primary-subtle)] text-[color:var(--ydmnypg-color-primary)] hover:bg-[color:var(--ydmnypg-color-primary-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-primary)] bg-transparent text-[color:var(--ydmnypg-color-primary)] hover:bg-[color:var(--ydmnypg-color-primary-subtle)]",
    clear:
      "border-transparent bg-transparent text-[color:var(--ydmnypg-color-primary)] hover:bg-[color:var(--ydmnypg-color-primary-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-primary)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-primary-hover)]",
  },
  secondary: {
    solid:
      "border-[color:var(--ydmnypg-color-secondary)] bg-[color:var(--ydmnypg-color-secondary)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-secondary-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-secondary-subtle)] text-[color:var(--ydmnypg-color-secondary)] hover:bg-[color:var(--ydmnypg-color-secondary-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-secondary)] bg-transparent text-[color:var(--ydmnypg-color-secondary)] hover:bg-[color:var(--ydmnypg-color-secondary-subtle)]",
    clear:
      "border-transparent bg-transparent text-[color:var(--ydmnypg-color-secondary)] hover:bg-[color:var(--ydmnypg-color-secondary-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-secondary)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-secondary-hover)]",
  },
  tertiary: {
    solid:
      "border-[color:var(--ydmnypg-color-tertiary)] bg-[color:var(--ydmnypg-color-tertiary)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-tertiary-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-tertiary-subtle)] text-[color:var(--ydmnypg-color-tertiary)] hover:bg-[color:var(--ydmnypg-color-tertiary-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-tertiary)] bg-transparent text-[color:var(--ydmnypg-color-tertiary)] hover:bg-[color:var(--ydmnypg-color-tertiary-subtle)]",
    clear:
      "border-transparent bg-transparent text-[color:var(--ydmnypg-color-tertiary)] hover:bg-[color:var(--ydmnypg-color-tertiary-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-tertiary)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-tertiary-hover)]",
  },
  info: {
    solid:
      "border-[color:var(--ydmnypg-color-info)] bg-[color:var(--ydmnypg-color-info)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-info-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-info-subtle)] text-[color:var(--ydmnypg-color-info)] hover:bg-[color:var(--ydmnypg-color-info-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-info)] bg-transparent text-[color:var(--ydmnypg-color-info)] hover:bg-[color:var(--ydmnypg-color-info-subtle)]",
    clear: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-info)] hover:bg-[color:var(--ydmnypg-color-info-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-info)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-info-hover)]",
  },
  success: {
    solid:
      "border-[color:var(--ydmnypg-color-success)] bg-[color:var(--ydmnypg-color-success)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-success-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-success-subtle)] text-[color:var(--ydmnypg-color-success)] hover:bg-[color:var(--ydmnypg-color-success-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-success)] bg-transparent text-[color:var(--ydmnypg-color-success)] hover:bg-[color:var(--ydmnypg-color-success-subtle)]",
    clear:
      "border-transparent bg-transparent text-[color:var(--ydmnypg-color-success)] hover:bg-[color:var(--ydmnypg-color-success-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-success)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-success-hover)]",
  },
  warning: {
    solid:
      "border-[color:var(--ydmnypg-color-warning)] bg-[color:var(--ydmnypg-color-warning)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-warning-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-warning-subtle)] text-[color:var(--ydmnypg-color-warning)] hover:bg-[color:var(--ydmnypg-color-warning-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-warning)] bg-transparent text-[color:var(--ydmnypg-color-warning)] hover:bg-[color:var(--ydmnypg-color-warning-subtle)]",
    clear:
      "border-transparent bg-transparent text-[color:var(--ydmnypg-color-warning)] hover:bg-[color:var(--ydmnypg-color-warning-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-warning)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-warning-hover)]",
  },
  error: {
    solid:
      "border-[color:var(--ydmnypg-color-error)] bg-[color:var(--ydmnypg-color-error)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-error-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-error-subtle)] text-[color:var(--ydmnypg-color-error)] hover:bg-[color:var(--ydmnypg-color-error-subtle)]",
    outline:
      "border-[color:var(--ydmnypg-color-error)] bg-transparent text-[color:var(--ydmnypg-color-error)] hover:bg-[color:var(--ydmnypg-color-error-subtle)]",
    clear: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-error)] hover:bg-[color:var(--ydmnypg-color-error-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-error)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-error-hover)]",
  },
  inverse: {
    solid:
      "border-[color:var(--ydmnypg-color-inverse)] bg-[color:var(--ydmnypg-color-inverse)] text-[color:var(--ydmnypg-color-text-inverse)] hover:bg-[color:var(--ydmnypg-color-inverse-hover)]",
    flat: "border-transparent bg-[color:var(--ydmnypg-color-inverse-subtle)] text-[color:var(--ydmnypg-color-inverse)] hover:bg-[color:var(--ydmnypg-color-border)]",
    outline:
      "border-[color:var(--ydmnypg-color-inverse)] bg-transparent text-[color:var(--ydmnypg-color-inverse)] hover:bg-[color:var(--ydmnypg-color-inverse-subtle)]",
    clear:
      "border-transparent bg-transparent text-[color:var(--ydmnypg-color-inverse)] hover:bg-[color:var(--ydmnypg-color-inverse-subtle)]",
    link: "border-transparent bg-transparent text-[color:var(--ydmnypg-color-inverse)] underline underline-offset-2 hover:text-[color:var(--ydmnypg-color-inverse-hover)]",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "medium", rounded = "medium", fillMode, themeColor, icon, children, type = "button", ...props }, ref) => {
    const usesLegacyVariant = variant !== undefined || (fillMode === undefined && themeColor === undefined);
    const colorClass = usesLegacyVariant
      ? variantClass[variant ?? "secondary"]
      : themeColorClass[themeColor ?? "base"][fillMode ?? "solid"];

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 border font-medium transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ydmnypg-color-primary)] focus-visible:ring-offset-1",
          roundedClass[rounded],
          colorClass,
          sizeClass[size],
          className,
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
