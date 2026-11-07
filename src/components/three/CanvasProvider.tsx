"use client";

import { Suspense, lazy, useEffect, useState } from "react";

const Scene = lazy(() => import("./HeroScene"));

/**
 * Provides the R3F Canvas wrapper with mobile detection.
 * On mobile or when WebGL is unavailable, renders a CSS-only fallback.
 */
export function CanvasProvider({ className = "" }: { className?: string }) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    let frame = 0;

    /* Check WebGL support and skip on low-end mobile */
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) return undefined;

      /* Skip heavy WebGL on phones to preserve battery, thermals & eliminate scroll lag */
      if (window.innerWidth < 768) return undefined;

      /* Respect reduced motion */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

      frame = window.requestAnimationFrame(() => setCanRender(true));
    } catch {
      /* WebGL not available */
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!canRender) {
    /* CSS-only fallback — schematic bracket, not decorative 3D filler */
    return (
      <div className={`relative overflow-hidden bg-[var(--void)] surface-grid ${className}`} aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <div className="schematic-bracket">
            <span className="schematic-hole schematic-hole-left" />
            <span className="schematic-hole schematic-hole-right" />
            <span className="schematic-rib schematic-rib-left" />
            <span className="schematic-rib schematic-rib-right" />
            <span className="schematic-layer schematic-layer-1" />
            <span className="schematic-layer schematic-layer-2" />
            <span className="schematic-layer schematic-layer-3" />
            <span className="schematic-toolpath" />
            <span className="schematic-scan" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center bg-[var(--void)] surface-grid">
            <div className="h-28 w-64 animate-pulse rounded-lg border border-[var(--edge)] bg-[var(--panel)]/60 surface-brushed" />
          </div>
        }
      >
        <Scene />
      </Suspense>
    </div>
  );
}
