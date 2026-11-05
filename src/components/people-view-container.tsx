"use client";

import { useState } from "react";
import { PeopleShelf } from "@/components/people-shelf";
import { PeopleDirectory } from "@/components/people-directory";
import { PageFrame } from "@/components/site-shell";
import { Layers, Box } from "lucide-react";

export function PeopleViewContainer() {
  const [viewMode, setViewMode] = useState<"shelf" | "grid">("shelf");

  return (
    <div className="relative min-h-screen">
      {/* Floating View Mode Switcher */}
      <div className="fixed bottom-5 right-6 z-50 flex items-center bg-[#141414] border border-[rgba(255,255,255,0.2)] rounded-full p-1 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setViewMode("shelf")}
          className={[
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none",
            viewMode === "shelf"
              ? "bg-[#143B82] text-white shadow-sm"
              : "text-[#B8C4D0] hover:text-white",
          ].join(" ")}
        >
          <Box size={13} aria-hidden />
          <span>3D Shelf</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode("grid")}
          className={[
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none",
            viewMode === "grid"
              ? "bg-[#143B82] text-white shadow-sm"
              : "text-[#B8C4D0] hover:text-white",
          ].join(" ")}
        >
          <Layers size={13} aria-hidden />
          <span>Directory Grid</span>
        </button>
      </div>

      {/* View Rendering: Default is 3D Shelf with SiteHeader included */}
      {viewMode === "shelf" ? (
        <PeopleShelf />
      ) : (
        <PageFrame>
          <main className="pt-6">
            <PeopleDirectory />
          </main>
        </PageFrame>
      )}
    </div>
  );
}
