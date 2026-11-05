"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Mail, X, Columns, Rows } from "lucide-react";
import { people } from "@/lib/data";
import { IndicTranslate } from "@/components/IndicTranslate";
import { SiteHeader } from "@/components/site-shell";

// ─── Color & Palette Definitions (Rich Vintage Academic Book Spines) ────────
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

// ─── Format Name as First Name + Surname Initial (e.g. Pranay P.) ───────────
export function getShortName(fullName: string): string {
  if (!fullName) return "";
  const clean = fullName.trim();
  const titleMatch = clean.match(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i);
  const title = titleMatch ? titleMatch[0] : "";
  const nameWithoutTitle = title ? clean.slice(title.length).trim() : clean;

  if (nameWithoutTitle.startsWith("Incoming Scholar")) {
    return nameWithoutTitle.replace("Incoming Scholar", "Scholar");
  }

  const parts = nameWithoutTitle.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return fullName;
  if (parts.length === 1) return `${title}${parts[0]}`.trim();

  const isInit = (s: string) => s.length === 1 || (s.length === 2 && s.endsWith("."));
  if (isInit(parts[0])) {
    const mainName = parts.find((p) => !isInit(p)) || parts[parts.length - 1];
    const initial = parts[0].replace(".", "");
    return `${title}${mainName} ${initial}.`.trim();
  }

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  const lastInitial = lastName.charAt(0).toUpperCase();
  const formattedInitial = isInit(lastName)
    ? lastName.endsWith(".")
      ? lastName
      : `${lastName}.`
    : `${lastInitial}.`;

  return `${title}${firstName} ${formattedInitial}`.trim();
}

export interface BookItem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
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
  graduatedNote?: string;
  theme: ColorTheme;
  diagram: "additive" | "turbine" | "composite" | "cnc" | "metrology" | "lattice" | "welding" | "forging";
  symbol: "laser" | "arc" | "spindle" | "blade" | "weave" | "probe" | "tile" | "lattice";
}

