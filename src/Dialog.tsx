import * as React from "react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { cx } from "./utils";

export interface DialogProps {
  title: string;
  width?: number;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  confirmVariant?: "primary" | "danger";
  confirmDisabled?: boolean;
}

export function Dialog({
  title,
  width = 420,
  onClose,
  children,
  actions,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  confirmVariant = "primary",
  confirmDisabled,
}: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/35" onMouseDown={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx("relative flex max-h-[90vh] w-full flex-col rounded-lg bg-white shadow-xl")}
        style={{ maxWidth: width }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-[13px] font-semibold text-gray-800">{title}</span>
          <IconButton size="sm" onClick={onClose} aria-label="닫기">
            <span className="text-[16px] leading-none">x</span>
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto text-[12px] text-gray-800">{children}</div>
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-200 px-4 py-3">
          {actions ?? (
            <>
              <Button variant="secondary" onClick={onClose}>
                {cancelText}
              </Button>
              {onConfirm && (
                <Button variant={confirmVariant === "danger" ? "danger" : "primary"} onClick={onConfirm} disabled={confirmDisabled}>
                  {confirmText}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
