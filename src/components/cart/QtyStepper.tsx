"use client";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
};

export function QtyStepper({ value, min = 1, max = 99, onChange }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  const disabledDec = value <= min;
  const disabledInc = value >= max;

  return (
    <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={dec}
        disabled={disabledDec}
        className={`h-9 w-10 rounded-l-full text-zinc-900 transition active:scale-[0.97] ${
          disabledDec ? "cursor-not-allowed opacity-40" : "hover:bg-zinc-50"
        }`}
        aria-label="Decrease quantity"
      >
        –
      </button>

      <div className="min-w-10 px-3 text-center text-sm font-semibold text-zinc-900 tabular-nums">
        {value}
      </div>

      <button
        type="button"
        onClick={inc}
        disabled={disabledInc}
        className={`h-9 w-10 rounded-r-full text-zinc-900 transition active:scale-[0.97] ${
          disabledInc ? "cursor-not-allowed opacity-40" : "hover:bg-zinc-50"
        }`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