// ─── Mathematical SmoothStep Formulas ───────────────────────────────────────
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

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// ─── Spine Top Vignettes (Circle Emblems matching Screenshot 2) ─────────────
function SpineVignette({ symbol }: { symbol: BookItem["symbol"]; color: string }) {
  if (symbol === "laser") {
    return (
      <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
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
      <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <path d="M16 6 L19 13 L26 14 L20 19 L22 26 L16 22 L10 26 L12 19 L6 14 L13 13 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "blade") {
    return (
      <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <path d="M10 22 C11 14, 16 9, 22 7 C24 11, 23 18, 19 23 C15 25, 12 24, 10 22 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.2" />
        <circle cx="16" cy="2" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "weave") {
    return (
      <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
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
      <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === "probe") {
    return (
      <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
        <line x1="16" y1="5" x2="16" y2="21" strokeWidth="1.5" />
        <circle cx="16" cy="22" r="3.5" fill="currentColor" />
        <line x1="9" y1="26" x2="23" y2="26" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="size-5 text-white/90 drop-shadow-sm" fill="none" stroke="currentColor">
      <circle cx="16" cy="16" r="13" strokeWidth="1.2" />
      <polygon points="16,7 24,11 24,21 16,25 8,21 8,11" strokeWidth="1.2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

// ─── Technical Screenprint Vector Illustrations ─────────────────────────────
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
          <rect x="90" y="30" width="100" height="30" fill={color} fillOpacity="0.15" strokeWidth="1.5" />
          <polygon points="125,60 155,60 140,85" fill={color} />
          <line x1="140" y1="85" x2="140" y2="190" stroke={color} strokeWidth="2.5" />
          <circle cx="140" cy="190" r="18" strokeDasharray="2 2" strokeWidth="0.8" />
          <circle cx="140" cy="190" r="5" fill={color} />
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
          <path
            d="M 60 230 C 70 140, 120 75, 210 55 C 235 95, 230 185, 185 245 C 135 270, 80 260, 60 230 Z"
            fill={color}
            fillOpacity="0.18"
            strokeWidth="2"
          />
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

  return (
    <svg viewBox="0 0 280 340" className={className} aria-hidden>
      <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.9">
        <circle cx="140" cy="170" r="95" strokeDasharray="4 4" opacity="0.25" />
        <rect x="110" y="40" width="60" height="80" fill={color} fillOpacity="0.2" strokeWidth="1.5" />
        <polygon points="120,120 160,120 150,180 130,180" fill={color} fillOpacity="0.4" strokeWidth="1.5" />
        <path d="M 125 130 L 155 150 M 125 150 L 155 170" strokeWidth="1.8" />
        <rect x="40" y="180" width="200" height="80" strokeWidth="1.5" fill={color} fillOpacity="0.1" />
        <line x1="40" y1="180" x2="130" y2="180" strokeWidth="2.5" />
        <path d="M 150 180 Q 180 160 210 180" strokeWidth="1.8" strokeDasharray="3 3" />
        <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>5-AXIS CNC MACHINING</text>
        <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">CUTTER TOOLPATH KINEMATICS</text>
      </g>
    </svg>
  );
}

// ─── Cohort Segmentation Datasets ───────────────────────────────────────────
type CohortId = "2025-2027" | "2024-2026" | "2026-2028" | "phd" | "faculty";

interface CohortTabConfig {
  id: CohortId;
  label: string;
  badge: string;
  statusText: string;
  count: number;
}

const cohortTabs: CohortTabConfig[] = [
  { id: "2025-2027", label: "2025–2027 (Current)", badge: "Current Batch", statusText: "M.Tech Scholars · Currently Enrolled", count: 8 },
  { id: "2024-2026", label: "2024–2026 (Graduated)", badge: "Graduated", statusText: "Graduated May 2026 · Convocation July 2026", count: 7 },
  { id: "2026-2028", label: "2026–2028 (Incoming)", badge: "Incoming Batch", statusText: "Incoming M.Tech Batch · Enrolling 2026", count: 12 },
  { id: "phd", label: "PhD Scholars", badge: "Doctoral", statusText: "PhD Research Scholars · Advanced Materials & Space Systems", count: 10 },
  { id: "faculty", label: "Faculty & Staff", badge: "Leadership", statusText: "Academic Leadership & Laboratory Engineers", count: 4 },
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

  const filtered = people.filter((p) => {
    if (cohortId === "2025-2027") return p.cohort === "2025-2027";
    if (cohortId === "2024-2026") return p.cohort === "2024-2026";
    if (cohortId === "2026-2028") return p.cohort === "2026-2028";
    if (cohortId === "phd") return p.type === "phd";
    if (cohortId === "faculty") return p.type === "faculty" || p.type === "staff";
    return true;
  });

  return filtered.map((p, idx) => {
    const rollMatch = p.role.match(/SC\w+/);
    const roll = rollMatch ? rollMatch[0] : p.admissionYear ? `PHD-${p.admissionYear}` : `MT-${String(idx + 1).padStart(2, "0")}`;

    const graduatedNote =
      p.cohort === "2024-2026"
        ? "Graduated May 2026 · Convocation July 2026"
        : undefined;

    return {
      id: p.slug,
      slug: p.slug,
      name: p.name,
      shortName: getShortName(p.name),
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
      graduatedNote,
      theme: themes[idx % themes.length],
      diagram: diagrams[idx % diagrams.length],
      symbol: symbols[idx % symbols.length],
    };
  });
}

export function PeopleShelf() {
  const [selectedCohort, setSelectedCohort] = useState<CohortId>("2025-2027");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  const cohortBooks = useMemo(() => getCohortBooks(selectedCohort), [selectedCohort]);
  const M = cohortBooks.length;

  // Active book index: null by default so NO book opens automatically!
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeIdxRef = useRef<number | null>(null);
  activeIdxRef.current = activeIdx;

  const defaultCenter = Math.max(0, (M - 1) / 2);
  const sRef = useRef(defaultCenter);
  const targetRef = useRef(defaultCenter);
  const hoverRef = useRef(-1);

  // Dragging & Momentum Physics
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ pos: 0, target: 0 });
  const lastWheelTimeRef = useRef(0);
  const wheelSnapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [dossierBook, setDossierBook] = useState<BookItem>(cohortBooks[0] || ({} as BookItem));

  // DOM Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const bookElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tabIndicatorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const detailDialogRef = useRef<HTMLDivElement>(null);
  const inkBlobsRef = useRef<(SVGCircleElement | null)[]>([]);

  // Masked caption elements
  const captionTitleRef = useRef<HTMLDivElement>(null);
  const captionSubRef = useRef<HTMLDivElement>(null);
  const captionYearRef = useRef<HTMLDivElement>(null);

  const currentTab = cohortTabs.find((t) => t.id === selectedCohort) || cohortTabs[0];

  // Reset physics when switching cohort or orientation: keep everything centered and closed!
  useEffect(() => {
    const center = Math.max(0, (M - 1) / 2);
    setActiveIdx(null);
    activeIdxRef.current = null;
    sRef.current = center;
    targetRef.current = center;

    if (tabsContainerRef.current && tabIndicatorRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector(`button[data-cohort="${selectedCohort}"]`) as HTMLElement | null;
      if (activeBtn) {
        tabIndicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
        tabIndicatorRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      }
    }
  }, [selectedCohort, orientation, M]);

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
          { duration: 400, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
        ).onfinish = () => oldSpan.remove();
      }

      container.appendChild(newSpan);
      newSpan.animate(
        [
          { transform: `translateY(${dir * 105}%)` },
          { transform: "translateY(0)" },
        ],
        { duration: 400, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
      );
    };

    slideMask(captionTitleRef.current, newBook.name);
    slideMask(
      captionSubRef.current,
      newBook.graduatedNote
        ? `${newBook.roll} · ${newBook.specialization.toUpperCase()} · ${newBook.graduatedNote.toUpperCase()}`
        : `${newBook.roll} · ${(newBook.specialization || "").toUpperCase()}`
    );
    slideMask(captionYearRef.current, `${newBook.cohort} · IIST AEROSPACE MANUFACTURING`);
  }, []);

  // ─── Open Detail Sheet with Ink Bleed ─────────────────────────────────────
  const openDetail = useCallback((book: BookItem) => {
    setDossierBook(book);
    setDetailOpen(true);
    const dialog = detailDialogRef.current;
    if (!dialog) return;

    dialog.style.visibility = "visible";

    dialog.animate(
      [
        { clipPath: "inset(20% 20% 20% 20% round 8px)", opacity: "0", transform: "scale(0.96)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: "1", transform: "scale(1)" },
      ],
      { duration: 600, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }
    );

    const textLines = dialog.querySelectorAll(".detail-mask-line > *");
    textLines.forEach((line, idx) => {
      line.animate(
        [
          { transform: "translateY(110%)" },
          { transform: "translateY(0)" },
        ],
        {
          duration: 650,
          delay: 200 + idx * 50,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "both",
        }
      );
    });

    const blobDelays = [0, 80, 160, 240, 300, 360, 140];
    const startTime = performance.now() + 180;

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
          const p = Math.min(1, blobElapsed / 950);
          const easeOut = 1 - Math.pow(1 - p, 3);
          circle.setAttribute("r", String(easeOut * 700));
          if (p < 1) allDone = false;
        }
      });

      if (!allDone && elapsed < 1600) {
        requestAnimationFrame(animateInk);
      }
    };
    requestAnimationFrame(animateInk);
  }, []);

  const closeDetail = useCallback(() => {
    const dialog = detailDialogRef.current;
    if (!dialog) {
      setDetailOpen(false);
      return;
    }

    const anim = dialog.animate(
      [
        { clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: "1", transform: "scale(1)" },
        { clipPath: "inset(15% 15% 15% 15% round 6px)", opacity: "0", transform: "scale(0.97)" },
      ],
      { duration: 400, easing: "cubic-bezier(.76,0,.18,1)", fill: "both" }
    );

    anim.onfinish = () => {
      dialog.style.visibility = "hidden";
      setDetailOpen(false);
    };
  }, []);

  // ─── Animation Loop (Continuous Spring Physics & 3D Rolling) ───────────────
  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // 1. Spring physics with dynamic damping
      const k = isDraggingRef.current ? 18.0 : 7.0;
      const prevS = sRef.current;
      targetRef.current = clamp(targetRef.current, 0, Math.max(0, M - 1));
      sRef.current += (targetRef.current - sRef.current) * (1 - Math.exp(-k * dt));

      if (Math.abs(targetRef.current - sRef.current) < 1e-4) {
        sRef.current = targetRef.current;
      }

      // Automatically sync active index as the shelf rolls past integers ONLY IF a book is already open!
      if (activeIdxRef.current !== null) {
        const currentActive = clamp(Math.round(sRef.current), 0, Math.max(0, M - 1));
        if (currentActive !== activeIdxRef.current && cohortBooks[currentActive]) {
          const dir = targetRef.current >= prevS ? 1 : -1;
          activeIdxRef.current = currentActive;
          setActiveIdx(currentActive);
          swapCaption(cohortBooks[currentActive], dir);
        }
      }

      // 2. Dimensions & Sizing
      const stageContainer = stageRef.current?.parentElement;
      const W = stageContainer ? stageContainer.clientWidth : window.innerWidth;
      const H_container = stageContainer ? stageContainer.clientHeight : window.innerHeight;
      const isMobile = W < 640;

      // Stack Mode Dimensions (Dynamic horizontal stack sizing):
      const isCompact = M <= 5;
      const isMedium = M <= 8;
      const idealSpineH = isMobile
        ? (isCompact ? 46 : isMedium ? 36 : 28)
        : (isCompact ? 60 : isMedium ? 46 : 37);
      const stackSpineH = Math.round(clamp(idealSpineH, 26, 64));
      const stackGap = isMobile ? 4 : (isCompact ? 6 : isMedium ? 5 : 4);
      const baseWidth = isCompact ? 540 : isMedium ? 480 : 420;
      const stackWidth = isMobile ? Math.min(baseWidth, W - 24) : Math.min(baseWidth, W * 0.85);

      // Shelf Mode Dimensions:
      // Mobile screens are portrait-oriented (taller than wide), so scale from container height:
      const H = isMobile
        ? clamp(H_container * 0.50, 240, 310)
        : Math.min(H_container * 0.48, W * 0.32);
      const ws = isMobile ? Math.max(46, H * (135 / 840)) : H * (135 / 840);
      const d = isMobile ? Math.max(160, H * (460 / 900)) : H * (460 / 900);
      const gap = isMobile ? 8 : H * 0.038;

      if (stageRef.current) {
        stageRef.current.style.setProperty("--ws", `${ws}px`);
        stageRef.current.style.setProperty("--d", `${d}px`);
        stageRef.current.style.setProperty("--H", `${H}px`);
        stageRef.current.style.setProperty("--stack-w", `${stackWidth}px`);
        stageRef.current.style.setProperty("--stack-h", `${stackSpineH}px`);
      }

      // 3. Transform strictly M books: all closed & centered by default, rolling only when activated!
      const isOpen = activeIdxRef.current !== null;

      for (let v = 0; v < M; v++) {
        const el = bookElsRef.current[v];
        if (!el) continue;

        const isHovered = hoverRef.current === v;
        const currentLift = Number(el.getAttribute("data-lift") || "0");
        const targetLift = isHovered ? 1 : 0;
        const nextLift = currentLift + (targetLift - currentLift) * (1 - Math.exp(-14 * dt));
        el.setAttribute("data-lift", String(nextLift));

        const r = v - sRef.current;
        const o = isOpen ? smoothStep(Math.max(0, 1 - Math.abs(r))) : 0;

        if (orientation === "horizontal") {
          // ══════════════════════════════════════════════════════════════════
          // MODE A: HORIZONTAL SHELF
          // Closed: perfectly centered symmetrically with uniform gaps!
          // Open: neighbors spread apart symmetrically so active cover stays centered!
          // ══════════════════════════════════════════════════════════════════
          const spread = isOpen ? (d - ws + 1.4 * gap) * smoothStepB(r) : 0;
          const x = r * (ws + gap) + spread;

          const rotY = -90 * o;
          const rotX = 0;
          const rotZ = 0; // Straight preview, zero diagonal tilt
          const transZ = o * 48 + nextLift * 15;
          const transY = -o * 8 - nextLift * 16;

          el.style.transform = `translate3d(${x}px, ${transY}px, ${transZ}px) rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
          el.style.zIndex = String(Math.round(100 - Math.abs(r) * 5 + (o > 0.5 ? 20 : 0)));
          el.style.setProperty("--shade-spine", String(o * 0.65));
          el.style.setProperty("--shade-cover", String((1 - o) * 0.5));
        } else {
          // ══════════════════════════════════════════════════════════════════
          // MODE B: VERTICAL STACK
          // Closed: vertically centered pillar in the middle of the screen!
          // Open: active book smoothly glides forward in 3D!
          // ══════════════════════════════════════════════════════════════════
          const y = r * (stackSpineH + stackGap) + (isOpen ? 14 * smoothStepB(r) : 0);
          const slideX = isOpen ? -o * 24 + (isHovered ? -14 : 0) : (isHovered ? -14 : 0);
          const transZ = (isOpen ? o * 42 : 0) + (isHovered ? 20 : 0) - Math.abs(r) * 4;
          const rotX = isOpen ? -10 * o : 0;
          const rotZ = isOpen ? -1.5 * o : 0;

          el.style.transform = `translate3d(${slideX}px, ${y}px, ${transZ}px) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
          el.style.zIndex = String(Math.round(80 - Math.abs(r) * 5 + nextLift * 20));
          el.style.setProperty("--shade-spine", String(o * 0.2));
          el.style.setProperty("--shade-cover", "0");
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [M, orientation, swapCaption, cohortBooks]);

  // ─── Input Handlers: Wheel, Drag & Keyboard ───────────────────────────────
  const handleShelfWheel = (e: React.WheelEvent) => {
    if (detailOpen) return;
    const delta = orientation === "horizontal"
      ? (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY)
      : e.deltaY;

    const stageContainer = stageRef.current?.parentElement;
    const W = stageContainer ? stageContainer.clientWidth : window.innerWidth;
    const isMobile = W < 640;
    const step = orientation === "horizontal" ? (isMobile ? 120 : 80) : (isMobile ? 38 : 50);

    targetRef.current = clamp(targetRef.current + (delta / step) * 0.5, 0, M - 1);
    lastWheelTimeRef.current = Date.now();

    if (wheelSnapTimerRef.current) clearTimeout(wheelSnapTimerRef.current);
    wheelSnapTimerRef.current = setTimeout(() => {
      if (activeIdxRef.current !== null) {
        targetRef.current = clamp(Math.round(targetRef.current), 0, M - 1);
      }
    }, 140);
  };

  const handleShelfPointerDown = (e: React.PointerEvent) => {
    if (detailOpen) return;
    isDraggingRef.current = false;
    const startCoord = orientation === "horizontal" ? e.clientX : e.clientY;
    dragStartRef.current = { pos: startCoord, target: targetRef.current };

    const targetEl = e.currentTarget as HTMLElement;
    targetEl.setPointerCapture?.(e.pointerId);

    const handlePointerMoveDrag = (ev: PointerEvent) => {
      const currentCoord = orientation === "horizontal" ? ev.clientX : ev.clientY;
      const delta = currentCoord - dragStartRef.current.pos;
      if (Math.abs(delta) > 5) {
        isDraggingRef.current = true;
        const stageContainer = stageRef.current?.parentElement;
        const W = stageContainer ? stageContainer.clientWidth : window.innerWidth;
        const isMobile = W < 640;
        const step = orientation === "horizontal" ? (isMobile ? 120 : 80) : (isMobile ? 38 : 50);
        targetRef.current = clamp(dragStartRef.current.target - delta / step, 0, M - 1);
      }
    };

    const handlePointerUpDrag = () => {
      if (isDraggingRef.current) {
        if (activeIdxRef.current !== null) {
          targetRef.current = clamp(Math.round(targetRef.current), 0, M - 1);
        }
      }
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 60);
      window.removeEventListener("pointermove", handlePointerMoveDrag);
      window.removeEventListener("pointerup", handlePointerUpDrag);
      window.removeEventListener("pointercancel", handlePointerUpDrag);
    };

    window.addEventListener("pointermove", handlePointerMoveDrag);
    window.addEventListener("pointerup", handlePointerUpDrag);
    window.addEventListener("pointercancel", handlePointerUpDrag);
  };

  const handleBookClick = (idx: number) => {
    if (isDraggingRef.current) return;
    const book = cohortBooks[idx];
    if (!book) return;

    if (activeIdxRef.current === idx) {
      // In active focus: open full dossier!
      openDetail(book);
    } else {
      // Open this book and center it!
      const prev = activeIdxRef.current;
      activeIdxRef.current = idx;
      setActiveIdx(idx);
      targetRef.current = clamp(idx, 0, M - 1);
      swapCaption(book, prev !== null ? (idx > prev ? 1 : -1) : 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (detailOpen) {
        if (e.key === "Escape") closeDetail();
        return;
      }

      if (e.key === "Escape" && activeIdxRef.current !== null) {
        activeIdxRef.current = null;
        setActiveIdx(null);
        targetRef.current = Math.max(0, (M - 1) / 2);
        return;
      }

      if (orientation === "horizontal") {
        if (e.key === "ArrowLeft") {
          const nextIdx = activeIdxRef.current === null
            ? Math.floor((M - 1) / 2)
            : clamp(activeIdxRef.current - 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], -1);
        } else if (e.key === "ArrowRight") {
          const nextIdx = activeIdxRef.current === null
            ? Math.ceil((M - 1) / 2)
            : clamp(activeIdxRef.current + 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], 1);
        } else if (e.key === "Enter" && activeIdxRef.current !== null && cohortBooks[activeIdxRef.current]) {
          openDetail(cohortBooks[activeIdxRef.current]);
        }
      } else {
        if (e.key === "ArrowUp") {
          const nextIdx = activeIdxRef.current === null
            ? Math.floor((M - 1) / 2)
            : clamp(activeIdxRef.current - 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], -1);
        } else if (e.key === "ArrowDown") {
          const nextIdx = activeIdxRef.current === null
            ? Math.ceil((M - 1) / 2)
            : clamp(activeIdxRef.current + 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], 1);
        } else if (e.key === "Enter" && activeIdxRef.current !== null && cohortBooks[activeIdxRef.current]) {
          openDetail(cohortBooks[activeIdxRef.current]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailOpen, orientation, M, cohortBooks, openDetail, closeDetail, swapCaption]);

  const activeBook = activeIdx !== null ? cohortBooks[activeIdx] : null;
  const activeTheme = themeStyles[activeBook?.theme || "cobalt"];

  return (
    <div className="flex flex-col lg:flex-row h-screen h-[100dvh] w-full overflow-hidden bg-[#EDEBE6] text-[#141414] font-['Inter_Tight',sans-serif]">
      {/* ─── Left Bar: Maintained on Desktop, Top Bar on Mobile ───────────── */}
      <SiteHeader />

      {/* ─── Main Right Canvas for 3D Shelf / Stack ───────────────────────── */}
      <div className="relative flex-1 min-w-0 min-h-0 w-full h-full overflow-hidden select-none flex flex-col justify-between">
        {/* Paper Grain Overlay */}
        <div
          className="fixed inset-0 z-10 pointer-events-none mix-blend-multiply opacity-55"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ─── 1. Sub-Header Toolbar (Responsive across iPhone, Android & Desktop) ── */}
        <header className="relative z-30 h-12 sm:h-14 lg:h-[60px] px-3 sm:px-6 flex items-center justify-between border-b border-[rgba(20,20,20,0.1)] bg-[#EDEBE6]/90 backdrop-blur-xs">
          {/* Left Title Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 sm:gap-1.5 h-[26px] sm:h-[28px] px-2 sm:px-2.5 border border-[rgba(20,20,20,0.85)] text-[9.5px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#141414] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors"
            >
              <ArrowLeft size={11} aria-hidden />
              <span>Back</span>
            </Link>
          </div>

          {/* Center Logo Band */}
          <div className="flex flex-col items-center justify-center text-center px-1">
            <span className="font-['Newsreader',serif] font-bold text-base sm:text-xl lg:text-2xl tracking-tight text-[#143B82] leading-tight">
              IIST Manufacturing Tech
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-semibold tracking-[0.16em] sm:tracking-[0.24em] uppercase text-[#6D6A63] hidden xs:block">
              Aerospace Engineering · Scholar Archive
            </span>
          </div>

          {/* Right Action: Orientation Switcher + Indic Translate (Desktop/Tablet) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3">
            <div className="inline-flex items-center p-0.5 rounded-sm border border-[rgba(20,20,20,0.85)] bg-white/60 shadow-xs">
              <button
                type="button"
                onClick={() => setOrientation("horizontal")}
                className={[
                  "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                  orientation === "horizontal"
                    ? "bg-[#143B82] text-white rounded-xs shadow-xs"
                    : "text-[#6D6A63] hover:text-[#141414]",
                ].join(" ")}
                title="Horizontal Standing Books Shelf"
              >
                <Columns size={11} aria-hidden />
                <span>Shelf</span>
              </button>

              <button
                type="button"
                onClick={() => setOrientation("vertical")}
                className={[
                  "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                  orientation === "vertical"
                    ? "bg-[#143B82] text-white rounded-xs shadow-xs"
                    : "text-[#6D6A63] hover:text-[#141414]",
                ].join(" ")}
                title="Vertical Flat Books Stack"
              >
                <Rows size={11} aria-hidden />
                <span>Stack</span>
              </button>
            </div>

            <div className="hidden sm:block">
              <IndicTranslate />
            </div>
          </div>
        </header>

        {/* ─── 2. Cohort Segregation Tabs (Horizontally Scrollable on Mobile) ── */}
        <nav
          aria-label="Cohort Batches"
          className="relative z-30 w-full flex flex-col items-center justify-center pt-1.5 sm:pt-2 pb-1 gap-1 px-2"
        >
          <div className="w-full max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex justify-start sm:justify-center py-0.5">
            <div
              ref={tabsContainerRef}
              className="relative inline-flex items-center bg-[#EDEBE6] border border-[rgba(20,20,20,0.85)] rounded-sm overflow-hidden shadow-xs shrink-0 mx-auto"
            >
              <div
                ref={tabIndicatorRef}
                className="absolute top-0 bottom-0 bg-[#143B82] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] z-0 pointer-events-none"
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
                      "relative z-10 h-[26px] sm:h-[29px] px-2.5 sm:px-3 border-r last:border-r-0 border-[rgba(20,20,20,0.25)] text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider uppercase transition-colors duration-250 select-none whitespace-nowrap cursor-pointer",
                      isActive ? "text-white font-bold" : "text-[#141414] hover:bg-[#141414]/8",
                    ].join(" ")}
                  >
                    <span>{tab.label}</span>
                    <span className={`ml-1 text-[8.5px] sm:text-[9px] font-mono opacity-80 ${isActive ? "text-white/80" : "text-[#6D6A63]"}`}>
                      ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-[#6D6A63]">
            <span className="size-1.5 rounded-full bg-[#143B82]" />
            <span className="truncate max-w-[320px]">{currentTab.statusText}</span>
          </div>
        </nav>

        {/* ─── 3. The 3D Stage (Continuous Drag & Wheel Rolling Physics) ────── */}
        <section
          aria-label="Archival book presentation"
          onPointerDown={handleShelfPointerDown}
          onWheel={handleShelfWheel}
          className="relative flex-1 min-h-0 w-full z-20 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible select-none"
          style={{
            perspective: "2000px",
            WebkitPerspective: "2000px",
            perspectiveOrigin: "50% 50%",
            touchAction: "none",
          }}
        >
          {/* Zero-size Stage Origin in Center */}
          <div
            ref={stageRef}
            className="relative size-0"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              ["--ws" as string]: "76px",
              ["--d" as string]: "230px",
              ["--H" as string]: "460px",
              ["--stack-w" as string]: "480px",
              ["--stack-h" as string]: "46px",
            }}
          >
            {cohortBooks.map((book, v) => {
              const theme = themeStyles[book.theme];

              return (
                <div
                  key={`${selectedCohort}-${book.id}`}
                  ref={(el) => {
                    bookElsRef.current[v] = el;
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookClick(v);
                  }}
                  onPointerEnter={() => {
                    hoverRef.current = v;
                  }}
                  onPointerLeave={() => {
                    if (hoverRef.current === v) hoverRef.current = -1;
                  }}
                  className="tape absolute top-0 left-0 size-0 cursor-pointer select-none transition-shadow"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {orientation === "horizontal" ? (
                    // ══════════════════════════════════════════════════════════
                    // MODE A: HORIZONTAL SHELF (Rolling 3D: Spine to Cover!)
                    // ══════════════════════════════════════════════════════════
                    <>
                      {/* Spine Face (.sp) */}
                      <div
                        className="sp absolute rounded-[2px] overflow-hidden select-none border border-black/70 flex flex-col justify-between p-2 shadow-md transition-opacity"
                        style={{
                          width: "var(--ws)",
                          height: "var(--H)",
                          top: "calc(-1 * var(--H) / 2)",
                          left: "calc(-1 * var(--ws) / 2)",
                          transform: "translateZ(calc(var(--d) / 2))",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          background: theme.gradient,
                          color: theme.text,
                        }}
                      >
                        {/* Curvature gradient */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.18) 12%, transparent 32%, rgba(0,0,0,0.06) 80%, rgba(0,0,0,0.45) 100%)",
                          }}
                        />

                        {/* Top Spine Vignette & Roll Badge */}
                        <div className="relative z-10 flex flex-col items-center gap-1 border-b border-white/20 pb-1.5">
                          <div className="size-6 sm:size-7 rounded-full border border-white/30 flex items-center justify-center bg-black/20 shadow-inner">
                            <SpineVignette symbol={book.symbol} color={theme.accent} />
                          </div>
                          <span className="font-mono text-[7.5px] sm:text-[8.5px] font-bold tracking-wider px-1 py-0.5 rounded-xs bg-black/30 border border-white/25">
                            {book.roll}
                          </span>
                        </div>

                        {/* Scholar Name (Pranay P. - Shortened, 90° clockwise) */}
                        <div className="relative z-10 flex-1 flex items-center justify-center my-2 overflow-visible">
                          <span
                            className="font-['Newsreader',serif] font-bold text-[13px] sm:text-[18px] tracking-[0.06em] uppercase whitespace-nowrap drop-shadow-md select-none text-center"
                            style={{
                              transform: "rotate(90deg)",
                              transformOrigin: "center center",
                              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                            }}
                          >
                            {book.shortName}
                          </span>
                        </div>

                        {/* Bottom Spine IIST Stamp */}
                        <div className="relative z-10 flex flex-col items-center gap-0.5 pt-1.5 border-t border-white/20">
                          <span className="text-[6.5px] sm:text-[7px] font-bold tracking-[0.16em] uppercase text-white/80">
                            AEROSPACE
                          </span>
                          <span className="px-1 py-0.5 border border-white/40 rounded-xs text-[7px] sm:text-[7.5px] font-mono font-bold tracking-widest bg-black/25">
                            IIST·MT
                          </span>
                        </div>
                      </div>

                      {/* Cover Face (.cv) - Straight preview when open */}
                      <div
                        className="cv absolute rounded-[2px] overflow-hidden select-none border border-black/80 flex flex-col justify-between p-3 sm:p-4.5"
                        style={{
                          width: "var(--d)",
                          height: "var(--H)",
                          top: "calc(-1 * var(--H) / 2)",
                          left: "calc(-1 * var(--d) / 2)",
                          transform: "rotateY(90deg) translateZ(calc(var(--ws) / 2))",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          background: theme.coverBg,
                          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)",
                        }}
                      >
                        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none flex items-center justify-center p-2 sm:p-3">
                          <TechnicalScreenprint diagram={book.diagram} color={theme.illustrationColor} className="w-full h-auto max-h-[72%]" />
                        </div>

                        <div className="relative z-10 flex items-center justify-between border-b border-[rgba(20,20,20,0.8)] pb-1">
                          <span className="text-[7px] sm:text-[7.5px] font-bold tracking-[0.16em] uppercase" style={{ color: theme.bg }}>
                            AEROSPACE ARCHIVES · IIST
                          </span>
                          <span className="font-mono text-[7px] sm:text-[7.5px] font-bold px-1.5 py-0.5 border border-[rgba(20,20,20,0.8)] bg-white/70">
                            {book.roll}
                          </span>
                        </div>

                        <div className="relative z-10 my-auto text-center px-1">
                          <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.12em] uppercase block mb-0.5 sm:mb-1 text-[#6D6A63]">
                            {book.specialization}
                          </span>
                          <h2 className="font-['Newsreader',serif] font-bold text-lg sm:text-2xl lg:text-3xl leading-[1.05] tracking-tight text-[#141414]">
                            {book.shortName}
                          </h2>
                          <span className="text-[8.5px] sm:text-[9.5px] font-bold font-mono tracking-wider block mt-1" style={{ color: theme.bg }}>
                            {book.graduatedNote ? `${book.cohort} (${book.graduatedNote})` : book.cohort}
                          </span>
                        </div>

                        <div className="relative z-10 flex items-center justify-between border-t border-[rgba(20,20,20,0.8)] pt-1.5 sm:pt-2">
                          <div className="flex flex-col text-left">
                            <span className="text-[6.5px] sm:text-[7px] font-mono uppercase text-[#6D6A63]">DESTINATION</span>
                            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-[#141414] truncate max-w-[100px] sm:max-w-none">
                              {book.placedAt ? book.placedAt : "Research Scholar"}
                            </span>
                          </div>
                          <span
                            className="font-mono text-[7px] sm:text-[8px] px-1.5 sm:px-2 py-0.5 font-bold text-white rounded-xs shadow-xs"
                            style={{ background: theme.bg }}
                          >
                            OPEN DOSSIER
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // ══════════════════════════════════════════════════════════
                    // MODE B: VERTICAL STACK (Dynamic Horizontal Sizing, 3D Lift)
                    // ══════════════════════════════════════════════════════════
                    <div
                      className={[
                        "sp absolute rounded-[2px] overflow-hidden select-none border border-black/70 flex items-center justify-between shadow-md hover:brightness-105 transition-all",
                        M <= 5 ? "px-5 sm:px-6" : M <= 8 ? "px-4 sm:px-5" : "px-3 sm:px-3.5",
                      ].join(" ")}
                      style={{
                        width: "var(--stack-w)",
                        height: "var(--stack-h)",
                        top: "calc(-1 * var(--stack-h) / 2)",
                        left: "calc(-1 * var(--stack-w) / 2)",
                        background: theme.gradient,
                        color: theme.text,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 28%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.4) 100%)",
                        }}
                      />

                      {/* Left Symbol & Roll */}
                      <div className="relative z-10 flex items-center gap-2">
                        <div
                          className={[
                            "rounded-full border border-white/30 flex items-center justify-center bg-black/25 shrink-0",
                            M <= 5 ? "size-8" : M <= 8 ? "size-7" : "size-6",
                          ].join(" ")}
                        >
                          <SpineVignette symbol={book.symbol} color={theme.accent} />
                        </div>
                        <span
                          className={[
                            "font-mono font-bold tracking-wider rounded-xs bg-black/30 border border-white/20 whitespace-nowrap",
                            M <= 5 ? "text-[10px] px-1.5 py-0.5" : M <= 8 ? "text-[9px] px-1 py-0.5" : "text-[8px] px-1 py-0.5",
                          ].join(" ")}
                        >
                          {book.roll}
                        </span>
                      </div>

                      {/* Shortened Name across the horizontal spine (e.g. PRANAY P.) */}
                      <div className="relative z-10 flex-1 px-3 text-center overflow-hidden">
                        <span
                          className={[
                            "font-['Newsreader',serif] font-bold tracking-[0.05em] uppercase whitespace-nowrap text-white block truncate",
                            M <= 5 ? "text-[17px] sm:text-[20px]" : M <= 8 ? "text-[15px] sm:text-[17px]" : "text-[13px] sm:text-[14.5px]",
                          ].join(" ")}
                          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7)" }}
                        >
                          {book.shortName}
                        </span>
                      </div>

                      {/* Right Department Badge */}
                      <div className="relative z-10 flex items-center gap-2">
                        <span
                          className={[
                            "font-mono tracking-wider uppercase text-white/80 hidden sm:inline",
                            M <= 5 ? "text-[9px]" : M <= 8 ? "text-[8px]" : "text-[7.5px]",
                          ].join(" ")}
                        >
                          {book.specialization.slice(0, 16)}
                        </span>
                        <span
                          className={[
                            "border border-white/40 rounded-xs font-mono font-bold tracking-widest bg-black/25",
                            M <= 5 ? "text-[9px] px-2 py-0.5" : M <= 8 ? "text-[8px] px-1.5 py-0.5" : "text-[7.5px] px-1 py-0.5",
                          ].join(" ")}
                        >
                          IIST
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 4. Caption Stack ────────────────────────────────────────────── */}
        <div
          aria-live="polite"
          className="relative z-20 flex flex-col items-center text-center gap-0.5 sm:gap-1 pb-1 sm:pb-3 pointer-events-auto px-4"
        >
          <div
            ref={captionTitleRef}
            className="overflow-hidden h-[26px] sm:h-[30px] flex items-center justify-center font-['Newsreader',serif] font-bold text-[19px] sm:text-[26px] leading-[1.1] text-[#141414]"
          >
            <span>{activeBook ? activeBook.name : "IIST Manufacturing Technology"}</span>
          </div>

          <div
            ref={captionSubRef}
            className="overflow-hidden h-[15px] sm:h-[16px] flex items-center justify-center text-[9px] sm:text-[10px] font-bold tracking-[0.08em] sm:tracking-[0.1em] uppercase"
            style={{ color: activeTheme.bg }}
          >
            <span>
              {activeBook
                ? (activeBook.graduatedNote
                    ? `${activeBook.roll} · ${activeBook.specialization.toUpperCase()} · ${activeBook.graduatedNote.toUpperCase()}`
                    : `${activeBook.roll} · ${(activeBook.specialization || "").toUpperCase()}`)
                : `${currentTab.label} · AEROSPACE MANUFACTURING SCHOLARS`}
            </span>
          </div>

          <div
            ref={captionYearRef}
            className="overflow-hidden h-[14px] sm:h-[15px] flex items-center justify-center text-[9px] sm:text-[10.5px] font-medium tracking-wider text-[#6D6A63]"
          >
            <span>
              {activeIdx !== null && activeBook
                ? `${activeBook.cohort} · IIST AEROSPACE MANUFACTURING · PROFILE ${activeIdx + 1} OF ${M}`
                : `SELECT ANY SCHOLAR BOOK TO OPEN DOSSIER · ${M} PROFILES ARCHIVED`}
            </span>
          </div>
        </div>

        {/* ─── 5. Navigation Arrows (Shelf: Left/Right; Stack: Up/Down) ───── */}
        {orientation === "horizontal" ? (
          <>
            <button
              type="button"
              aria-label="Previous scholar"
              disabled={activeIdx === 0}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.max(0, Math.floor((M - 1) / 2))
                  : clamp(activeIdx - 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], -1);
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 size-[34px] sm:size-[40px] flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm"
              title="Previous Book (Arrow Left / Scroll Left)"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              aria-label="Next scholar"
              disabled={activeIdx === M - 1}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.min(M - 1, Math.ceil((M - 1) / 2))
                  : clamp(activeIdx + 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], 1);
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 size-[34px] sm:size-[40px] flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm"
              title="Next Book (Arrow Right / Scroll Right)"
            >
              <ArrowRight size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              aria-label="Previous scholar in stack"
              disabled={activeIdx === 0}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.max(0, Math.floor((M - 1) / 2))
                  : clamp(activeIdx - 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], -1);
              }}
              className="absolute right-2 sm:right-6 top-[40%] -translate-y-1/2 z-30 size-[34px] sm:size-[40px] flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm"
              title="Previous Book in Stack (Arrow Up / Scroll Up)"
            >
              <ArrowUp size={15} />
            </button>

            <button
              type="button"
              aria-label="Next scholar in stack"
              disabled={activeIdx === M - 1}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.min(M - 1, Math.ceil((M - 1) / 2))
                  : clamp(activeIdx + 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                if (cohortBooks[nextIdx]) swapCaption(cohortBooks[nextIdx], 1);
              }}
              className="absolute right-2 sm:right-6 top-[60%] -translate-y-1/2 z-30 size-[34px] sm:size-[40px] flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm"
              title="Next Book in Stack (Arrow Down / Scroll Down)"
            >
              <ArrowDown size={15} />
            </button>
          </>
        )}

        {/* ─── 6. Bottom Bar ──────────────────────────────────────────────── */}
        <footer className="relative z-30 h-10 sm:h-[46px] px-3 sm:px-8 flex items-center justify-between border-t border-[rgba(20,20,20,0.1)] text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider uppercase text-[#6D6A63]">
          <span className="hidden xs:inline truncate">© IIST Aerospace Engineering</span>
          <span className="xs:hidden">© IIST MT</span>

          <div className="flex items-center gap-3">
            {activeIdx !== null && activeBook ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    activeIdxRef.current = null;
                    setActiveIdx(null);
                    targetRef.current = Math.max(0, (M - 1) / 2);
                  }}
                  className="text-[#6D6A63] hover:text-[#141414] hover:underline underline-offset-4 font-semibold cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => openDetail(activeBook)}
                  className="text-[#143B82] hover:underline underline-offset-4 font-bold cursor-pointer shrink-0"
                >
                  <span className="hidden sm:inline">Open Full Dossier ({activeBook.name}) →</span>
                  <span className="sm:hidden">Open Dossier →</span>
                </button>
              </>
            ) : (
              <span className="text-[#6D6A63]">Click any scholar book to inspect dossier</span>
            )}
          </div>
        </footer>
      </div>

      {/* ─── 7. Full Dossier Modal Sheet (Straight, Comprehensive) ─────────── */}
      <div
        ref={detailDialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${dossierBook.name} Dossier`}
        className="fixed inset-0 z-[110] bg-[#F4F2ED] text-[#141414] overflow-y-auto invisible pt-16 pb-12 px-4 sm:px-8"
      >
        {/* Sticky Modal Top Bar: Mobile & Desktop friendly */}
        <div className="fixed top-0 inset-x-0 h-14 bg-[#F4F2ED]/95 backdrop-blur-md border-b border-[rgba(20,20,20,0.12)] px-4 sm:px-8 flex items-center justify-between z-30">
          <button
            type="button"
            onClick={closeDetail}
            className="inline-flex items-center gap-1.5 h-[30px] px-3 border border-[rgba(20,20,20,0.85)] text-[10px] font-semibold tracking-wider uppercase bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors cursor-pointer shadow-sm"
          >
            <X size={13} aria-hidden />
            <span>Close</span>
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="font-['Newsreader',serif] font-bold text-sm sm:text-base text-[#143B82] leading-tight">
              IIST Manufacturing Technology
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.18em] text-[#6D6A63]">
              Scholar Dossier Record
            </span>
          </div>

          <div className="w-[60px] sm:w-[70px]" />
        </div>

        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-[4vw] items-center min-h-[calc(100vh-150px)]">
          <div className="flex flex-col justify-center max-w-[540px] gap-3.5">
            <div className="detail-mask-line overflow-hidden">
              <span
                className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ color: themeStyles[dossierBook.theme || "cobalt"].bg }}
              >
                {dossierBook.roll} · {dossierBook.cohort}
              </span>
            </div>

            {/* FULL NAME proudly displayed inside dossier */}
            <div className="detail-mask-line overflow-hidden">
              <h1 className="inline-block font-['Newsreader',serif] font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-[#141414]">
                {dossierBook.name}
              </h1>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <span className="inline-block text-[12px] font-semibold tracking-wider uppercase text-[#6D6A63]">
                {dossierBook.role} · {dossierBook.specialization}
              </span>
            </div>

            {dossierBook.graduatedNote && (
              <div className="detail-mask-line overflow-hidden">
                <div className="inline-block px-3 py-1.5 rounded-sm border border-[rgba(20,20,20,0.6)] bg-white/70 font-mono text-[11px] text-[#143B82] font-bold">
                  🎓 {dossierBook.graduatedNote}
                </div>
              </div>
            )}

            <div className="detail-mask-line overflow-hidden">
              <p className="inline-block font-['Newsreader',serif] text-base sm:text-lg leading-[1.6] text-[#141414] max-w-[44ch] text-justify">
                {dossierBook.synopsis}
              </p>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <div className="inline-flex flex-wrap gap-2 pt-1">
                {dossierBook.skills?.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="border border-[rgba(20,20,20,0.65)] px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-white/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-mask-line overflow-hidden pt-2">
              <div className="inline-flex flex-wrap items-center gap-3">
                <Link
                  href={`/people/${dossierBook.slug}`}
                  className="inline-flex items-center gap-2 h-[42px] px-5 text-white text-[10.5px] font-bold tracking-[0.12em] uppercase hover:brightness-110 transition-all cursor-pointer shadow-md"
                  style={{ background: themeStyles[dossierBook.theme || "cobalt"].bg }}
                >
                  <span>Full Profile Page</span>
                  <ArrowRight size={14} aria-hidden />
                </Link>

                <a
                  href={`mailto:${dossierBook.officialEmail}`}
                  className="inline-flex items-center gap-2 h-[42px] px-4 border border-[rgba(20,20,20,0.85)] bg-transparent text-[#141414] text-[10.5px] font-semibold tracking-[0.1em] uppercase hover:bg-[#141414] hover:text-[#EDEBE6] transition-all cursor-pointer"
                >
                  <Mail size={14} aria-hidden />
                  <span>Contact Scholar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Vector Illustration Cover Sheet with SVG Ink Bleed */}
          <div className="flex items-center justify-center w-full">
            <div className="relative w-full max-w-[420px] aspect-[474/900] max-h-[76vh] border border-[rgba(20,20,20,0.8)] shadow-2xl bg-[#EDEBE6] overflow-hidden rounded-[2px]">
              <svg viewBox="0 0 474 900" className="w-full h-full" aria-hidden="true">
                <defs>
                  <filter id="ink-bleed-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                  </filter>

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

                <g mask="url(#ink-mask)">
                  <rect width="474" height="900" fill={themeStyles[dossierBook.theme || "cobalt"].coverBg} />

                  <g stroke={themeStyles[dossierBook.theme || "cobalt"].illustrationColor} strokeWidth="0.4" opacity="0.25">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 50} x2="474" y2={i * 50} />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="900" />
                    ))}
                  </g>

                  <text x="35" y="60" fontFamily="'Inter Tight', sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="2.5" fill={themeStyles[dossierBook.theme || "cobalt"].bg}>
                    AEROSPACE ARCHIVES · IIST VALIAMALA
                  </text>
                  <text x="35" y="85" fontFamily="'Newsreader', serif" fontSize="30" fontWeight="700" fill="#141414">
                    {dossierBook.name}
                  </text>
                  <text x="35" y="106" fontFamily="monospace" fontSize="10.5" fill="#6D6A63">
                    {dossierBook.roll} · {dossierBook.cohort}
                  </text>

                  <g transform="translate(47, 180) scale(1.35)">
                    <TechnicalScreenprint diagram={dossierBook.diagram} color={themeStyles[dossierBook.theme || "cobalt"].illustrationColor} />
                  </g>

                  <g transform="translate(35, 680)">
                    <rect width="404" height="150" fill={themeStyles[dossierBook.theme || "cobalt"].bg} fillOpacity="0.08" stroke={themeStyles[dossierBook.theme || "cobalt"].bg} strokeWidth="1" />
                    <text x="18" y="30" fontFamily="'Inter Tight', sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="1.5" fill={themeStyles[dossierBook.theme || "cobalt"].bg}>
                      SPECIALIZATION & CORE COMPETENCIES
                    </text>
                    <text x="18" y="55" fontFamily="'Newsreader', serif" fontSize="16" fontWeight="600" fill="#141414">
                      {dossierBook.specialization}
                    </text>
                    <line x1="18" y1="75" x2="386" y2="75" stroke="#141414" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                    <text x="18" y="100" fontFamily="monospace" fontSize="9.5" fill="#6D6A63">
                      STATUS :: {dossierBook.placedAt ? `Destination: ${dossierBook.placedAt}` : "Active Research Scholar"}
                    </text>
                    <text x="18" y="122" fontFamily="monospace" fontSize="9.5" fontWeight="bold" fill={themeStyles[dossierBook.theme || "cobalt"].bg}>
                      {dossierBook.graduatedNote || "VERIFIED ACADEMIC DOSSIER RECORD"}
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
