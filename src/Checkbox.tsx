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
        "inline-flex select-none items-center gap-1.5 text-[13px] text-gray-700",
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
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white hover:border-gray-400",
        )}
      >
        {checked && <span className="h-2 w-1 rotate-45 border-b-2 border-r-2 border-white" />}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
