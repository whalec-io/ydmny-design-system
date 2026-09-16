import * as React from "react";
import { Card } from "./Card";

export interface SectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({ title, action, children }: SectionProps) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between border-b border-[color:var(--ydmnypg-color-border-subtle)] pb-2">
        <span className="text-[length:var(--ydmnypg-font-size-description)] font-medium leading-[var(--ydmnypg-line-height-description)] text-[color:var(--ydmnypg-color-text-muted)]">
          {title}
        </span>
        {action}
      </div>
      {children}
    </Card>
  );
}
