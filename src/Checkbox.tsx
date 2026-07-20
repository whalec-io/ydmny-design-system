import { cx } from "./utils";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ checked = false, onCheckedChange, label, disabled, className }: CheckboxProps) {
  return (
    <label
      className={cx(
        "inline-flex select-none items-center gap-1.5 text-[length:var(--ydmnypg-font-size-description)] leading-[var(--ydmnypg-line-height-description)] text-[color:var(--ydmnypg-color-text-secondary)]",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <button
        type="button"
        disabled={disabled}
        aria-pressed={checked}
        onClick={event => {
          event.preventDefault();
          if (!disabled) onCheckedChange?.(!checked);
        }}
        className={cx(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--ydmnypg-radius-sm)] border transition-colors",
          checked
            ? "border-[color:var(--ydmnypg-color-primary)] bg-[color:var(--ydmnypg-color-primary)] text-[color:var(--ydmnypg-color-text-inverse)]"
            : "border-[color:var(--ydmnypg-color-border)] bg-[color:var(--ydmnypg-color-surface)] hover:border-[color:var(--ydmnypg-color-border-strong)]",
        )}
      >
        {checked && <span className="h-2 w-1 rotate-45 border-b-2 border-r-2 border-[color:var(--ydmnypg-color-text-inverse)]" />}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
