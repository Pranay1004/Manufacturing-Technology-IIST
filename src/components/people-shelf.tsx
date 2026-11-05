"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Mail, X, Layers, FileText, Check } from "lucide-react";
import { people, type Person } from "@/lib/data";
import { IndicTranslate } from "@/components/IndicTranslate";
import { SiteHeader } from "@/components/site-shell";

// ─── Color & Palette Definitions (Inspired by Vintage Cinematic Book Spines) ──
export type ColorTheme =
  | "terracotta"
  | "charcoal"
  | "forest"
  | "cobalt"
  | "slate"
  | "amber"
  | "crimson"
  | "copper"
  | "midnight"
  | "plum";

interface ThemeStyle {
  bg: string;
  gradient: string;
  border: string;
  text: string;
  badge: string;
  accent: string;
  coverBg: string;
  illustrationColor: string;
}

const themeStyles: Record<ColorTheme, ThemeStyle> = {
  terracotta: {
    bg: "#9B3322",
    gradient: "linear-gradient(180deg, #B83E28 0%, #9B3322 50%, #7A2417 100%)",
    border: "#D14D35",
    text: "#FBF7F2",
    badge: "rgba(255,255,255,0.18)",
    accent: "#FFA07A",
    coverBg: "#FAF4EF",
    illustrationColor: "#9B3322",
  },
  charcoal: {
    bg: "#1E2226",
    gradient: "linear-gradient(180deg, #2D343B 0%, #1E2226 50%, #14171A 100%)",
    border: "#444E57",
    text: "#F5F6F8",
    badge: "rgba(255,255,255,0.15)",
    accent: "#E28743",
    coverBg: "#F2F4F7",
    illustrationColor: "#1E2226",
  },
  forest: {
    bg: "#174D38",
    gradient: "linear-gradient(180deg, #226C4E 0%, #174D38 50%, #0E3526 100%)",
    border: "#2F8F68",
    text: "#F3FAF6",
    badge: "rgba(255,255,255,0.18)",
    accent: "#66E0A3",
    coverBg: "#F0F7F3",
    illustrationColor: "#174D38",
  },
  cobalt: {
    bg: "#143B82",
    gradient: "linear-gradient(180deg, #1E52B7 0%, #143B82 50%, #0C2758 100%)",
    border: "#356CD4",
    text: "#F4F7FD",
    badge: "rgba(255,255,255,0.18)",
    accent: "#76A9FA",
    coverBg: "#F0F4FA",
    illustrationColor: "#143B82",
  },
  slate: {
    bg: "#2A4B67",
    gradient: "linear-gradient(180deg, #396387 0%, #2A4B67 50%, #1B3347 100%)",
    border: "#4F82AE",
    text: "#F4F7FA",
    badge: "rgba(255,255,255,0.18)",
    accent: "#93C5FD",
    coverBg: "#F1F5F9",
    illustrationColor: "#2A4B67",
  },
  amber: {
    bg: "#A25B1D",
    gradient: "linear-gradient(180deg, #C77328 0%, #A25B1D 50%, #7D4311 100%)",
    border: "#DF893A",
    text: "#FEFAF5",
    badge: "rgba(255,255,255,0.18)",
    accent: "#FCD34D",
    coverBg: "#FBF6EE",
    illustrationColor: "#A25B1D",
  },
  crimson: {
    bg: "#7A1B29",
    gradient: "linear-gradient(180deg, #9F2437 0%, #7A1B29 50%, #57101B 100%)",
    border: "#BD3449",
    text: "#FDF5F6",
    badge: "rgba(255,255,255,0.18)",
    accent: "#FCA5A5",
    coverBg: "#FAF0F2",
    illustrationColor: "#7A1B29",
  },
  copper: {
    bg: "#8C3C20",
    gradient: "linear-gradient(180deg, #B34E2A 0%, #8C3C20 50%, #682912 100%)",
    border: "#CC633B",
    text: "#FDF7F5",
    badge: "rgba(255,255,255,0.18)",
    accent: "#FDBA74",
    coverBg: "#FAF3EF",
    illustrationColor: "#8C3C20",
  },
  midnight: {
    bg: "#152238",
    gradient: "linear-gradient(180deg, #203456 0%, #152238 50%, #0D1625 100%)",
    border: "#304D7D",
    text: "#F4F6FB",
    badge: "rgba(255,255,255,0.18)",
    accent: "#A5B4FC",
    coverBg: "#F0F3F9",
    illustrationColor: "#152238",
  },
  plum: {
    bg: "#5A2338",
    gradient: "linear-gradient(180deg, #742E49 0%, #5A2338 50%, #3F1524 100%)",
    border: "#8F3D5D",
    text: "#FAF4F7",
    badge: "rgba(255,255,255,0.18)",
    accent: "#F472B6",
    coverBg: "#FAF2F5",
    illustrationColor: "#5A2338",
  },
};

export interface BookItem {
  id: string;
  slug: string;
  name: string;
  cohort: string;
  roll: string;
  specialization: string;
  role: string;
  synopsis: string;
  skills: string[];
  projects: string[];
  resumeUrl?: string;
  officialEmail: string;
  placedAt?: string;
  placedRole?: string;
  theme: ColorTheme;
  diagram: "additive" | "turbine" | "composite" | "cnc" | "metrology" | "lattice" | "welding" | "forging";
  symbol: "laser" | "arc" | "spindle" | "blade" | "weave" | "probe" | "tile" | "lattice";
}

