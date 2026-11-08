import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-[var(--arc-blue)] text-white",
    "hover:brightness-90 hover:shadow-[var(--shadow-glow-blue)]",
    "active:scale-[0.97]",
  ].join(" "),
  secondary: [
    "border border-[var(--edge)] bg-[var(--panel)]",
    "text-[var(--ceramic)] surface-brushed",
    "hover:border-[var(--forge-amber)] hover:shadow-[var(--shadow-glow-amber)]",
    "active:scale-[0.97]",
  ].join(" "),
  ghost: [
    "border border-[var(--edge)] bg-transparent",
    "text-[var(--ceramic-muted)]",
    "hover:border-[var(--edge-hover)] hover:text-[var(--ceramic)]",
    "active:scale-[0.97]",
  ].join(" "),
};

/**
 * CNC control panel style button — recessed surface with illuminated text.
 * Supports rendering as a button or a Next.js Link.
 */
export function MetalButton({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  const base = [
    "inline-flex h-11 items-center justify-center gap-2",
    "rounded-md px-5 font-data text-sm font-medium tracking-[0.02em]",
    "transition-all duration-200",
    variantStyles[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={base} {...props}>
      {children}
    </button>
  );
}
