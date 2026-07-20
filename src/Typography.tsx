import * as React from "react";
import { cx } from "./utils";

export type TypographyVariant = "page-title" | "section-title" | "body" | "description" | "caption";

/**
 * Semantic typography tokens that can also be used when composing custom components.
 */
export const typographyClassName: Record<TypographyVariant, string> = {
  "page-title": "text-[length:var(--ydmnypg-font-size-page-title)] font-bold leading-[var(--ydmnypg-line-height-page-title)]",
  "section-title": "text-[length:var(--ydmnypg-font-size-section-title)] font-semibold leading-[var(--ydmnypg-line-height-section-title)]",
  body: "text-[length:var(--ydmnypg-font-size-body)] leading-[var(--ydmnypg-line-height-body)]",
  description: "text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)]",
  caption: "text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)]",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: TypographyVariant;
  children?: React.ReactNode;
}

export function Typography({ as: Component = "p", variant = "body", className, children, ...props }: TypographyProps) {
  return (
    <Component className={cx(typographyClassName[variant], className)} {...props}>
      {children}
    </Component>
  );
}