// ─── Mathematical SmoothStep Formulas (From Prompt) ─────────────────────────
function smoothStep(x: number): number {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

function smoothStepB(r: number): number {
  if (Math.abs(r) < 1) {
    return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
  }
  return r >= 1 ? 0.5 : -0.5;
}

// ─── Spine Top Vignettes (Circle Emblems matching Screenshot 2) ─────────────
function SpineVignette({ symbol, color }: { symbol: BookItem["symbol"]; color: string }) {
  if (symbol === "laser") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="16" cy="16" r="7" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
        <line x1="16" y1="2" x2="16" y2="30" strokeWidth="0.8" opacity="0.6" />
        <line x1="2" y1="16" x2="30" y2="16" strokeWidth="0.8" opacity="0.6" />
      </svg>
    );
  }

  if (symbol === "arc") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <path d="M16 6 L19 13 L26 14 L20 19 L22 26 L16 22 L10 26 L12 19 L6 14 L13 13 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "blade") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <path d="M10 22 C11 14, 16 9, 22 7 C24 11, 23 18, 19 23 C15 25, 12 24, 10 22 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "weave") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <rect x="9" y="9" width="14" height="14" strokeWidth="1" />
        <line x1="9" y1="16" x2="23" y2="16" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="16" y1="9" x2="16" y2="23" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "spindle") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "probe") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <line x1="16" y1="5" x2="16" y2="21" strokeWidth="1.5" />
        <circle cx="16" cy="22" r="3.5" fill="currentColor" />
        <line x1="9" y1="26" x2="23" y2="26" strokeWidth="1.2" />
      </svg>
    );
  }

  if (symbol === "tile") {
    return (
      <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <polygon points="16,7 24,11 24,21 16,25 8,21 8,11" strokeWidth="1.2" fill="currentColor" fillOpacity="0.25" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  // Default lattice
  return (
    <svg viewBox="0 0 32 32" className="size-6 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
      <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="8" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points="16,10 21,19 11,19" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

// ─── Technical Screenprint Vector Illustrations for Book Cover & Detail ──────
function TechnicalScreenprint({
  diagram,
  color,
  className = "",
}: {
  diagram: BookItem["diagram"];
  color: string;
  className?: string;
}) {
  if (diagram === "additive") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
          <rect x="25" y="25" width="230" height="290" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
          {/* Laser Chamber Head */}
          <rect x="90" y="30" width="100" height="30" fill={color} fillOpacity="0.15" strokeWidth="1.5" />
          <polygon points="125,60 155,60 140,85" fill={color} />
          {/* Radiant Focused Laser Beam */}
          <line x1="140" y1="85" x2="140" y2="190" stroke={color} strokeWidth="2.5" />
          <circle cx="140" cy="190" r="18" strokeDasharray="2 2" strokeWidth="0.8" />
          <circle cx="140" cy="190" r="5" fill={color} />
          {/* Powder Deposition Sintering Layers */}
          <path d="M 40 190 Q 90 160 140 190 T 240 190 L 240 220 Q 190 250 140 220 T 40 220 Z" fill={color} fillOpacity="0.2" />
          <polyline points="45,190 75,150 105,190 135,150 165,190 195,150 225,190" strokeWidth="1.8" />
          <line x1="40" y1="230" x2="240" y2="230" strokeWidth="1" />
          <line x1="40" y1="250" x2="240" y2="250" strokeWidth="1" strokeDasharray="5 3" />
          <line x1="40" y1="270" x2="240" y2="270" strokeWidth="1.5" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>L-PBF LASER MELTING</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">LAYER-BY-LAYER DEPOSITION</text>
        </g>
      </svg>
    );
  }

  if (diagram === "turbine") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
          <ellipse cx="140" cy="170" rx="95" ry="135" strokeDasharray="4 4" opacity="0.25" />
          {/* Cambered Airfoil Section */}
          <path
            d="M 60 230 C 70 140, 120 75, 210 55 C 235 95, 230 185, 185 245 C 135 270, 80 260, 60 230 Z"
            fill={color}
            fillOpacity="0.18"
            strokeWidth="2"
          />
          {/* Internal Convective Cooling Conduits */}
          <circle cx="110" cy="180" r="16" strokeWidth="1.5" />
          <circle cx="150" cy="150" r="20" strokeWidth="1.5" />
          <circle cx="185" cy="115" r="12" strokeWidth="1.5" />
          <line x1="60" y1="230" x2="210" y2="55" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.5" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>AERODYNAMIC AIRFOIL</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">Ti-6Al-4V TURBINE GEOMETRY</text>
        </g>
      </svg>
    );
  }

  if (diagram === "composite") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
          <rect x="35" y="60" width="210" height="42" fill={color} fillOpacity="0.15" strokeWidth="1.2" />
          <line x1="35" y1="81" x2="245" y2="81" strokeDasharray="3 3" />
          <rect x="35" y="115" width="210" height="42" fill={color} fillOpacity="0.25" strokeWidth="1.2" />
          <path d="M 45 115 L 85 157 M 95 115 L 135 157 M 145 115 L 185 157 M 195 115 L 235 157" strokeWidth="1.5" />
          <rect x="35" y="170" width="210" height="42" fill={color} fillOpacity="0.15" strokeWidth="1.2" />
          <rect x="35" y="225" width="210" height="42" fill={color} fillOpacity="0.35" strokeWidth="1.2" />
          <path d="M 85 225 L 45 267 M 135 225 L 95 267 M 185 225 L 145 267 M 235 225 L 195 267" strokeWidth="1.5" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>LAMINATE COMPOSITE</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">ORTHOTROPIC PLY STACK [0/45/90]s</text>
        </g>
      </svg>
    );
  }

  if (diagram === "cnc") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
          <circle cx="140" cy="170" r="95" strokeDasharray="4 4" opacity="0.25" />
          {/* Spindle Body and Flutes */}
          <rect x="110" y="40" width="60" height="80" fill={color} fillOpacity="0.2" strokeWidth="1.5" />
          <polygon points="120,120 160,120 150,180 130,180" fill={color} fillOpacity="0.4" strokeWidth="1.5" />
          <path d="M 125 130 L 155 150 M 125 150 L 155 170" strokeWidth="1.8" />
          {/* Workpiece & Shear Angle Plane */}
          <rect x="40" y="180" width="200" height="80" strokeWidth="1.5" fill={color} fillOpacity="0.1" />
          <line x1="40" y1="180" x2="130" y2="180" strokeWidth="2.5" />
          <path d="M 150 180 Q 180 160 210 180" strokeWidth="1.8" strokeDasharray="3 3" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>5-AXIS CNC MACHINING</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">CUTTER TOOLPATH KINEMATICS</text>
        </g>
      </svg>
    );
  }

  if (diagram === "welding") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
          {/* TIG Electrode Torch */}
          <polygon points="135,30 145,30 142,120 138,120" fill={color} strokeWidth="1.5" />
          {/* Glowing Arc Cone */}
          <polygon points="138,120 142,120 170,180 110,180" fill={color} fillOpacity="0.25" strokeWidth="1.2" />
          <circle cx="140" cy="180" r="12" fill={color} />
          {/* Heat Affected Zone (HAZ) */}
          <ellipse cx="140" cy="185" rx="55" ry="25" strokeDasharray="3 3" strokeWidth="1.2" />
          <ellipse cx="140" cy="185" rx="85" ry="40" strokeDasharray="4 4" strokeWidth="0.8" opacity="0.4" />
          {/* Metal Joint Plates */}
          <rect x="30" y="180" width="90" height="70" fill={color} fillOpacity="0.1" strokeWidth="1.5" />
          <rect x="160" y="180" width="90" height="70" fill={color} fillOpacity="0.1" strokeWidth="1.5" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>TIG / PLASMA ARC WELDING</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">HEAT-AFFECTED ZONE METALLURGY</text>
        </g>
      </svg>
    );
  }

  // Default Metrology Probe & Coordinate Frame
  return (
    <svg viewBox="0 0 280 340" className={className} aria-hidden>
      <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
        <circle cx="140" cy="170" r="95" strokeDasharray="4 4" opacity="0.25" />
        <polygon points="140,75 220,125 220,215 140,265 60,215 60,125" strokeWidth="2" fill={color} fillOpacity="0.12" />
        <line x1="140" y1="75" x2="140" y2="265" strokeDasharray="3 3" opacity="0.5" />
        <line x1="60" y1="125" x2="220" y2="215" strokeDasharray="3 3" opacity="0.5" />
        <line x1="60" y1="215" x2="220" y2="125" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="140" cy="170" r="28" strokeWidth="1.5" fill={color} fillOpacity="0.15" />
        <circle cx="140" cy="170" r="5" fill={color} />
        <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>METROLOGY & CMM DATUM</text>
        <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">OPTICAL INSPECTION CO-ORDINATES</text>
      </g>
    </svg>
  );
}

