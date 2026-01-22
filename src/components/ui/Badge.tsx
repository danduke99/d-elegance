import clsx from "clsx";

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "gold" | "dark";
}) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium";
  const styles = {
    default: "border border-zinc-200 bg-white text-zinc-700",
    gold: "bg-[var(--accent)] text-zinc-950",
    dark: "bg-zinc-950 text-white",
  };
  return <span className={clsx(base, styles[tone])}>{children}</span>;
}
