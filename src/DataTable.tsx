import * as React from "react";
import { Checkbox } from "./Checkbox";
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
  /** Enables incremental row rendering as the table is scrolled. */
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

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  showIndex = false,
  indexTitle = "No.",
  selectable = false,
  selectedRowKeys: selectedRowKeysProp,
  defaultSelectedRowKeys = [],
  onSelectedRowKeysChange,
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
}: DataTableProps<T>) {
  const getCell = (row: T, key: keyof T | string) => (row as Record<string, unknown>)[key as string];
  const getRowKey = (row: T, index: number) => (typeof rowKey === "function" ? rowKey(row, index) : (getCell(row, rowKey) as React.Key));
  const [internalPage, setInternalPage] = React.useState(1);
  const [internalPageSize, setInternalPageSize] = React.useState(20);
  const [renderedCount, setRenderedCount] = React.useState(initialRenderCount);
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = React.useState<React.Key[]>(defaultSelectedRowKeys);
  const externalLoadPending = React.useRef(false);
  const selectedRowKeys = selectedRowKeysProp ?? internalSelectedRowKeys;

  const changeSelectedRowKeys = (keys: React.Key[]) => {
    if (selectedRowKeysProp === undefined) setInternalSelectedRowKeys(keys);
    onSelectedRowKeysChange?.(keys);
  };

  React.useEffect(() => {
    setRenderedCount(initialRenderCount);
  }, [rows, initialRenderCount]);

  React.useEffect(() => {
    if (!loading) externalLoadPending.current = false;
  }, [loading, rows.length]);

  const pageSize = Math.max(1, pageSizeProp ?? internalPageSize);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(Math.max(1, pageProp ?? internalPage), pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pagedRows = pageable ? rows.slice(pageStart, pageStart + pageSize) : rows;
  const isInfiniteScroll = infiniteScroll && !pageable;
  const visibleRows = isInfiniteScroll ? pagedRows.slice(0, renderedCount) : pagedRows;
  const hasLocalMore = visibleRows.length < rows.length;
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

  return (
    <div
      className={cx("overflow-auto rounded-[var(--ydmnypg-radius-md)] border border-[color:var(--ydmnypg-color-border-subtle)]", className)}
      style={{ maxHeight }}
      onScroll={handleScroll}
    >
      <table className="w-full border-collapse text-[length:var(--ydmnypg-font-size-caption)] leading-[var(--ydmnypg-line-height-caption)]">
        <thead>
          <tr className="border-b border-[color:var(--ydmnypg-color-border-subtle)] bg-[color:var(--ydmnypg-color-surface-subtle)]">
            {selectable && <th className="w-11 px-2.5 py-2" aria-label="행 선택" />}
            {showIndex && (
              <th className="w-14 px-2.5 py-2 text-center font-medium text-[color:var(--ydmnypg-color-text-muted)] whitespace-nowrap">
                {indexTitle}
              </th>
            )}
            {columns.map(column => (
              <th
                key={String(column.key)}
                className={cx(
                  "px-2.5 py-2 font-medium text-[color:var(--ydmnypg-color-text-muted)]",
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
              <td colSpan={columns.length + (showIndex ? 1 : 0) + (selectable ? 1 : 0)} className="p-6 text-center text-[color:var(--ydmnypg-color-text-subtle)]">
                {emptyText}
              </td>
            </tr>
          ) : (
            visibleRows.map((row, index) => {
              const rowIndex = pageable ? pageStart + index : index;
              const k = getRowKey(row, rowIndex);
              const checked = selectedRowKeys.includes(k);
              return (
                <tr
                  key={k}
                  className="border-b border-[color:var(--ydmnypg-color-border-subtle)] hover:bg-[color:var(--ydmnypg-color-surface-subtle)]"
                >
                  {selectable && (
                    <td className="px-2.5 py-2 text-center" onClick={event => event.stopPropagation()}>
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
                    <td className="px-2.5 py-2 text-center text-[color:var(--ydmnypg-color-text-secondary)]">
                      {rowIndex + 1}
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={String(column.key)}
                      className={cx(
                        "px-2.5 py-2 text-[color:var(--ydmnypg-color-text-secondary)]",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                      )}
                    >
                      {column.render ? column.render(row, rowIndex) : String(getCell(row, column.key) ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {pageable && rows.length > 0 && (
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
            <span>총 {rows.length}건</span>
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
