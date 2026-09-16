import * as React from "react";
import { Typography } from "./Typography";

export interface PageHeaderProps {
  title?: string;
  /** Supplemental text displayed beside or below the title. */
  description?: React.ReactNode;
  /** Controls where the description is displayed relative to the title. */
  descriptionPlacement?: "inline" | "below";
  path?: string[];
  children?: React.ReactNode;
}

export function PageHeader({ title, description, descriptionPlacement = "inline", path, children }: PageHeaderProps) {
  const hasTitleContent = title || description;

  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        {hasTitleContent &&
          (descriptionPlacement === "below" ? (
            <div>
              {title && (
                <Typography as="h1" variant="page-title" className="truncate text-[color:var(--ydmnypg-color-text-primary)]">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="description" className="mt-0.5 text-[color:var(--ydmnypg-color-text-muted)]">
                  {description}
                </Typography>
              )}
            </div>
          ) : (
            <div className="flex min-w-0 items-baseline gap-2">
              {title && (
                <Typography as="h1" variant="page-title" className="truncate text-[color:var(--ydmnypg-color-text-primary)]">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="description" className="truncate text-[color:var(--ydmnypg-color-text-muted)]">
                  {description}
                </Typography>
              )}
            </div>
          ))}
        {path && (
          <div className="mt-0.5 flex items-center gap-[6px] text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)] text-[color:var(--ydmnypg-color-text-subtle)]">
            {path.map((segment, index) => (
              <React.Fragment key={segment}>
                {index > 0 && <span className="text-[color:var(--ydmnypg-color-border)]">/</span>}
                <span className={index === path.length - 1 ? "font-medium text-[color:var(--ydmnypg-color-text-muted)]" : ""}>
                  {segment}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  );
}