// ─── Cohort Segmentation Datasets ───────────────────────────────────────────
type CohortId = "2025-2027" | "2024-2026" | "2026-2028" | "phd" | "faculty";

interface CohortTabConfig {
  id: CohortId;
  label: string;
  yearRange: string;
  count: number;
}

const cohortTabs: CohortTabConfig[] = [
  { id: "2025-2027", label: "2025–2027 (Current)", yearRange: "2025–2027", count: 8 },
  { id: "2024-2026", label: "2024–2026 (Outgoing)", yearRange: "2024–2026", count: 7 },
  { id: "2026-2028", label: "2026–2028 (Incoming)", yearRange: "2026–2028", count: 12 },
  { id: "phd", label: "PhD Scholars", yearRange: "2021–2025", count: 10 },
  { id: "faculty", label: "Faculty & Staff", yearRange: "Anchors", count: 4 },
];

function getCohortBooks(cohortId: CohortId): BookItem[] {
  const themes: ColorTheme[] = [
    "terracotta", "cobalt", "forest", "charcoal", "amber",
    "slate", "crimson", "copper", "midnight", "plum"
  ];

  const diagrams: BookItem["diagram"][] = [
    "additive", "turbine", "composite", "cnc", "metrology", "welding", "lattice", "forging"
  ];

  const symbols: BookItem["symbol"][] = [
    "laser", "blade", "weave", "spindle", "probe", "arc", "lattice", "tile"
  ];

  let filtered = people.filter((p) => {
    if (cohortId === "2025-2027") return p.cohort === "2025-2027";
    if (cohortId === "2024-2026") return p.cohort === "2024-2026";
    if (cohortId === "2026-2028") return p.cohort === "2026-2028";
    if (cohortId === "phd") return p.type === "phd";
    if (cohortId === "faculty") return p.type === "faculty" || p.type === "staff";
    return true;
  });

  if (filtered.length === 0) filtered = people.slice(0, 8);

  return filtered.map((p, idx) => {
    // Extract roll number from role string or default
    const rollMatch = p.role.match(/SC\w+/);
    const roll = rollMatch ? rollMatch[0] : p.admissionYear ? `PHD-${p.admissionYear}` : `MT-${String(idx + 1).padStart(2, "0")}`;

    return {
      id: p.slug,
      slug: p.slug,
      name: p.name,
      cohort: p.cohort ?? (p.type === "faculty" ? "Faculty Anchor" : p.admissionYear ? `PhD ${p.admissionYear}` : "2025-2027"),
      roll,
      specialization: p.specialization,
      role: p.role,
      synopsis: p.synopsis,
      skills: p.skills,
      projects: p.projects.map((proj) => proj.title),
      resumeUrl: p.resumeUrl,
      officialEmail: p.officialEmail,
      placedAt: p.placedAt,
      placedRole: p.placedRole,
      theme: themes[idx % themes.length],
      diagram: diagrams[idx % diagrams.length],
      symbol: symbols[idx % symbols.length],
    };
  });
}

