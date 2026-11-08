/**
 * Machine-readout style section label — monospace, uppercase, tracked.
 * Mimics the engraved labels on CNC control panels.
 */
export function SectionLabel({
  children,
  color = "blue",
  className = "",
}: {
  children: React.ReactNode;
  color?: "blue" | "amber" | "green" | "muted";
  className?: string;
}) {
  const colorClass: Record<typeof color, string> = {
    blue: "text-[var(--arc-blue)]",
    amber: "text-[var(--forge-amber)]",
    green: "text-[var(--laser-green)]",
    muted: "text-[var(--ceramic-muted)]",
  };

  return (
    <p
      className={`font-data text-xs font-semibold tracking-wider ${colorClass[color]} ${className}`.trim()}
    >
      {children}
    </p>
  );
}
