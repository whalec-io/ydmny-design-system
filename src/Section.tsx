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
      <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
        <span className="text-[13px] font-medium text-gray-500">{title}</span>
        {action}
      </div>
      {children}
    </Card>
  );
}
