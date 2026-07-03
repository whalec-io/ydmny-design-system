import * as React from "react";
import { cx } from "./utils";

export interface DataTableColumn<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: keyof T | ((row: T, index: number) => React.Key);
  emptyText?: string;
  className?: string;
}

export function DataTable<T>({ columns, rows, rowKey, emptyText = "데이터가 없습니다.", className }: DataTableProps<T>) {
  const getCell = (row: T, key: keyof T | string) => (row as Record<string, unknown>)[key as string];
  const getRowKey = (row: T, index: number) => (typeof rowKey === "function" ? rowKey(row, index) : (getCell(row, rowKey) as React.Key));

  return (
    <div className={cx("overflow-x-auto", className)}>
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map(column => (
              <th
                key={String(column.key)}
                className={cx(
                  "px-2.5 py-2 font-medium text-gray-500",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  (!column.align || column.align === "left") && "text-left",
                )}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-6 text-center text-[12px] text-gray-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={getRowKey(row, rowIndex)} className="border-b border-gray-100 hover:bg-gray-50/70">
                {columns.map(column => (
                  <td
                    key={String(column.key)}
                    className={cx(
                      "px-2.5 py-2 text-gray-700",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                    )}
                  >
                    {column.render ? column.render(row, rowIndex) : String(getCell(row, column.key) ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
