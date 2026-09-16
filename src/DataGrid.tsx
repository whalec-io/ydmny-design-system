import * as React from "react";
import { Checkbox } from "./Checkbox";
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
  /** Renders a leading sequence column, starting at 1. */
  showIndex?: boolean;
  /** Header text for the automatic sequence column. */
  indexTitle?: string;
  /** Renders a checkbox at the start of every row. */
  selectable?: boolean;
  /** Selected row keys. Use with onSelectedRowKeysChange for controlled selection. */
  selectedRowKeys?: React.Key[];
  /** Initial selected row keys for uncontrolled selection. */
  defaultSelectedRowKeys?: React.Key[];
  /** Called with the selected row-key array when a row checkbox is changed. */
  onSelectedRowKeysChange?: (keys: React.Key[]) => void;
  sortable?: boolean;
  filterable?: boolean;
  onRowClick?: (row: T, index: number) => void;
  selectedKey?: React.Key;
  emptyText?: string;
  maxHeight?: string;
  /** Enables client-side pagination. Takes precedence when used with infiniteScroll. */
  pageable?: boolean;
  /** One-based current page. Providing this prop makes the page controlled. */
  page?: number;
  /** Called when the current page changes. */
  onPageChange?: (page: number) => void;
  /** Number of rows per page. Providing this prop makes the page size controlled. */
  pageSize?: number;
  /** Options shown in the page-size selector. */
  pageSizeOptions?: number[];
  /** Called when the page size changes. */
  onPageSizeChange?: (pageSize: number) => void;
  /** Enables incremental row rendering as the grid is scrolled. */
  infiniteScroll?: boolean;
  /** Number of rows initially rendered when infiniteScroll is enabled. */
  initialRenderCount?: number;
  /** Number of additional rows rendered each time the scroll reaches the end. */
  loadMoreCount?: number;
  /** Set true when more rows can be loaded externally. */
  hasMore?: boolean;
  /** Set true while an external onLoadMore request is in progress. */
  loading?: boolean;
  /** Called at the end of the scroll after all currently supplied rows are rendered. */
  onLoadMore?: () => void;
  className?: string;
}

type SortState = { key: string; dir: "asc" | "desc" } | null;

