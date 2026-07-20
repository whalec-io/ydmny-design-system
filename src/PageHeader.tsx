import * as React from "react";

export interface PageHeaderProps {
  title?: string;
  description?: React.ReactNode;
  path?: string[];
  leading?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, path, leading, children }: PageHeaderProps) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
      <div className="flex min-w-0 items-start gap-2">
        {leading}
        <div className="min-w-0">
          {title && <h1 className="truncate text-[17px] font-semibold text-gray-900">{title}</h1>}
          {description && <p className="mt-1 text-[11px] leading-5 text-gray-500">{description}</p>}
          {path && (
            <div className="mt-1 flex items-center gap-[6px] text-[11px] text-gray-400">
              {path.map((segment, index) => (
                <React.Fragment key={`${segment}-${index}`}>
                  {index > 0 && <span className="text-gray-300">/</span>}
                  <span className={index === path.length - 1 ? "font-medium text-gray-600" : ""}>{segment}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      {children && <div className="flex shrink-0 items-center justify-end gap-2">{children}</div>}
    </div>
  );
}
