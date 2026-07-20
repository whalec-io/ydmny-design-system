import * as React from "react";
import { cx } from "./utils";

export interface DataGridColumn<T> {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  /** default true when the grid is sortable */
  sortable?: boolean;
  /** show a per-column filter (grid must also be filterable) */
  filterable?: boolean;
  filterOperator?: "contains" | "eq";
  /** custom cell renderer */
  render?: (row: T, index: number) => React.ReactNode;
  /** value used for sort/filter/default display; defaults to row[key] */
  accessor?: (row: T) => unknown;
}

export interface DataGridProps<T> {
  columns: DataGridColumn<T>[];
  rows: T[];
  rowKey: keyof T | ((row: T, index: number) => React.Key);
  sortable?: boolean;
  filterable?: boolean;
  onRowClick?: (row: T, index: number) => void;
  selectedKey?: React.Key;
  emptyText?: string;
  maxHeight?: string;
  className?: string;
}

type SortState = { key: string; dir: "asc" | "desc" } | null;

const IconSort = ({ dir }: { dir: "asc" | "desc" | null }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M7 10l5-5 5 5" stroke={dir === "asc" ? "#2563eb" : "#cbd5e1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M7 14l5 5 5-5"
      stroke={dir === "desc" ? "#2563eb" : "#cbd5e1"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconFilter = ({ active }: { active: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" stroke={active ? "#2563eb" : "#9ca3af"} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

function getCell(row: any, col: DataGridColumn<any>) {
  if (col.accessor) return col.accessor(row);
  return row?.[col.key];
}

export function DataGrid<T>({
  columns,
  rows,
  rowKey,
  sortable,
  filterable,
  onRowClick,
  selectedKey,
  emptyText = "데이터가 없습니다.",
  maxHeight = "100%",
  className,
}: DataGridProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null);
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [openFilter, setOpenFilter] = React.useState<string | null>(null);

  const keyOf = (row: T, index: number): React.Key => (typeof rowKey === "function" ? rowKey(row, index) : (row[rowKey] as React.Key));

  const processed = React.useMemo(() => {
    let result = rows;
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;
      const col = columns.find(c => c.key === key);
      const op = col?.filterOperator || "contains";
      const lower = value.toLowerCase();
      result = result.filter(row => {
        const v = String(getCell(row, col!) ?? "").toLowerCase();
        return op === "eq" ? v === lower : v.includes(lower);
      });
    }
    if (sort) {
      const col = columns.find(c => c.key === sort.key);
      if (col) {
        result = [...result].sort((a, b) => {
          const av = getCell(a, col);
          const bv = getCell(b, col);
          if (av == null && bv == null) return 0;
          if (av == null) return sort.dir === "asc" ? -1 : 1;
          if (bv == null) return sort.dir === "asc" ? 1 : -1;
          if (typeof av === "number" && typeof bv === "number") return sort.dir === "asc" ? av - bv : bv - av;
          const cmp = String(av).localeCompare(String(bv), "ko");
          return sort.dir === "asc" ? cmp : -cmp;
        });
      }
    }
    return result;
  }, [rows, filters, sort, columns]);

  const toggleSort = (col: DataGridColumn<T>) => {
    if (!sortable || col.sortable === false) return;
    setSort(prev => {
      if (prev?.key !== col.key) return { key: col.key, dir: "asc" };
      if (prev.dir === "asc") return { key: col.key, dir: "desc" };
      return null;
    });
  };

  const alignClass = (a?: string) => (a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left");

  return (
    <div className={cx("overflow-auto rounded-md border border-gray-200", className)} style={{ maxHeight }}>
      <table className="w-full border-collapse text-[12px]">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gray-100">
            {columns.map(col => {
              const canSort = sortable && col.sortable !== false;
              const canFilter = filterable && col.filterable;
              const isFiltered = !!filters[col.key];
              return (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={cx(
                    "relative border-b border-gray-300 px-2.5 py-2 font-medium text-gray-600 whitespace-nowrap",
                    alignClass(col.align),
                  )}
                >
                  <div className="flex items-center gap-1">
                    <span className={cx("truncate", canSort && "cursor-pointer hover:text-gray-900")} onClick={() => toggleSort(col)}>
                      {col.title}
                    </span>
                    {canSort && <IconSort dir={sort?.key === col.key ? sort.dir : null} />}
                    {canFilter && (
                      <button
                        type="button"
                        onClick={() => setOpenFilter(openFilter === col.key ? null : col.key)}
                        className="cursor-pointer rounded p-0.5 hover:bg-gray-200"
                      >
                        <IconFilter active={isFiltered} />
                      </button>
                    )}
                  </div>
                  {canFilter && openFilter === col.key && (
                    <div
                      className="absolute left-0 top-full z-20 mt-1 w-[200px] rounded-md border border-gray-200 bg-white p-2 shadow-lg"
                      onClick={e => e.stopPropagation()}
                    >
                      <input
                        autoFocus
                        value={filters[col.key] || ""}
                        onChange={e => setFilters(prev => ({ ...prev, [col.key]: e.target.value }))}
                        onKeyDown={e => {
                          if (e.key === "Enter") setOpenFilter(null);
                        }}
                        placeholder="검색어"
                        className="w-full rounded-md border border-gray-300 px-2 py-1 text-[12px] focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {processed.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-gray-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            processed.map((row, index) => {
              const k = keyOf(row, index);
              const selected = selectedKey != null && selectedKey === k;
              return (
                <tr
                  key={k}
                  onClick={() => onRowClick?.(row, index)}
                  className={cx("border-b border-gray-100", onRowClick && "cursor-pointer", selected ? "bg-blue-50" : "hover:bg-gray-50")}
                >
                  {columns.map(col => (
                    <td key={col.key} className={cx("border-b border-gray-100 px-2.5 py-2 text-gray-700", alignClass(col.align))}>
                      {col.render ? col.render(row, index) : String(getCell(row, col) ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