const IconSort = ({ dir }: { dir: "asc" | "desc" | null }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path
      d="M7 10l5-5 5 5"
      stroke={dir === "asc" ? "var(--ydmnypg-color-primary)" : "var(--ydmnypg-color-border)"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 14l5 5 5-5"
      stroke={dir === "desc" ? "var(--ydmnypg-color-primary)" : "var(--ydmnypg-color-border)"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconFilter = ({ active }: { active: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path
      d="M3 5h18l-7 8v5l-4 2v-7L3 5z"
      stroke={active ? "var(--ydmnypg-color-primary)" : "var(--ydmnypg-color-text-subtle)"}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
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
  showIndex = false,
  indexTitle = "No.",
  selectable = false,
  selectedRowKeys: selectedRowKeysProp,
  defaultSelectedRowKeys = [],
  onSelectedRowKeysChange,
  sortable,
  filterable,
  onRowClick,
  selectedKey,
  emptyText = "데이터가 없습니다.",
  maxHeight = "100%",
  pageable = false,
  page: pageProp,
  onPageChange,
  pageSize: pageSizeProp,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  infiniteScroll = false,
  initialRenderCount = 50,
  loadMoreCount = 50,
  hasMore,
  loading = false,
  onLoadMore,
  className,
}: DataGridProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null);
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [openFilter, setOpenFilter] = React.useState<string | null>(null);
  const [internalPage, setInternalPage] = React.useState(1);
  const [internalPageSize, setInternalPageSize] = React.useState(20);
  const [renderedCount, setRenderedCount] = React.useState(initialRenderCount);
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = React.useState<React.Key[]>(defaultSelectedRowKeys);
  const externalLoadPending = React.useRef(false);

  const keyOf = (row: T, index: number): React.Key => (typeof rowKey === "function" ? rowKey(row, index) : (row[rowKey] as React.Key));
  const selectedRowKeys = selectedRowKeysProp ?? internalSelectedRowKeys;

  const changeSelectedRowKeys = (keys: React.Key[]) => {
    if (selectedRowKeysProp === undefined) setInternalSelectedRowKeys(keys);
    onSelectedRowKeysChange?.(keys);
  };

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

  React.useEffect(() => {
    setRenderedCount(initialRenderCount);
  }, [rows, filters, sort, initialRenderCount]);

  React.useEffect(() => {
    if (!loading) externalLoadPending.current = false;
  }, [loading, rows.length]);

  const pageSize = Math.max(1, pageSizeProp ?? internalPageSize);
  const pageCount = Math.max(1, Math.ceil(processed.length / pageSize));
  const currentPage = Math.min(Math.max(1, pageProp ?? internalPage), pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pagedRows = pageable ? processed.slice(pageStart, pageStart + pageSize) : processed;
  const isInfiniteScroll = infiniteScroll && !pageable;
  const visibleRows = isInfiniteScroll ? pagedRows.slice(0, renderedCount) : pagedRows;
  const hasLocalMore = visibleRows.length < processed.length;
  const availablePageSizes = Array.from(new Set([...pageSizeOptions.filter(size => size > 0), pageSize]));

  const changePage = (nextPage: number) => {
    const next = Math.min(Math.max(1, nextPage), pageCount);
    if (pageProp === undefined) setInternalPage(next);
    onPageChange?.(next);
  };

  const changePageSize = (nextPageSize: number) => {
    if (pageSizeProp === undefined) setInternalPageSize(nextPageSize);
    onPageSizeChange?.(nextPageSize);
    changePage(1);
  };

  const loadMore = () => {
    if (hasLocalMore) {
      setRenderedCount(count => count + loadMoreCount);
      return;
    }
    if (hasMore && onLoadMore && !loading && !externalLoadPending.current) {
      externalLoadPending.current = true;
      onLoadMore();
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (!isInfiniteScroll) return;
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight <= 80) loadMore();
  };

  const toggleSort = (col: DataGridColumn<T>) => {
    if (!sortable || col.sortable === false) return;
    changePage(1);
    setSort(prev => {
      if (prev?.key !== col.key) return { key: col.key, dir: "asc" };
      if (prev.dir === "asc") return { key: col.key, dir: "desc" };
      return null;
    });
  };

  const alignClass = (a?: string) => (a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left");

  return (
    <div
      className={cx("overflow-auto rounded-[var(--ydmnypg-radius-md)] border border-[color:var(--ydmnypg-color-border-subtle)]", className)}
      style={{ maxHeight }}
      onScroll={handleScroll}
    >
      <table className="w-full border-collapse text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)]">
        <thead className="sticky top-0 z-10">
          <tr className="bg-[color:var(--ydmnypg-color-surface-muted)]">
            {selectable && <th className="w-11 border-b border-[color:var(--ydmnypg-color-border)] px-2.5 py-2" aria-label="행 선택" />}
            {showIndex && (
              <th className="w-14 border-b border-[color:var(--ydmnypg-color-border)] px-2.5 py-2 text-center font-medium text-[color:var(--ydmnypg-color-text-muted)] whitespace-nowrap">
                {indexTitle}
              </th>
            )}
            {columns.map(col => {
              const canSort = sortable && col.sortable !== false;
              const canFilter = filterable && col.filterable;
              const isFiltered = !!filters[col.key];
              return (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={cx(
                    "relative border-b border-[color:var(--ydmnypg-color-border)] px-2.5 py-2 font-medium text-[color:var(--ydmnypg-color-text-muted)] whitespace-nowrap",
                    alignClass(col.align),
                  )}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={cx("truncate", canSort && "cursor-pointer hover:text-[color:var(--ydmnypg-color-text-primary)]")}
                      onClick={() => toggleSort(col)}
                    >
                      {col.title}
                    </span>
                    {canSort && <IconSort dir={sort?.key === col.key ? sort.dir : null} />}
                    {canFilter && (
                      <button
                        type="button"
                        onClick={() => setOpenFilter(openFilter === col.key ? null : col.key)}
                        className="cursor-pointer rounded-[var(--ydmnypg-radius-sm)] p-0.5 hover:bg-[color:var(--ydmnypg-color-border-subtle)]"
                      >
                        <IconFilter active={isFiltered} />
                      </button>
                    )}
                  </div>
                  {canFilter && openFilter === col.key && (
                    <div
                      className="absolute left-0 top-full z-20 mt-1 w-[200px] rounded-[var(--ydmnypg-radius-md)] border border-[color:var(--ydmnypg-color-border-subtle)] bg-[color:var(--ydmnypg-color-surface)] p-2 shadow-lg"
                      onClick={e => e.stopPropagation()}
                    >
                      <input
                        autoFocus
                        value={filters[col.key] || ""}
                        onChange={e => {
                          changePage(1);
                          setFilters(prev => ({ ...prev, [col.key]: e.target.value }));
                        }}
                        onKeyDown={e => {
                          if (e.key === "Enter") setOpenFilter(null);
                        }}
                        placeholder="검색어"
                        className="w-full rounded-[var(--ydmnypg-radius-md)] border border-[color:var(--ydmnypg-color-border)] px-2 py-1 text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)] focus:border-[color:var(--ydmnypg-color-primary)] focus:outline-none"
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
              <td colSpan={columns.length + (showIndex ? 1 : 0) + (selectable ? 1 : 0)} className="py-8 text-center text-[color:var(--ydmnypg-color-text-subtle)]">
                {emptyText}
              </td>
            </tr>
          ) : (
            visibleRows.map((row, index) => {
              const rowIndex = pageable ? pageStart + index : index;
              const k = keyOf(row, rowIndex);
              const selected = selectedKey != null && selectedKey === k;
              const checked = selectedRowKeys.includes(k);
              return (
                <tr
                  key={k}
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={cx(
                    "border-b border-[color:var(--ydmnypg-color-border-subtle)]",
                    onRowClick && "cursor-pointer",
                    selected ? "bg-[color:var(--ydmnypg-color-surface-selected)]" : "hover:bg-[color:var(--ydmnypg-color-surface-subtle)]",
                  )}
                >
                  {selectable && (
                    <td className="border-b border-[color:var(--ydmnypg-color-border-subtle)] px-2.5 py-2 text-center" onClick={event => event.stopPropagation()}>
                      <Checkbox
                        checked={checked}
                        onCheckedChange={nextChecked => {
                          changeSelectedRowKeys(nextChecked ? [...selectedRowKeys, k] : selectedRowKeys.filter(key => key !== k));
                        }}
                        ariaLabel={`${rowIndex + 1}번 행 선택`}
                      />
                    </td>
                  )}
                  {showIndex && (
                    <td className="border-b border-[color:var(--ydmnypg-color-border-subtle)] px-2.5 py-2 text-center text-[color:var(--ydmnypg-color-text-secondary)]">
                      {rowIndex + 1}
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={cx(
                        "border-b border-[color:var(--ydmnypg-color-border-subtle)] px-2.5 py-2 text-[color:var(--ydmnypg-color-text-secondary)]",
                        alignClass(col.align),
                      )}
                    >
                      {col.render ? col.render(row, rowIndex) : String(getCell(row, col) ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {pageable && processed.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--ydmnypg-color-border-subtle)] px-2.5 py-2 text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)] text-[color:var(--ydmnypg-color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <span>페이지당</span>
            <select
              aria-label="페이지당 행 수"
              value={pageSize}
              onChange={event => changePageSize(Number(event.target.value))}
              className="rounded-[var(--ydmnypg-radius-sm)] border border-[color:var(--ydmnypg-color-border)] bg-[color:var(--ydmnypg-color-surface)] px-1.5 py-0.5 text-[color:var(--ydmnypg-color-text-secondary)] focus:border-[color:var(--ydmnypg-color-primary)] focus:outline-none"
            >
              {availablePageSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>총 {processed.length}건</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="이전 페이지"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              className="rounded-[var(--ydmnypg-radius-sm)] border border-[color:var(--ydmnypg-color-border)] bg-[color:var(--ydmnypg-color-surface)] px-2 py-0.5 text-[color:var(--ydmnypg-color-text-secondary)] hover:bg-[color:var(--ydmnypg-color-surface-subtle)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              이전
            </button>
            <span className="min-w-12 text-center">
              {currentPage} / {pageCount}
            </span>
            <button
              type="button"
              aria-label="다음 페이지"
              disabled={currentPage === pageCount}
              onClick={() => changePage(currentPage + 1)}
              className="rounded-[var(--ydmnypg-radius-sm)] border border-[color:var(--ydmnypg-color-border)] bg-[color:var(--ydmnypg-color-surface)] px-2 py-0.5 text-[color:var(--ydmnypg-color-text-secondary)] hover:bg-[color:var(--ydmnypg-color-surface-subtle)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      )}
      {isInfiniteScroll && (hasLocalMore || hasMore) && (
        <div className="border-t border-[color:var(--ydmnypg-color-border-subtle)] px-2.5 py-2 text-center text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)] text-[color:var(--ydmnypg-color-text-muted)]">
          {loading ? "불러오는 중..." : "더 많은 항목을 불러오려면 아래로 스크롤하세요."}
        </div>
      )}
    </div>
  );
}
