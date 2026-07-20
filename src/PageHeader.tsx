import * as React from "react";

export interface PageHeaderProps {
  title?: string;
  path?: string[];
  children?: React.ReactNode;
}

export function PageHeader({ title, path, children }: PageHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        {title && <h1 className="truncate text-[18px] font-bold text-gray-800">{title}</h1>}
        {path && (
          <div className="mt-0.5 flex items-center gap-[6px] text-[12px] text-gray-400">
            {path.map((segment, index) => (
              <React.Fragment key={segment}>
                {index > 0 && <span className="text-gray-300">/</span>}
                <span className={index === path.length - 1 ? "font-medium text-gray-600" : ""}>{segment}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  );
}