export function PeopleShelf() {
  const [selectedCohort, setSelectedCohort] = useState<CohortId>("2025-2027");

  // Segregated books for the selected cohort
  const cohortBooks = useMemo(() => getCohortBooks(selectedCohort), [selectedCohort]);
  const M = cohortBooks.length;
  const totalBooks = M * 3; // 3 repeats for smooth infinite loop

  // Physics & Animation State Refs
  const sRef = useRef(M); // Center repeat
  const targetRef = useRef(M);
  const hoverRef = useRef(-1);
  const activeIdxRef = useRef(0);

  const pointerPosRef = useRef({ x: 0, y: 0 });
  const cursorSmoothRef = useRef({ x: 0, y: 0 });
  const tiltRef = useRef({ x: 0, y: 0 });
  const onCoverRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, target: M });
  const lastWheelTimeRef = useRef(0);
  const wheelSnapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // UI state for reactive elements
  const [activeBook, setActiveBook] = useState<BookItem>(cohortBooks[0] || {} as BookItem);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "spine" | "btn" | "open">("default");
  const [playRingScale, setPlayRingScale] = useState(1);

  // DOM Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const bookElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const playRingRef = useRef<HTMLButtonElement>(null);
  const tabIndicatorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const detailDialogRef = useRef<HTMLDivElement>(null);
  const activeCoverFaceRef = useRef<HTMLDivElement | null>(null);

  // Masked caption elements
  const captionTitleRef = useRef<HTMLDivElement>(null);
  const captionSubRef = useRef<HTMLDivElement>(null);
  const captionYearRef = useRef<HTMLDivElement>(null);

  // Ink mask blob circles refs
  const inkBlobsRef = useRef<(SVGCircleElement | null)[]>([]);

  // Reset physics when switching cohort
  useEffect(() => {
    sRef.current = M;
    targetRef.current = M;
    activeIdxRef.current = 0;
    setActiveBook(cohortBooks[0] || ({} as BookItem));

    // Position tab indicator
    if (tabsContainerRef.current && tabIndicatorRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector(`button[data-cohort="${selectedCohort}"]`) as HTMLElement | null;
      if (activeBtn) {
        tabIndicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
        tabIndicatorRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      }
    }
  }, [selectedCohort, M, cohortBooks]);

  // ─── Swap Caption with Mask Slide ─────────────────────────────────────────
  const swapCaption = useCallback((newBook: BookItem, dir: number) => {
    const slideMask = (container: HTMLDivElement | null, newText: string) => {
      if (!container) return;
      const oldSpan = container.querySelector("span:not([data-leaving])");
      const newSpan = document.createElement("span");
      newSpan.textContent = newText;
      newSpan.className = "inline-block will-change-transform";

      if (oldSpan) {
        oldSpan.setAttribute("data-leaving", "true");
        oldSpan.animate(
          [
            { transform: "translateY(0)" },
            { transform: `translateY(${-dir * 105}%)` },
          ],
          { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
        ).onfinish = () => oldSpan.remove();
      }

      container.appendChild(newSpan);
      newSpan.animate(
        [
          { transform: `translateY(${dir * 105}%)` },
          { transform: "translateY(0)" },
        ],
        { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
      );
    };

    slideMask(captionTitleRef.current, newBook.name);
    slideMask(captionSubRef.current, `${newBook.roll} · ${newBook.specialization.toUpperCase()}`);
    slideMask(captionYearRef.current, `${newBook.cohort} · IIST AEROSPACE MANUFACTURING`);
  }, []);

  // ─── Open Detail Paper Sheet with SVG Ink Bleed Sequence ──────────────────
  const openDetail = useCallback(() => {
    const dialog = detailDialogRef.current;
    if (!dialog || !activeCoverFaceRef.current) return;

    setDetailOpen(true);
    targetRef.current = Math.round(targetRef.current);

    // 1. Measure Projected 3D Cover Rect
    const coverRect = activeCoverFaceRef.current.getBoundingClientRect();
    const top = coverRect.top;
    const left = coverRect.left;
    const right = window.innerWidth - coverRect.right;
    const bottom = window.innerHeight - coverRect.bottom;

    dialog.style.visibility = "visible";
    dialog.style.transformOrigin = `${coverRect.left + coverRect.width / 2}px ${coverRect.top + coverRect.height / 2}px`;

    // 2. Animate Sheet Growth out of Cover via Web Animations API (1050ms)
    dialog.animate(
      [
        {
          clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round 3px)`,
          transform: "rotate(-4.5deg)",
        },
        {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          transform: "rotate(0deg)",
        },
      ],
      {
        duration: 1050,
        easing: "cubic-bezier(.76,0,.18,1)",
        fill: "both",
      }
    );

    // 3. Text lines rise from overflow masks (staggered 620ms + idx * 75ms)
    const textLines = dialog.querySelectorAll(".detail-mask-line > *");
    textLines.forEach((line, idx) => {
      line.animate(
        [
          { transform: "translateY(110%)" },
          { transform: "translateY(0)" },
        ],
        {
          duration: 900,
          delay: 620 + idx * 75,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "both",
        }
      );
    });

    // 4. SVG Ragged Ink Blots Bleed In (1250ms rAF loop starting at 520ms)
    const blobDelays = [0, 120, 220, 300, 360, 420, 180];
    const startTime = performance.now() + 520;

    const animateInk = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animateInk);
        return;
      }

      let allDone = true;
      inkBlobsRef.current.forEach((circle, i) => {
        if (!circle) return;
        const blobElapsed = elapsed - blobDelays[i];
        if (blobElapsed <= 0) {
          circle.setAttribute("r", "0");
          allDone = false;
        } else {
          const p = Math.min(1, blobElapsed / 1250);
          const easeOut = 1 - Math.pow(1 - p, 3);
          circle.setAttribute("r", String(easeOut * 720));
          if (p < 1) allDone = false;
        }
      });

      if (!allDone && elapsed < 2400) {
        requestAnimationFrame(animateInk);
      }
    };
    requestAnimationFrame(animateInk);
  }, []);

  // ─── Close Detail Sheet ───────────────────────────────────────────────────
  const closeDetail = useCallback(() => {
    const dialog = detailDialogRef.current;
    if (!dialog || !activeCoverFaceRef.current) {
      setDetailOpen(false);
      return;
    }

    const coverRect = activeCoverFaceRef.current.getBoundingClientRect();
    const top = coverRect.top;
    const left = coverRect.left;
    const right = window.innerWidth - coverRect.right;
    const bottom = window.innerHeight - coverRect.bottom;

    const anim = dialog.animate(
      [
        {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          transform: "rotate(0deg)",
        },
        {
          clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round 3px)`,
          transform: "rotate(-4.5deg)",
        },
      ],
      {
        duration: 850,
        easing: "cubic-bezier(.76,0,.18,1)",
        fill: "both",
      }
    );

    anim.onfinish = () => {
      dialog.style.visibility = "hidden";
      setDetailOpen(false);
    };
  }, []);

  // ─── Main requestAnimationFrame Spring Loop ───────────────────────────────
  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // 1. Spring Physics for Scroll Position
      const k = isDraggingRef.current ? 18 : 5.2;
      const prevS = sRef.current;
      sRef.current += (targetRef.current - sRef.current) * (1 - Math.exp(-k * dt));

      if (Math.abs(targetRef.current - sRef.current) < 1e-4) {
        sRef.current = targetRef.current;
      }

      // 2. Normalise drift beyond +-3 full loops
      if (sRef.current > M * 2.5) {
        sRef.current -= M;
        targetRef.current -= M;
      } else if (sRef.current < M * 0.5) {
        sRef.current += M;
        targetRef.current += M;
      }

      // 3. Caption Swap Trigger on integer crossover
      const currentActive = Math.round(sRef.current);
      const modActive = ((currentActive % M) + M) % M;
      if (modActive !== activeIdxRef.current && cohortBooks[modActive]) {
        const dir = targetRef.current >= prevS ? 1 : -1;
        activeIdxRef.current = modActive;
        const newBook = cohortBooks[modActive];
        setActiveBook(newBook);
        swapCaption(newBook, dir);
      }

      // 4. Cursor Smoothing
      cursorSmoothRef.current.x += (pointerPosRef.current.x - cursorSmoothRef.current.x) * (1 - Math.exp(-16 * dt));
      cursorSmoothRef.current.y += (pointerPosRef.current.y - cursorSmoothRef.current.y) * (1 - Math.exp(-16 * dt));

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${cursorSmoothRef.current.x}px, ${cursorSmoothRef.current.y}px, 0)`;
      }

      // 5. Measure Responsive Dimensions
      const stageContainer = stageRef.current?.parentElement;
      const W = stageContainer ? stageContainer.clientWidth : window.innerWidth;
      const H = Math.min(W >= 768 ? window.innerHeight * 0.46 : window.innerWidth * 0.60, W >= 768 ? W * 0.31 : window.innerHeight * 0.40);
      const ws = H * (142 / 840);
      const d = H * (474 / 900);
      const gap = H * 0.03;

      if (stageRef.current) {
        stageRef.current.style.setProperty("--ws", `${ws}px`);
        stageRef.current.style.setProperty("--d", `${d}px`);
        stageRef.current.style.setProperty("--H", `${H}px`);
      }

      // 6. Tilt toward pointer when over active cover
      const cx = (stageContainer?.getBoundingClientRect().left ?? 0) + W / 2;
      const cy = window.innerHeight / 2;
      const dxFromCenter = pointerPosRef.current.x - cx;
      const dyFromCenter = pointerPosRef.current.y - cy;
      const shelfAlmostSettled = Math.abs(targetRef.current - sRef.current) < 0.3;

      const overCover =
        Math.abs(dxFromCenter) < 0.55 * d &&
        Math.abs(dyFromCenter) < 0.55 * H &&
        !detailOpen &&
        shelfAlmostSettled;

      onCoverRef.current = overCover;

      if (overCover) {
        tiltRef.current.y += ((dxFromCenter / (0.55 * d)) * 9 - tiltRef.current.y) * (1 - Math.exp(-7 * dt));
        tiltRef.current.x += ((-dyFromCenter / (H / 2)) * 6 - tiltRef.current.x) * (1 - Math.exp(-7 * dt));
        setCursorState("open");
      } else {
        tiltRef.current.y += ((dxFromCenter / (W || 1)) * 5 - tiltRef.current.y) * (1 - Math.exp(-7 * dt));
        tiltRef.current.x += (0 - tiltRef.current.x) * (1 - Math.exp(-7 * dt));
        if (hoverRef.current >= 0) {
          setCursorState("spine");
        } else {
          setCursorState("default");
        }
      }

      // 7. Update Play Ring Position & Scale
      const ringScale = smoothStep(Math.max(0, 1 - Math.abs(targetRef.current - sRef.current) * 3));
      setPlayRingScale(detailOpen ? 0 : ringScale);
      if (playRingRef.current) {
        playRingRef.current.style.left = `${(stageContainer?.getBoundingClientRect().left ?? 0) + W / 2 - 0.5 * d - 6}px`;
        playRingRef.current.style.top = `${cy + 0.36 * H}px`;
      }

      // 8. Transform Each of the Books in 3D Stage
      for (let v = 0; v < totalBooks; v++) {
        const el = bookElsRef.current[v];
        if (!el) continue;

        // Relative index r in range [-totalBooks/2, +totalBooks/2]
        let r = ((v - sRef.current) % totalBooks);
        if (r > totalBooks / 2) r -= totalBooks;
        if (r < -totalBooks / 2) r += totalBooks;

        // Formula: x = r*(ws + gap) + (d - ws + 1.6*gap)*B(r)
        const x = r * (ws + gap) + (d - ws + 1.6 * gap) * smoothStepB(r);

        // Cull tapes beyond visible horizontal bounds
        if (Math.abs(x) > W / 2 + 1.5 * d) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";

        // Openness o: 1 for active tape, 0 for spines
        const o = smoothStep(Math.max(0, 1 - Math.abs(r)));
        const rotY = -90 * o + tiltRef.current.y * o;
        const rotX = tiltRef.current.x * o;
        const rotZ = -4.5 * o;
        const transZ = o * 0.2 * H;

        // Hover lift on non-active spine
        const isHovered = hoverRef.current === v && Math.abs(r) > 0.5;
        const currentLift = Number(el.getAttribute("data-lift") || "0");
        const targetLift = isHovered ? 1 : 0;
        const nextLift = currentLift + (targetLift - currentLift) * (1 - Math.exp(-12 * dt));
        el.setAttribute("data-lift", String(nextLift));

        const transY = -o * 0.025 * H - nextLift * 0.045 * H;

        el.style.transform = `translate3d(${x}px, ${transY}px, ${transZ}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        el.style.zIndex = String(Math.round(100 - Math.abs(r) * 4));

        // Shading: spine darkens to 55%, cover brightens from 50% to lit
        el.style.setProperty("--shade-spine", String(o * 0.55));
        el.style.setProperty("--shade-cover", String((1 - o) * 0.5));

        // Track active cover DOM ref for sheet expansion
        if (o > 0.95) {
          activeCoverFaceRef.current = el.querySelector(".cv");
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [M, cohortBooks, totalBooks, detailOpen, swapCaption]);

  // ─── Input Handlers: Pointer Move, Drag, Wheel, Keyboard ──────────────────
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (detailOpen) {
        if (e.key === "Escape") closeDetail();
        return;
      }
      if (e.key === "ArrowLeft") {
        targetRef.current = Math.round(targetRef.current) - 1;
      } else if (e.key === "ArrowRight") {
        targetRef.current = Math.round(targetRef.current) + 1;
      } else if (e.key === "Enter") {
        openDetail();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [detailOpen, openDetail, closeDetail]);

  const handleShelfPointerDown = (e: React.PointerEvent) => {
    if (detailOpen) return;
    isDraggingRef.current = false;
    dragStartRef.current = { x: e.clientX, target: targetRef.current };

    const handlePointerMoveDrag = (ev: PointerEvent) => {
      const dx = ev.clientX - dragStartRef.current.x;
      if (Math.abs(dx) > 5) {
        isDraggingRef.current = true;
        const H = Math.min(window.innerHeight * 0.46, window.innerWidth * 0.31);
        const ws = H * (142 / 840);
        const gap = H * 0.03;
        targetRef.current = dragStartRef.current.target - dx / (ws + gap);
      }
    };

    const handlePointerUpDrag = () => {
      if (isDraggingRef.current) {
        targetRef.current = Math.round(targetRef.current);
      }
      window.removeEventListener("pointermove", handlePointerMoveDrag);
      window.removeEventListener("pointerup", handlePointerUpDrag);
    };

    window.addEventListener("pointermove", handlePointerMoveDrag);
    window.addEventListener("pointerup", handlePointerUpDrag);
  };

  const handleShelfWheel = (e: React.WheelEvent) => {
    if (detailOpen) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const H = Math.min(window.innerHeight * 0.46, window.innerWidth * 0.31);
    const ws = H * (142 / 840);
    const gap = H * 0.03;

    targetRef.current += (delta / (ws + gap)) * 0.5;
    lastWheelTimeRef.current = Date.now();

    if (wheelSnapTimerRef.current) clearTimeout(wheelSnapTimerRef.current);
    wheelSnapTimerRef.current = setTimeout(() => {
      targetRef.current = Math.round(targetRef.current);
    }, 160);
  };

  const handleTapeClick = (virtualIdx: number) => {
    if (isDraggingRef.current) return;
    let r = ((virtualIdx - sRef.current) % totalBooks);
    if (r > totalBooks / 2) r -= totalBooks;
    if (r < -totalBooks / 2) r += totalBooks;

    if (Math.abs(r) < 0.5) {
      openDetail();
    } else {
      targetRef.current = Math.round(targetRef.current + r);
    }
  };

  const activeTheme = themeStyles[activeBook.theme || "cobalt"];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#EDEBE6] text-[#141414] font-['Inter_Tight',sans-serif]">
      {/* ─── Left Bar: Maintained exactly as in Screenshot 3 ──────────────── */}
      <SiteHeader />

      {/* ─── Main Right Canvas for 3D Shelf ──────────────────────────────── */}
      <div className="relative flex-1 min-w-0 h-screen overflow-hidden select-none flex flex-col justify-between">
        {/* Paper Grain Overlay */}
        <div
          className="fixed inset-0 z-10 pointer-events-none mix-blend-multiply opacity-55"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ─── 1. Top Bar (100% Native English + Indic Translate Button) ────── */}
        <header className="relative z-30 h-[76px] px-6 sm:px-8 grid grid-cols-[1fr_auto_1fr] items-center border-b border-[rgba(20,20,20,0.1)] bg-[#EDEBE6]/90 backdrop-blur-xs">
          {/* Left Title Area */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 h-[26px] px-2.5 border border-[rgba(20,20,20,0.85)] text-[10px] font-semibold tracking-wider uppercase text-[#141414] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors"
            >
              <ArrowLeft size={12} aria-hidden />
              <span>Back</span>
            </Link>
          </div>

          {/* Center Logo Band */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-['Newsreader',serif] font-bold text-xl sm:text-2xl tracking-tight text-[#143B82]">
              IIST Manufacturing Technology
            </span>
            <span className="text-[8.5px] font-semibold tracking-[0.24em] uppercase text-[#6D6A63]">
              Department of Aerospace Engineering · Scholar Archive
            </span>
          </div>

          {/* Right Action: Indic Translate + Directory Toggle */}
          <div className="flex items-center justify-end gap-3">
            <IndicTranslate />
          </div>
        </header>

        {/* ─── 2. Cohort Segregation Tabs (Never Combined, Strictly By Year) ─── */}
        <nav
          aria-label="Cohort Batches"
          className="relative z-30 flex items-center justify-center pt-3 pb-1"
        >
          <div
            ref={tabsContainerRef}
            className="relative inline-flex items-center bg-[#EDEBE6] border border-[rgba(20,20,20,0.85)] rounded-sm overflow-hidden shadow-xs"
          >
            {/* Sliding Active Cobalt Highlight Block */}
            <div
              ref={tabIndicatorRef}
              className="absolute top-0 bottom-0 bg-[#143B82] transition-all duration-400 ease-[cubic-bezier(.2,.8,.2,1)] z-0 pointer-events-none"
              style={{ width: "120px", transform: "translateX(0px)" }}
            />

            {cohortTabs.map((tab) => {
              const isActive = selectedCohort === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-cohort={tab.id}
                  onClick={() => setSelectedCohort(tab.id)}
                  className={[
                    "relative z-10 h-[28px] px-3 border-r last:border-r-0 border-[rgba(20,20,20,0.3)] text-[10.5px] font-semibold tracking-wider uppercase transition-colors duration-300 select-none whitespace-nowrap cursor-pointer",
                    isActive ? "text-white font-bold" : "text-[#141414] hover:bg-[#141414]/8",
                  ].join(" ")}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ─── 3. The 3D Shelf Stage (Richly Colored Books) ─────────────────── */}
        <section
          aria-label="Archival book shelf"
          onPointerDown={handleShelfPointerDown}
          onWheel={handleShelfWheel}
          className="relative flex-1 w-full z-20 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible select-none"
          style={{
            perspective: "2200px",
            perspectiveOrigin: "50% 50%",
            touchAction: "pan-y",
          }}
        >
          {/* Zero-size Stage Origin */}
          <div
            ref={stageRef}
            className="relative size-0"
            style={{
              transformStyle: "preserve-3d",
              ["--ws" as string]: "84px",
              ["--d" as string]: "245px",
              ["--H" as string]: "470px",
            }}
          >
            {Array.from({ length: totalBooks }).map((_, v) => {
              const book = cohortBooks[v % M];
              if (!book) return null;
              const theme = themeStyles[book.theme];

              return (
                <div
                  key={`${selectedCohort}-${v}`}
                  ref={(el) => {
                    bookElsRef.current[v] = el;
                  }}
                  onClick={() => handleTapeClick(v)}
                  onPointerEnter={() => {
                    hoverRef.current = v;
                  }}
                  onPointerLeave={() => {
                    if (hoverRef.current === v) hoverRef.current = -1;
                  }}
                  className="tape absolute top-0 left-0 size-0 cursor-pointer select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* ─── Spine Face (.sp) ─────────────────────────────────── */}
                  <div
                    className="sp absolute rounded-[3px] overflow-hidden select-none border border-[rgba(0,0,0,0.65)] flex flex-col justify-between p-2.5 shadow-md"
                    style={{
                      width: "var(--ws)",
                      height: "var(--H)",
                      top: "calc(-1 * var(--H) / 2)",
                      left: "calc(-1 * var(--ws) / 2)",
                      transform: "translateZ(calc(var(--d) / 2))",
                      backfaceVisibility: "hidden",
                      background: theme.gradient,
                      color: theme.text,
                    }}
                  >
                    {/* Realistic Cylindrical Book Curvature Shadow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.15) 10%, transparent 30%, rgba(0,0,0,0.06) 80%, rgba(0,0,0,0.45) 100%)",
                      }}
                    />

                    {/* Dynamic Shading on turning */}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
                      style={{ opacity: "var(--shade-spine, 0)" }}
                    />

                    {/* Top Spine Vignette & Roll Badge */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 border-b border-white/20 pb-2">
                      <div className="size-8 rounded-full border border-white/30 flex items-center justify-center bg-black/20 shadow-inner">
                        <SpineVignette symbol={book.symbol} color={theme.accent} />
                      </div>
                      <span className="font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-black/30 border border-white/25">
                        {book.roll}
                      </span>
                    </div>

                    {/* Scholar Name: Rotated 90° clockwise so people can read top-to-bottom naturally! */}
                    <div className="relative z-10 flex-1 flex items-center justify-center my-3 overflow-visible">
                      <span
                        className="font-['Newsreader',serif] font-bold text-[17px] sm:text-[19px] tracking-[0.06em] uppercase whitespace-nowrap drop-shadow-md select-none text-center"
                        style={{
                          transform: "rotate(90deg)",
                          transformOrigin: "center center",
                          textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                        }}
                      >
                        {book.name}
                      </span>
                    </div>

                    {/* Bottom Spine IIST Brand Stamp */}
                    <div className="relative z-10 flex flex-col items-center gap-1 pt-2 border-t border-white/20">
                      <span className="text-[7.5px] font-bold tracking-[0.16em] uppercase text-white/80">
                        AEROSPACE
                      </span>
                      <span className="px-1.5 py-0.5 border border-white/40 rounded-xs text-[8.5px] font-mono font-bold tracking-widest bg-black/25">
                        IIST·MT
                      </span>
                    </div>
                  </div>

                  {/* ─── Cover Face (.cv) — Turned 3D Front ────────────────── */}
                  <div
                    className="cv absolute rounded-[3px] overflow-hidden select-none border border-[rgba(0,0,0,0.6)] flex flex-col justify-between p-5"
                    style={{
                      width: "var(--d)",
                      height: "var(--H)",
                      top: "calc(-1 * var(--H) / 2)",
                      left: "calc(-1 * var(--d) / 2)",
                      transform: "rotateY(90deg) translateZ(calc(var(--ws) / 2))",
                      backfaceVisibility: "hidden",
                      background: theme.coverBg,
                      boxShadow: "0 35px 70px -25px rgba(20,16,10,0.65)",
                    }}
                  >
                    {/* Dynamic Shading on turning */}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
                      style={{ opacity: "var(--shade-cover, 0)" }}
                    />

                    {/* Background Technical Blueprint Vector */}
                    <div className="absolute inset-0 z-0 opacity-85 pointer-events-none flex items-center justify-center p-4">
                      <TechnicalScreenprint diagram={book.diagram} color={theme.illustrationColor} className="w-full h-auto max-h-[72%]" />
                    </div>

                    {/* Cover Header */}
                    <div className="relative z-10 flex items-center justify-between border-b border-[rgba(20,20,20,0.8)] pb-2">
                      <span className="text-[8px] font-bold tracking-[0.18em] uppercase" style={{ color: theme.bg }}>
                        AEROSPACE ARCHIVES · IIST
                      </span>
                      <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 border border-[rgba(20,20,20,0.8)] bg-white/70">
                        {book.roll}
                      </span>
                    </div>

                    {/* Cover Title Area */}
                    <div className="relative z-10 my-auto">
                      <span className="text-[9px] font-bold tracking-[0.14em] uppercase block mb-1 text-[#6D6A63]">
                        {book.specialization}
                      </span>
                      <h2 className="font-['Newsreader',serif] font-bold text-2xl sm:text-3xl leading-[1.04] tracking-tight text-[#141414]">
                        {book.name}
                      </h2>
                      <span className="text-[10px] font-bold font-mono tracking-wider block mt-2" style={{ color: theme.bg }}>
                        {book.cohort}
                      </span>
                    </div>

                    {/* Cover Footer & Badges */}
                    <div className="relative z-10 flex items-center justify-between border-t border-[rgba(20,20,20,0.8)] pt-2.5">
                      <div className="flex flex-col">
                        <span className="text-[7.5px] font-mono uppercase text-[#6D6A63]">STATUS</span>
                        <span className="text-[9px] font-bold text-[#141414]">
                          {book.placedAt ? `Placed: ${book.placedAt}` : "Research Scholar"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-mono text-[8px] px-2 py-0.5 font-bold text-white rounded-xs"
                          style={{ background: theme.bg }}
                        >
                          OPEN DOSSIER
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 4. Play Ring (Dossier Action Button at Bottom Left of Cover) ─── */}
        <button
          ref={playRingRef}
          type="button"
          aria-label="Open Scholar Dossier"
          onClick={openDetail}
          className="fixed z-30 size-[42px] rounded-full border border-[#143B82] bg-[rgba(237,235,230,0.88)] text-[#143B82] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg backdrop-blur-xs"
          style={{
            transform: `scale(${playRingScale})`,
            transition: "transform 0.2s cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <FileText size={18} className="translate-x-px" aria-hidden />
        </button>

        {/* ─── 5. Caption Stack (100% Native English) ───────────────────────── */}
        <div
          aria-live="polite"
          className="relative z-20 flex flex-col items-center text-center gap-1.5 pointer-events-none pb-3"
        >
          {/* Title Mask */}
          <div
            ref={captionTitleRef}
            className="overflow-hidden h-[34px] flex items-center justify-center font-['Newsreader',serif] font-bold text-[25px] sm:text-[30px] leading-[1.1] text-[#141414]"
          >
            <span>{activeBook.name || "Select Scholar"}</span>
          </div>

          {/* Subtitle Mask */}
          <div
            ref={captionSubRef}
            className="overflow-hidden h-[18px] flex items-center justify-center text-[10.5px] font-bold tracking-[0.1em] uppercase"
            style={{ color: activeTheme.bg }}
          >
            <span>{activeBook.roll} · {(activeBook.specialization || "").toUpperCase()}</span>
          </div>

          {/* Year Mask */}
          <div
            ref={captionYearRef}
            className="overflow-hidden h-[16px] flex items-center justify-center text-[11px] font-medium tracking-wider text-[#6D6A63]"
          >
            <span>{activeBook.cohort} · IIST AEROSPACE MANUFACTURING</span>
          </div>
        </div>

        {/* ─── 6. Navigation Arrows ────────────────────────────────────────── */}
        <button
          type="button"
          aria-label="Previous scholar"
          onClick={() => {
            targetRef.current = Math.round(targetRef.current) - 1;
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 size-[42px] flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors cursor-pointer shadow-sm"
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M5 1 L1 5 L5 9 M1 5 L17 5" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next scholar"
          onClick={() => {
            targetRef.current = Math.round(targetRef.current) + 1;
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 size-[42px] flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors cursor-pointer shadow-sm"
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M13 1 L17 5 L13 9 M17 5 L1 5" />
          </svg>
        </button>

        {/* ─── 7. Bottom Bar ──────────────────────────────────────────────── */}
        <footer className="relative z-30 h-[52px] px-8 flex items-center justify-between border-t border-[rgba(20,20,20,0.1)] text-[10px] font-semibold tracking-wider uppercase text-[#6D6A63]">
          <span>© IIST Aerospace Engineering · All Rights Reserved</span>
          <div className="flex items-center gap-4">
            <Link
              href={`/people/${activeBook.slug}`}
              className="text-[#143B82] hover:underline underline-offset-4 font-bold"
            >
              Full Profile Dossier →
            </Link>
          </div>
        </footer>
      </div>

      {/* ─── 8. Custom Ring Cursor (Screenshot 4) ─────────────────────────── */}
      <div
        ref={cursorRingRef}
        className={[
          "fixed top-0 left-0 -mt-[29px] -ml-[29px] size-[58px] rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center transition-[transform,background-color,border-color] duration-400 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform",
          cursorState === "default" ? "scale-100 border-[1.5px] border-[#141414] bg-transparent" : "",
          cursorState === "spine" ? "scale-75 border-[1.5px] border-[#141414] bg-transparent" : "",
          cursorState === "btn" ? "scale-50 border-[1.5px] border-[#141414] bg-transparent" : "",
          cursorState === "open" ? "scale-[1.75] border-[1.5px] border-[#143B82] bg-[#143B82]" : "",
        ].join(" ")}
      >
        {/* Center Dot */}
        <span
          className={[
            "size-[6px] rounded-full bg-[#141414] transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
            cursorState === "open" || cursorState === "btn" ? "scale-0" : "scale-100",
          ].join(" ")}
        />

        {/* OPEN Disc Label */}
        <span
          className={[
            "absolute inset-0 flex flex-col items-center justify-center text-white text-[9.5px] font-bold tracking-[0.14em] leading-tight transition-transform duration-350 ease-[cubic-bezier(.2,.8,.2,1)] select-none",
            cursorState === "open" ? "scale-100" : "scale-0",
          ].join(" ")}
        >
          <span>OPEN</span>
          <span className="text-[7.5px] font-mono tracking-widest opacity-80">DOSSIER</span>
        </span>
      </div>

      {/* ─── 9. Opening a Profile: Detail Dialog with SVG Ink Bleed ────────── */}
      <div
        ref={detailDialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${activeBook.name} Dossier`}
        className="fixed inset-0 z-[60] bg-[#F4F2ED] text-[#141414] overflow-y-auto invisible"
        style={{
          padding: "90px 6vw 50px 7vw",
        }}
      >
        {/* Close Button Top Left */}
        <button
          type="button"
          onClick={closeDetail}
          className="fixed top-8 left-8 z-20 inline-flex items-center gap-1.5 h-[32px] px-3.5 border border-[rgba(20,20,20,0.85)] text-[10.5px] font-semibold tracking-wider uppercase hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors cursor-pointer shadow-sm"
        >
          <X size={14} aria-hidden />
          <span>Close Dossier</span>
        </button>

        {/* Header Title */}
        <div className="fixed top-8 inset-x-0 h-[60px] pointer-events-none flex flex-col items-center justify-center text-center z-10">
          <span className="font-['Newsreader',serif] font-bold text-lg text-[#143B82]">
            IIST Manufacturing Technology
          </span>
          <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#6D6A63]">
            Aerospace Research Dossier Record
          </span>
        </div>

        {/* Two-Column Grid: Left Content + Right SVG Poster */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-[4vw] items-center min-h-[calc(100vh-160px)]">
          {/* Left Column: Masked Text Lines */}
          <div className="flex flex-col justify-center max-w-[540px] gap-4">
            <div className="detail-mask-line overflow-hidden">
              <span
                className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ color: activeTheme.bg }}
              >
                {activeBook.roll} · {activeBook.cohort}
              </span>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <h1 className="inline-block font-['Newsreader',serif] font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-[#141414]">
                {activeBook.name}
              </h1>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <span className="inline-block text-[12px] font-semibold tracking-wider uppercase text-[#6D6A63]">
                {activeBook.role} · {activeBook.specialization}
              </span>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <p className="inline-block font-['Newsreader',serif] text-base sm:text-lg leading-[1.6] text-[#141414] max-w-[44ch] text-justify">
                {activeBook.synopsis}
              </p>
            </div>

            {/* Skills & Projects tags */}
            <div className="detail-mask-line overflow-hidden">
              <div className="inline-flex flex-wrap gap-2 pt-1">
                {activeBook.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="border border-[rgba(20,20,20,0.65)] px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-white/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <p className="inline-block font-['Newsreader',serif] italic text-[14px] text-[#6D6A63]">
                Aerospace Engineering Department, Indian Institute of Space Science and Technology.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="detail-mask-line overflow-hidden pt-3">
              <div className="inline-flex flex-wrap items-center gap-3">
                <Link
                  href={`/people/${activeBook.slug}`}
                  className="inline-flex items-center gap-2 h-[44px] px-6 text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:brightness-110 transition-all cursor-pointer shadow-md"
                  style={{ background: activeTheme.bg }}
                >
                  <span>View Full Dossier</span>
                  <ArrowRight size={14} aria-hidden />
                </Link>

                <a
                  href={`mailto:${activeBook.officialEmail}`}
                  className="inline-flex items-center gap-2 h-[44px] px-5 border border-[rgba(20,20,20,0.85)] bg-transparent text-[#141414] text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#141414] hover:text-[#EDEBE6] transition-all cursor-pointer"
                >
                  <Mail size={14} aria-hidden />
                  <span>Contact Scholar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: The Full-Color Poster with SVG Ink Bleed Mask */}
          <div className="flex items-center justify-center w-full">
            <div className="relative w-full max-w-[420px] aspect-[474/900] max-h-[78vh] border border-[rgba(20,20,20,0.8)] shadow-2xl bg-[#EDEBE6] overflow-hidden rounded-[2px]">
              <svg viewBox="0 0 474 900" className="w-full h-full" aria-hidden="true">
                <defs>
                  {/* Ragged Ink Bleed Filter */}
                  <filter id="ink-bleed-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                  </filter>

                  {/* 7 Circle Expanding Ink Mask */}
                  <mask id="ink-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="874" height="1300">
                    <rect x="-200" y="-200" width="874" height="1300" fill="black" />
                    <g filter="url(#ink-bleed-filter)">
                      <circle ref={(el) => { inkBlobsRef.current[0] = el; }} cx="150" cy="330" r="0" fill="white" />
                      <circle ref={(el) => { inkBlobsRef.current[1] = el; }} cx="340" cy="600" r="0" fill="white" />
                      <circle ref={(el) => { inkBlobsRef.current[2] = el; }} cx="250" cy="120" r="0" fill="white" />
                      <circle ref={(el) => { inkBlobsRef.current[3] = el; }} cx="90" cy="760" r="0" fill="white" />
                      <circle ref={(el) => { inkBlobsRef.current[4] = el; }} cx="400" cy="250" r="0" fill="white" />
                      <circle ref={(el) => { inkBlobsRef.current[5] = el; }} cx="260" cy="860" r="0" fill="white" />
                      <circle ref={(el) => { inkBlobsRef.current[6] = el; }} cx="230" cy="470" r="0" fill="white" />
                    </g>
                  </mask>
                </defs>

                {/* Poster Content Subject to Ink Mask */}
                <g mask="url(#ink-mask)">
                  {/* Poster Paper Background in Scholar's Theme */}
                  <rect width="474" height="900" fill={activeTheme.coverBg} />

                  {/* Blueprint Coordinate Grid */}
                  <g stroke={activeTheme.illustrationColor} strokeWidth="0.4" opacity="0.25">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 50} x2="474" y2={i * 50} />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="900" />
                    ))}
                  </g>

                  {/* Header typography */}
                  <text x="35" y="60" fontFamily="'Inter Tight', sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="2.5" fill={activeTheme.bg}>
                    AEROSPACE ARCHIVES · IIST VALIAMALA
                  </text>
                  <text x="35" y="85" fontFamily="'Newsreader', serif" fontSize="30" fontWeight="700" fill="#141414">
                    {activeBook.name}
                  </text>
                  <text x="35" y="106" fontFamily="monospace" fontSize="10.5" fill="#6D6A63">
                    {activeBook.roll} · {activeBook.cohort}
                  </text>

                  {/* Technical Diagram in Center */}
                  <g transform="translate(47, 180) scale(1.35)">
                    <TechnicalScreenprint diagram={activeBook.diagram} color={activeTheme.illustrationColor} />
                  </g>

                  {/* Key Specifications Table */}
                  <g transform="translate(35, 680)">
                    <rect width="404" height="150" fill={activeTheme.bg} fillOpacity="0.08" stroke={activeTheme.bg} strokeWidth="1" />
                    <text x="18" y="30" fontFamily="'Inter Tight', sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="1.5" fill={activeTheme.bg}>
                      SPECIALIZATION & CORE COMPETENCIES
                    </text>
                    <text x="18" y="55" fontFamily="'Newsreader', serif" fontSize="16" fontWeight="600" fill="#141414">
                      {activeBook.specialization}
                    </text>
                    <line x1="18" y1="75" x2="386" y2="75" stroke="#141414" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                    <text x="18" y="100" fontFamily="monospace" fontSize="9.5" fill="#6D6A63">
                      STATUS :: {activeBook.placedAt ? `Destination: ${activeBook.placedAt}` : "Active Research Scholar"}
                    </text>
                    <text x="18" y="122" fontFamily="monospace" fontSize="9.5" fontWeight="bold" fill={activeTheme.bg}>
                      VERIFIED ACADEMIC DOSSIER RECORD
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
