import Link from "next/link";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "gold" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-zinc-300 active:scale-[0.99]";

  const styles: Record<string, string> = {
    primary: "bg-zinc-950 text-white hover:bg-zinc-800",
    gold: "bg-[var(--accent)] text-zinc-950 hover:brightness-95",
    outline: "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",
    ghost: "bg-transparent text-zinc-950 hover:bg-zinc-50",
  };

  const cn = clsx(base, styles[variant], className);

  if (href) return <Link className={cn} href={href}>{children}</Link>;
  return <button type={type} className={cn} onClick={onClick}>{children}</button>;
}
