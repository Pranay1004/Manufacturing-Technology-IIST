"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Mail, X, Columns, Rows, FileText, ExternalLink } from "lucide-react";
import { people, formatResumeUrl } from "@/lib/data";
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

// ─── Format First Name Only for Opened Book Cover Tile ──────────────────────
export function getFirstName(fullName: string): string {
  if (!fullName) return "";
  const clean = fullName.trim();
  const withoutTitle = clean.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.|Shri)\s+/i, "").trim();
  if (withoutTitle.startsWith("Incoming Scholar")) {
    return withoutTitle.replace("Incoming Scholar", "Scholar");
  }
  const parts = withoutTitle.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return clean;
  const isInit = (s: string) => s.length === 1 || (s.length === 2 && s.endsWith("."));
  const firstMeaningful = parts.find((p) => !isInit(p));
  return firstMeaningful || parts[0];
}

export interface BookItem {
  id: string;
  slug: string;
  name: string;
  firstName: string;
  shortName: string;
  cohort: string;
  roll: string;
  specialization: string;
  role: string;
  synopsis: string;
  skills: string[];
  projects: string[];
  projectDetails?: { title: string; summary: string }[];
  researchInterests?: string[];
  profileSections?: { title: string; body: string }[];
  resumeUrl?: string;
  photoUrl?: string;
  officialEmail: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  placedAt?: string;
  placedRole?: string;
  graduatedNote?: string;
  theme: ColorTheme;
  diagram: "additive" | "turbine" | "composite" | "cnc" | "metrology" | "lattice" | "welding" | "forging";
  symbol: "laser" | "arc" | "spindle" | "blade" | "weave" | "probe" | "tile" | "lattice";
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// ─── Spine Top Vignettes ───────────────────────────────────────────────────
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
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>L-PBF Laser Melting</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">Layer-by-layer deposition</text>
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
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>Aerodynamic Airfoil</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">Ti-6Al-4V turbine geometry</text>
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
          <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>Laminate Composite</text>
          <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">Orthotropic ply stack [0/45/90]s</text>
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
        <text x="35" y="45" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill={color}>5-Axis CNC Machining</text>
        <text x="35" y="300" fontFamily="monospace" fontSize="8" fill={color} opacity="0.75">Cutter toolpath kinematics</text>
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
  { id: "2025-2027", label: "2025–2027 (Current)", badge: "Current Outgoing", statusText: "M.Tech Scholars · Class of 2025–2027", count: 8 },
  { id: "2024-2026", label: "2024–2026 (Graduated)", badge: "Graduated", statusText: "Graduated May 2026 · Alumni Archive", count: 7 },
  { id: "2026-2028", label: "2026–2028 (Incoming)", badge: "Incoming", statusText: "Incoming M.Tech Batch · Enrolling 2026", count: 12 },
  { id: "phd", label: "PhD Scholars", badge: "Doctoral", statusText: "PhD Research Scholars · Advanced Materials & Space Systems", count: 10 },
  { id: "faculty", label: "Faculty & Staff", badge: "Leadership", statusText: "Academic Leadership & Laboratory Engineers", count: 6 },
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
      firstName: getFirstName(p.name),
      shortName: getShortName(p.name),
      cohort: p.cohort ?? (p.type === "faculty" ? "Faculty Anchor" : p.admissionYear ? `PhD ${p.admissionYear}` : "2025-2027"),
      roll,
      specialization: p.specialization,
      role: p.role,
      synopsis: p.synopsis,
      skills: p.skills,
      projects: p.projects.map((proj) => proj.title),
      projectDetails: p.projects,
      researchInterests: p.researchInterests,
      profileSections: p.profileSections,
      resumeUrl: p.resumeUrl,
      photoUrl: p.photoUrl,
      officialEmail: p.officialEmail,
      linkedin: p.linkedin,
      github: p.github,
      portfolio: p.portfolio,
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

  const [detailOpen, setDetailOpen] = useState(false);
  const [dossierBook, setDossierBook] = useState<BookItem>(cohortBooks[0] || ({} as BookItem));

  // DOM Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const bookElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cvElsRef = useRef<(HTMLElement | null)[]>([]);
  const liftsRef = useRef<number[]>([]);
  const opensRef = useRef<number[]>([]);
  const tabIndicatorRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Cached Layout Dimensions
  const dimsRef = useRef({
    W: 1000,
    H_container: 700,
    isMobile: false,
    ws: 76,
    d: 230,
    H: 460,
    gap: 16,
    stackWidth: 480,
    stackSpineH: 46,
    stackGap: 5,
  });

  const updateDimensions = useCallback(() => {
    const stageContainer = stageRef.current?.parentElement;
    const W = stageContainer ? stageContainer.clientWidth : (typeof window !== "undefined" ? window.innerWidth : 1000);
    const H_container = stageContainer ? stageContainer.clientHeight : (typeof window !== "undefined" ? window.innerHeight : 700);
    const isMobile = W < 640;

    const isCompact = M <= 5;
    const isMedium = M <= 8;
    const idealSpineH = isMobile
      ? (isCompact ? 50 : isMedium ? 42 : 34)
      : (isCompact ? 68 : isMedium ? 54 : 44);
    const stackSpineH = Math.round(clamp(idealSpineH, 32, 72));
    const stackGap = isMobile ? 5 : (isCompact ? 7 : isMedium ? 6 : 5);
    const baseWidth = isCompact ? 720 : isMedium ? 680 : 620;
    const stackWidth = isMobile ? Math.min(baseWidth, W - 20) : Math.min(baseWidth, W * 0.90);

    const H = isMobile
      ? clamp(H_container * 0.56, 270, 350)
      : Math.min(H_container * 0.60, W * 0.40);
    const ws = isMobile ? Math.max(52, H * (135 / 840)) : H * (135 / 840);
    const d = isMobile ? Math.max(200, H * (520 / 840)) : Math.max(225, H * (520 / 840));
    const gap = isMobile ? 10 : H * 0.038;

    dimsRef.current = { W, H_container, isMobile, ws, d, H, gap, stackWidth, stackSpineH, stackGap };

    if (stageRef.current) {
      stageRef.current.style.setProperty("--ws", `${ws}px`);
      stageRef.current.style.setProperty("--d", `${d}px`);
      stageRef.current.style.setProperty("--H", `${H}px`);
      stageRef.current.style.setProperty("--stack-w", `${stackWidth}px`);
      stageRef.current.style.setProperty("--stack-h", `${stackSpineH}px`);
    }
  }, [M]);

  const currentTab = cohortTabs.find((t) => t.id === selectedCohort) || cohortTabs[0];

  // Active rAF state and loop wake controller
  const isLoopRunningRef = useRef(false);
  const animIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const loopFnRef = useRef<(now: number) => void>(() => {});

  const wakeLoop = useCallback(() => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;
    lastTimeRef.current = performance.now();
    animIdRef.current = requestAnimationFrame((now) => loopFnRef.current(now));
  }, []);

  // Sync cache & dimensions on mount and cohort change
  useEffect(() => {
    updateDimensions();
    liftsRef.current = new Array(M).fill(0);
    opensRef.current = new Array(M).fill(0);
    cvElsRef.current = bookElsRef.current.map((el) => (el ? el.querySelector<HTMLElement>(".cv") : null));
    wakeLoop();
  }, [M, selectedCohort, updateDimensions, wakeLoop]);

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
      wakeLoop();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updateDimensions, wakeLoop]);

  // Reset physics when switching cohort or orientation: keep everything centered and closed!
  useEffect(() => {
    const center = Math.max(0, (M - 1) / 2);
    setActiveIdx(null);
    activeIdxRef.current = null;
    sRef.current = center;
    targetRef.current = center;
    opensRef.current = new Array(M).fill(0);
    updateDimensions();
    wakeLoop();

    if (tabsContainerRef.current && tabIndicatorRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector(`button[data-cohort="${selectedCohort}"]`) as HTMLElement | null;
      if (activeBtn) {
        tabIndicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
        tabIndicatorRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      }
    }
  }, [selectedCohort, orientation, M, updateDimensions, wakeLoop]);

  // ─── Open Detail Modal ───────────────────────────────────────────────────
  const openDetail = useCallback((book: BookItem) => {
    setDossierBook(book);
    setDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
  }, []);

  // ─── Animation Loop (Dynamic Momentum Physics with Idle Sleep) ─────────────
  useEffect(() => {
    loopFnRef.current = (now: number) => {
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      // Spring physics for shelf translation
      const k = isDraggingRef.current ? 18.0 : 8.0;
      targetRef.current = clamp(targetRef.current, 0, Math.max(0, M - 1));
      sRef.current += (targetRef.current - sRef.current) * (1 - Math.exp(-k * dt));

      const diff = Math.abs(targetRef.current - sRef.current);
      let isMoving = isDraggingRef.current || diff > 1e-4;

      if (diff < 1e-4) {
        sRef.current = targetRef.current;
      }

      const { ws, d, gap, stackSpineH, stackGap } = dimsRef.current;
      const currentActive = activeIdxRef.current;

      for (let v = 0; v < M; v++) {
        const el = bookElsRef.current[v];
        if (!el) continue;

        const isHovered = hoverRef.current === v;
        const currentLift = liftsRef.current[v] || 0;
        const targetLift = isHovered ? 1 : 0;
        const nextLift = currentLift + (targetLift - currentLift) * (1 - Math.exp(-14 * dt));
        liftsRef.current[v] = nextLift;
        if (Math.abs(targetLift - nextLift) > 1e-3) isMoving = true;

        // Individual book open rotation
        const isTarget = currentActive === v;
        const targetO = isTarget ? 1 : 0;
        const currentO = opensRef.current[v] || 0;
        const nextO = currentO + (targetO - currentO) * (1 - Math.exp(-12 * dt));
        opensRef.current[v] = nextO;
        if (Math.abs(targetO - nextO) > 1e-3) isMoving = true;

        const r = v - sRef.current;
        const activeO = (currentActive !== null && opensRef.current[currentActive] !== undefined)
          ? opensRef.current[currentActive]
          : 0;

        if (orientation === "horizontal") {
          // Symmetrical spread outward from the active book so it never clips neighbors
          let spread = 0;
          if (currentActive !== null) {
            const spreadDistance = d * 0.52 + gap;
            if (v < currentActive) {
              spread = -spreadDistance * activeO;
            } else if (v > currentActive) {
              spread = spreadDistance * activeO;
            }
          }

          const x = r * (ws + gap) + spread;
          const rotY = -90 * nextO;
          const transZ = nextO * 42 + nextLift * 14;
          const transY = -nextO * 8 - nextLift * 16;

          el.style.transform = `translate3d(${x}px, ${transY}px, ${transZ}px) rotateY(${rotY}deg)`;
          el.style.zIndex = String(Math.round(100 - Math.abs(r) * 5 + (nextO > 0.3 ? 30 : 0)));

          const cvEl = cvElsRef.current[v] || el.querySelector<HTMLElement>(".cv");
          if (cvEl) {
            if (nextO < 0.02) {
              if (cvEl.style.visibility !== "hidden") {
                cvEl.style.visibility = "hidden";
                cvEl.style.opacity = "0";
                cvEl.style.pointerEvents = "none";
              }
            } else {
              if (cvEl.style.visibility !== "visible") {
                cvEl.style.visibility = "visible";
              }
              cvEl.style.opacity = String(Math.min(1, nextO * 1.4));
              cvEl.style.pointerEvents = nextO > 0.15 ? "auto" : "none";
            }
          }
        } else {
          // Vertical stack mode
          const y = r * (stackSpineH + stackGap);
          const slideX = isTarget ? -nextO * 24 : (isHovered ? -12 : 0);
          const transZ = (isTarget ? nextO * 35 : 0) + (isHovered ? 16 : 0) - Math.abs(r) * 3;
          const rotX = isTarget ? -8 * nextO : 0;

          el.style.transform = `translate3d(${slideX}px, ${y}px, ${transZ}px) rotateX(${rotX}deg)`;
          el.style.zIndex = String(Math.round(80 - Math.abs(r) * 5 + nextLift * 20));
        }
      }

      if (isMoving) {
        animIdRef.current = requestAnimationFrame((n) => loopFnRef.current(n));
      } else {
        isLoopRunningRef.current = false;
      }
    };

    wakeLoop();
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      isLoopRunningRef.current = false;
    };
  }, [M, orientation, wakeLoop]);

  // ─── Input Handlers: Wheel, Drag & Keyboard ───────────────────────────────
  const handleShelfWheel = (e: React.WheelEvent) => {
    if (detailOpen) return;
    const delta = orientation === "horizontal"
      ? (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY)
      : e.deltaY;

    const isMobile = dimsRef.current.isMobile;
    const step = orientation === "horizontal" ? (isMobile ? 120 : 80) : (isMobile ? 38 : 50);

    targetRef.current = clamp(targetRef.current + (delta / step) * 0.5, 0, M - 1);
    wakeLoop();
  };

  const pointerDownCoordRef = useRef({ x: 0, y: 0, time: 0 });
  const hasMovedFarRef = useRef(false);

  const handleShelfPointerDown = (e: React.PointerEvent) => {
    if (detailOpen) return;
    const startCoord = orientation === "horizontal" ? e.clientX : e.clientY;
    pointerDownCoordRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    hasMovedFarRef.current = false;
    dragStartRef.current = { pos: startCoord, target: targetRef.current };
    isDraggingRef.current = false;
    wakeLoop();

    const handlePointerMoveDrag = (ev: PointerEvent) => {
      const dx = ev.clientX - pointerDownCoordRef.current.x;
      const dy = ev.clientY - pointerDownCoordRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 8) {
        hasMovedFarRef.current = true;
        isDraggingRef.current = true;
        const currentCoord = orientation === "horizontal" ? ev.clientX : ev.clientY;
        const delta = currentCoord - dragStartRef.current.pos;
        const isMobile = dimsRef.current.isMobile;
        const step = orientation === "horizontal" ? (isMobile ? 120 : 80) : (isMobile ? 38 : 50);
        targetRef.current = clamp(dragStartRef.current.target - delta / step, 0, M - 1);
        wakeLoop();
      }
    };

    const handlePointerUpDrag = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", handlePointerMoveDrag);
      window.removeEventListener("pointerup", handlePointerUpDrag);
      window.removeEventListener("pointercancel", handlePointerUpDrag);

      const dt = Date.now() - pointerDownCoordRef.current.time;
      const dist = Math.hypot(
        ev.clientX - pointerDownCoordRef.current.x,
        ev.clientY - pointerDownCoordRef.current.y
      );

      // Reliable click/tap detection on book elements
      if (!hasMovedFarRef.current && dist < 10 && dt < 600) {
        const target = ev.target as HTMLElement | null;
        const bookEl = target?.closest("[data-book-idx]") as HTMLElement | null;
        if (bookEl) {
          const rawIdx = bookEl.getAttribute("data-book-idx");
          if (rawIdx !== null) {
            const idx = parseInt(rawIdx, 10);
            if (!isNaN(idx) && cohortBooks[idx]) {
              if (target?.closest(".cv")) {
                openDetail(cohortBooks[idx]);
              } else {
                handleBookClick(idx);
              }
            }
          }
        }
      }

      setTimeout(() => {
        isDraggingRef.current = false;
        hasMovedFarRef.current = false;
      }, 50);
      wakeLoop();
    };

    window.addEventListener("pointermove", handlePointerMoveDrag, { passive: true });
    window.addEventListener("pointerup", handlePointerUpDrag);
    window.addEventListener("pointercancel", handlePointerUpDrag);
  };

  const handleBookClick = useCallback((idx: number) => {
    const book = cohortBooks[idx];
    if (!book) return;

    // Roll open this scholar book preview on the 3D shelf (revealing the cover card & Open Dossier button)
    activeIdxRef.current = idx;
    setActiveIdx(idx);
    targetRef.current = idx;
    wakeLoop();

    setDossierBook(book);
  }, [cohortBooks, wakeLoop]);

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
        wakeLoop();
        return;
      }

      if (orientation === "horizontal") {
        if (e.key === "ArrowLeft") {
          const nextIdx = activeIdxRef.current === null
            ? Math.max(0, Math.floor((M - 1) / 2) - 1)
            : clamp(activeIdxRef.current - 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          wakeLoop();
        } else if (e.key === "ArrowRight") {
          const nextIdx = activeIdxRef.current === null
            ? Math.min(M - 1, Math.ceil((M - 1) / 2) + 1)
            : clamp(activeIdxRef.current + 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          wakeLoop();
        } else if (e.key === "Enter" && activeIdxRef.current !== null && cohortBooks[activeIdxRef.current]) {
          openDetail(cohortBooks[activeIdxRef.current]);
        }
      } else {
        if (e.key === "ArrowUp") {
          const nextIdx = activeIdxRef.current === null
            ? Math.max(0, Math.floor((M - 1) / 2) - 1)
            : clamp(activeIdxRef.current - 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          wakeLoop();
        } else if (e.key === "ArrowDown") {
          const nextIdx = activeIdxRef.current === null
            ? Math.min(M - 1, Math.ceil((M - 1) / 2) + 1)
            : clamp(activeIdxRef.current + 1, 0, M - 1);
          activeIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          targetRef.current = nextIdx;
          wakeLoop();
        } else if (e.key === "Enter" && activeIdxRef.current !== null && cohortBooks[activeIdxRef.current]) {
          openDetail(cohortBooks[activeIdxRef.current]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailOpen, orientation, M, cohortBooks, openDetail, closeDetail, wakeLoop]);

  const activeBook = activeIdx !== null ? cohortBooks[activeIdx] : null;
  const activeTheme = themeStyles[activeBook?.theme || "cobalt"];

  return (
    <div className="flex flex-col lg:flex-row h-screen h-[100dvh] w-full overflow-hidden bg-[#EDEBE6] text-[#141414] font-['Inter_Tight',sans-serif]">
      {/* Desktop Slim Sidebar (lg and up) - hidden on mobile so we don't have duplicate top bars */}
      <SiteHeader hideMobile />

      {/* Main Center Canvas for 3D Shelf / Stack */}
      <div className="relative flex-1 min-w-0 min-h-0 w-full h-full overflow-hidden select-none flex flex-col justify-between">
        {/* Paper Grain Overlay - Hidden on mobile phones to prevent GPU rasterization bottleneck */}
        <div
          className="fixed inset-0 z-10 pointer-events-none mix-blend-multiply opacity-55 hidden sm:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 1. Shelf Header Bar */}
        <header className="relative z-30 h-14 sm:h-[68px] px-3 sm:px-8 grid grid-cols-[auto_1fr_auto] items-center border-b border-[rgba(20,20,20,0.1)] bg-[#EDEBE6]/90 backdrop-blur-xs">
          {/* Back Action */}
          <div className="flex items-center gap-2">
            {activeIdx !== null ? (
              <button
                type="button"
                onClick={() => {
                  activeIdxRef.current = null;
                  setActiveIdx(null);
                  targetRef.current = Math.max(0, (M - 1) / 2);
                  wakeLoop();
                }}
                className="inline-flex items-center gap-1.5 h-7 sm:h-[29px] px-2.5 rounded-xs border border-[rgba(20,20,20,0.85)] text-xs font-semibold tracking-wide text-[#141414] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors cursor-pointer"
                title="Back to Scholars Overview"
              >
                <ArrowLeft size={13} aria-hidden />
                <span>Back</span>
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 h-7 sm:h-[29px] px-2.5 rounded-xs border border-[rgba(20,20,20,0.85)] text-xs font-semibold tracking-wide text-[#141414] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors"
                title="Back to Home"
              >
                <ArrowLeft size={13} aria-hidden />
                <span>Back</span>
              </Link>
            )}
          </div>

          {/* Center Title */}
          <div className="flex flex-col items-center justify-center text-center px-1">
            <span className="font-['Newsreader',serif] font-bold text-base sm:text-2xl tracking-tight text-[#143B82] leading-tight">
              IIST Manufacturing Technology
            </span>
            <span className="text-[8px] sm:text-[9.5px] font-semibold tracking-wider text-[#6D6A63] hidden xs:block">
              Department of Aerospace Engineering · Scholar Archive
            </span>
          </div>

          {/* Right Action: Shelf / Stack Toggle + Translation */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3">
            <div className="inline-flex items-center p-0.5 rounded border border-[rgba(20,20,20,0.85)] bg-white/60 shadow-xs">
              <button
                type="button"
                onClick={() => setOrientation("horizontal")}
                className={[
                  "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer",
                  orientation === "horizontal"
                    ? "bg-[#143B82] text-white rounded-xs shadow-xs font-semibold"
                    : "text-[#6D6A63] hover:text-[#141414]",
                ].join(" ")}
                title="Horizontal Standing Shelf View"
              >
                <Columns size={12} aria-hidden />
                <span className="hidden sm:inline">Shelf</span>
              </button>

              <button
                type="button"
                onClick={() => setOrientation("vertical")}
                className={[
                  "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer",
                  orientation === "vertical"
                    ? "bg-[#143B82] text-white rounded-xs shadow-xs font-semibold"
                    : "text-[#6D6A63] hover:text-[#141414]",
                ].join(" ")}
                title="Vertical Stack View"
              >
                <Rows size={12} aria-hidden />
                <span className="hidden sm:inline">Stack</span>
              </button>
            </div>

            <IndicTranslate />
          </div>
        </header>

        {/* 2. Cohort Tabs */}
        <nav
          aria-label="Cohort Batches"
          className="relative z-30 w-full flex flex-col items-center justify-center pt-2 pb-1 gap-1 px-2"
        >
          <div className="w-full max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex justify-start sm:justify-center py-0.5">
            <div
              ref={tabsContainerRef}
              className="relative inline-flex items-center bg-[#EDEBE6] border border-[rgba(20,20,20,0.85)] rounded-xs overflow-hidden shadow-xs shrink-0 mx-auto"
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
                      "relative z-10 h-[29px] px-3 border-r last:border-r-0 border-[rgba(20,20,20,0.25)] text-xs font-medium tracking-wide transition-colors duration-250 select-none whitespace-nowrap cursor-pointer",
                      isActive ? "text-white font-bold" : "text-[#141414] hover:bg-[#141414]/8",
                    ].join(" ")}
                  >
                    <span>{tab.label}</span>
                    <span className={`ml-1 text-[10px] font-mono opacity-80 ${isActive ? "text-white/80" : "text-[#6D6A63]"}`}>
                      ({getCohortBooks(tab.id).length})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6D6A63]">
            <span className="size-1.5 rounded-full bg-[#143B82]" />
            <span>{currentTab.statusText}</span>
          </div>
        </nav>

        {/* 3. The 3D Stage */}
        <section
          aria-label="Archival book shelf presentation"
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
          {/* Centered zero-size Stage Origin */}
          <div
            ref={stageRef}
            className="relative size-0"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              ["--ws" as string]: "82px",
              ["--d" as string]: "290px",
              ["--H" as string]: "520px",
              ["--stack-w" as string]: "680px",
              ["--stack-h" as string]: "54px",
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
                  data-book-idx={v}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  onPointerUp={(e) => {
                    e.stopPropagation();
                    handleBookClick(v);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookClick(v);
                  }}
                  onPointerEnter={() => {
                    hoverRef.current = v;
                    wakeLoop();
                  }}
                  onPointerLeave={() => {
                    if (hoverRef.current === v) {
                      hoverRef.current = -1;
                      wakeLoop();
                    }
                  }}
                  className="tape absolute top-0 left-0 size-0 cursor-pointer select-none transition-shadow"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {orientation === "horizontal" ? (
                    // ══════════════════════════════════════════════════════════
                    // MODE A: HORIZONTAL SHELF (Rolling 3D: Spine to Cover)
                    // ══════════════════════════════════════════════════════════
                    <>
                      {/* Spine Face (.sp) */}
                      <div
                        data-book-idx={v}
                        className="sp absolute rounded-xs overflow-hidden select-none border border-black/70 flex flex-col justify-between p-2 shadow-md transition-opacity cursor-pointer"
                        onPointerDown={(e) => {
                          e.stopPropagation();
                        }}
                        onPointerUp={(e) => {
                          e.stopPropagation();
                          handleBookClick(v);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookClick(v);
                        }}
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
                          <span className="font-mono text-[8px] sm:text-[9px] font-bold px-1 py-0.5 rounded-xs bg-black/30 border border-white/25">
                            {book.roll}
                          </span>
                        </div>

                        {/* Scholar Name (e.g. Pranay P. - Shortened, 90° clockwise) */}
                        <div className="relative z-10 flex-1 flex items-center justify-center my-2 overflow-visible">
                          <span
                            className="font-['Newsreader',serif] font-bold text-[14px] sm:text-[18px] tracking-[0.03em] whitespace-nowrap drop-shadow-md select-none text-center"
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
                          <span className="text-[7.5px] sm:text-[8px] font-bold tracking-wider text-white/90 whitespace-nowrap">
                            AE
                          </span>
                          <span className="px-1 py-0.5 border border-white/40 rounded-xs text-[7px] sm:text-[7.5px] font-mono font-bold bg-black/25 whitespace-nowrap">
                            IIST·MT
                          </span>
                        </div>
                      </div>

                      {/* Cover Face (.cv) - Straight preview when open */}
                      <div
                        data-book-idx={v}
                        className="cv absolute rounded-xs overflow-hidden select-none border border-black/80 flex flex-col justify-between p-3 sm:p-4.5 cursor-pointer shadow-2xl"
                        onPointerDown={(e) => {
                          e.stopPropagation();
                        }}
                        onPointerUp={(e) => {
                          e.stopPropagation();
                          openDetail(book);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(book);
                        }}
                        style={{
                          width: "var(--d)",
                          height: "var(--H)",
                          top: "calc(-1 * var(--H) / 2)",
                          left: "calc(-1 * var(--d) / 2)",
                          transform: "rotateY(90deg) translateZ(calc(var(--ws) / 2))",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          background: theme.coverBg,
                          visibility: "hidden",
                          opacity: 0,
                        }}
                      >
                        {/* Top Header of Cover: SC Code Only */}
                        <div className="relative z-10 flex items-center justify-center border-b border-[rgba(20,20,20,0.45)] pb-2">
                          <span className="font-mono text-[10px] sm:text-xs font-bold px-2.5 py-0.5 border border-[rgba(20,20,20,0.75)] bg-white/90 rounded-xs tracking-wider">
                            {book.roll}
                          </span>
                        </div>

                        {/* Middle: Photo or Technical Blueprint */}
                        <div className="relative z-10 my-auto flex flex-col items-center text-center px-1.5">
                          {book.photoUrl ? (
                            <div className="size-24 sm:size-28 rounded-lg overflow-hidden border border-[rgba(20,20,20,0.8)] shadow-sm bg-white mb-2.5 shrink-0">
                              <img
                                src={book.photoUrl}
                                alt={book.name}
                                className="w-full h-full object-cover object-[center_20%] sm:object-top"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-24 sm:h-28 flex items-center justify-center opacity-75 mb-1.5">
                              <TechnicalScreenprint diagram={book.diagram} color={theme.illustrationColor} className="max-h-full w-auto" />
                            </div>
                          )}

                          <span className="text-[9.5px] sm:text-[11px] font-semibold tracking-wide text-[#6D6A63] leading-snug">
                            {book.specialization}
                          </span>
                          <h2 className="font-['Newsreader',serif] font-bold text-xl sm:text-3xl leading-tight text-[#141414] mt-1">
                            {book.firstName}
                          </h2>
                          <span className="text-[10px] sm:text-[11px] font-mono font-medium block mt-1" style={{ color: theme.bg }}>
                            {book.cohort}
                          </span>
                        </div>

                        {/* Bottom Action Footer: Clean Full-Width Open Dossier Button */}
                        <div className="relative z-10 border-t border-[rgba(20,20,20,0.45)] pt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetail(book);
                            }}
                            onPointerUp={(e) => {
                              e.stopPropagation();
                              openDetail(book);
                            }}
                            className="w-full py-2 font-mono text-[10px] sm:text-xs font-bold text-white rounded-xs shadow-sm cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all text-center whitespace-nowrap"
                            style={{ background: theme.bg }}
                          >
                            Open Dossier →
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // ══════════════════════════════════════════════════════════
                    // MODE B: VERTICAL STACK (Horizontal spine stack)
                    // ══════════════════════════════════════════════════════════
                    <div
                      data-book-idx={v}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                      onPointerUp={(e) => {
                        e.stopPropagation();
                        handleBookClick(v);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookClick(v);
                      }}
                      className={[
                        "sp absolute rounded-xs overflow-hidden select-none border border-black/70 flex items-center justify-between shadow-md hover:brightness-105 transition-all cursor-pointer",
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
                            M <= 5 ? "text-xs px-1.5 py-0.5" : M <= 8 ? "text-[10px] px-1 py-0.5" : "text-[9px] px-1 py-0.5",
                          ].join(" ")}
                        >
                          {book.roll}
                        </span>
                      </div>

                      {/* Shortened Name across the horizontal spine */}
                      <div className="relative z-10 flex-1 px-3 text-center overflow-hidden">
                        <span
                          className={[
                            "font-['Newsreader',serif] font-bold tracking-wide whitespace-nowrap text-white block truncate",
                            M <= 5 ? "text-[17px] sm:text-[20px]" : M <= 8 ? "text-[15px] sm:text-[17px]" : "text-[13px] sm:text-[14.5px]",
                          ].join(" ")}
                          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7)" }}
                        >
                          {book.shortName}
                        </span>
                      </div>

                      {/* Right Department & Full Specialization Badge */}
                      <div className="relative z-10 flex items-center gap-2.5 shrink-0">
                        <span
                          className={[
                            "font-mono text-white/90 hidden sm:inline whitespace-nowrap",
                            M <= 5 ? "text-[11px]" : M <= 8 ? "text-[10px]" : "text-[9px]",
                          ].join(" ")}
                        >
                          {book.specialization}
                        </span>
                        <span
                          className={[
                            "border border-white/40 rounded-xs font-mono font-bold bg-black/25",
                            M <= 5 ? "text-[10px] px-2 py-0.5" : M <= 8 ? "text-[9px] px-1.5 py-0.5" : "text-[8px] px-1 py-0.5",
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

        {/* 4. Bottom Dynamic Scholar Caption (Pure React, zero lingering DOM nodes) */}
        <div
          aria-live="polite"
          className="relative z-20 flex flex-col items-center text-center gap-0.5 sm:gap-1 pb-1 sm:pb-3 pointer-events-auto px-4"
        >
          <div className="h-7 sm:h-8 flex items-center justify-center font-['Newsreader',serif] font-bold text-lg sm:text-2xl leading-tight text-[#141414]">
            <span>{activeBook ? activeBook.name : "IIST Manufacturing Technology"}</span>
          </div>

          <div
            className="h-4 sm:h-5 flex items-center justify-center text-xs font-semibold tracking-wide"
            style={{ color: activeTheme.bg }}
          >
            <span>
              {activeBook
                ? (activeBook.graduatedNote
                    ? `${activeBook.roll} · ${activeBook.specialization} · ${activeBook.graduatedNote}`
                    : `${activeBook.roll} · ${activeBook.specialization}`)
                : `${currentTab.label} · Aerospace Manufacturing Scholars`}
            </span>
          </div>

          <div className="h-4 sm:h-5 flex items-center justify-center text-xs font-mono text-[#6D6A63]">
            <span>
              {activeIdx !== null && activeBook
                ? `${activeBook.cohort} · Profile ${activeIdx + 1} of ${M} · Click to view full dossier`
                : `Select any book to open dossier · ${M} profiles archived`}
            </span>
          </div>
        </div>

        {/* 5. Navigation Arrows */}
        {orientation === "horizontal" ? (
          <>
            <button
              type="button"
              aria-label="Previous scholar"
              disabled={activeIdx === 0}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.max(0, Math.floor((M - 1) / 2) - 1)
                  : clamp(activeIdx - 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                wakeLoop();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm rounded-xs"
              title="Previous Book (Arrow Left)"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              aria-label="Next scholar"
              disabled={activeIdx === M - 1}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.min(M - 1, Math.ceil((M - 1) / 2) + 1)
                  : clamp(activeIdx + 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                wakeLoop();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm rounded-xs"
              title="Next Book (Arrow Right)"
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
                  ? Math.max(0, Math.floor((M - 1) / 2) - 1)
                  : clamp(activeIdx - 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                wakeLoop();
              }}
              className="absolute right-2 sm:right-6 top-[38%] -translate-y-1/2 z-30 size-9 sm:size-10 flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm rounded-xs"
              title="Previous Book (Arrow Up)"
            >
              <ArrowUp size={15} />
            </button>

            <button
              type="button"
              aria-label="Next scholar in stack"
              disabled={activeIdx === M - 1}
              onClick={() => {
                const nextIdx = activeIdx === null
                  ? Math.min(M - 1, Math.ceil((M - 1) / 2) + 1)
                  : clamp(activeIdx + 1, 0, M - 1);
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
                targetRef.current = nextIdx;
                wakeLoop();
              }}
              className="absolute right-2 sm:right-6 top-[62%] -translate-y-1/2 z-30 size-9 sm:size-10 flex items-center justify-center border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-sm rounded-xs"
              title="Next Book (Arrow Down)"
            >
              <ArrowDown size={15} />
            </button>
          </>
        )}

        {/* 6. Bottom Bar */}
        <footer className="relative z-30 h-10 sm:h-[46px] px-3 sm:px-8 flex items-center justify-between border-t border-[rgba(20,20,20,0.1)] text-xs font-medium text-[#6D6A63]">
          <span className="hidden xs:inline">© IIST Aerospace Engineering</span>
          <span className="xs:hidden">© IIST MT</span>

          <div className="flex items-center gap-3">
            {activeIdx !== null && activeBook ? (
              <button
                type="button"
                onClick={() => {
                  setDossierBook(activeBook);
                  setDetailOpen(true);
                }}
                className="px-3.5 py-1.5 rounded bg-[#143B82] text-white text-xs font-semibold hover:bg-[#0E2A60] transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <span className="hidden sm:inline">Open Full Dossier ({activeBook.name}) →</span>
                <span className="sm:hidden">Open Dossier →</span>
              </button>
            ) : (
              <span className="text-xs text-[#6D6A63]">Select any scholar book to inspect</span>
            )}
          </div>
        </footer>
      </div>

      {/* 7. Comprehensive Scholar Dossier Modal (Pure React, 100% Safari/iOS/Android compatible) */}
      {detailOpen && dossierBook && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${dossierBook.name} Dossier`}
          className="fixed inset-0 z-[99999] bg-[#F4F2ED] text-[#141414] overflow-y-auto animate-[fadeIn_0.2s_ease-out]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Modal Top Bar */}
          <header className="sticky top-0 inset-x-0 h-14 bg-[#F4F2ED]/95 backdrop-blur-md border-b border-[rgba(20,20,20,0.12)] px-4 sm:px-8 flex items-center justify-between z-30 shadow-xs">
            <button
              type="button"
              onClick={closeDetail}
              className="inline-flex items-center gap-1.5 h-8 px-3 border border-[rgba(20,20,20,0.85)] text-xs font-semibold tracking-wide bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors cursor-pointer rounded-xs"
            >
              <ArrowLeft size={13} aria-hidden />
              <span>Back</span>
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="font-['Newsreader',serif] font-bold text-sm sm:text-base text-[#143B82] leading-tight">
                IIST Manufacturing Technology
              </span>
              <span className="text-[10px] font-mono tracking-wide text-[#6D6A63]">
                Scholar Archive Record
              </span>
            </div>

            <Link
              href={`/people/${dossierBook.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#143B82] hover:underline underline-offset-4"
            >
              <span className="hidden sm:inline">Full Profile Page</span>
              <ExternalLink size={13} />
            </Link>
          </header>

          {/* Modal Main Content */}
          <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
            {/* Left Column: Bio, Credentials & Actions */}
            <div className="flex flex-col gap-5">
              {/* Profile Header */}
              <div className="flex items-start gap-4 sm:gap-5">
                {dossierBook.photoUrl ? (
                  <div className="w-24 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden border border-[rgba(20,20,20,0.85)] shadow-md shrink-0 bg-white">
                    <img
                      src={dossierBook.photoUrl}
                      alt={dossierBook.name}
                      className="w-full h-full object-cover object-[center_20%] sm:object-top"
                    />
                  </div>
                ) : (
                  <div
                    className="w-24 sm:w-32 aspect-[3/4] rounded-xl border border-[rgba(20,20,20,0.85)] shadow-md shrink-0 flex items-center justify-center font-bold text-white text-2xl select-none"
                    style={{ background: themeStyles[dossierBook.theme || "cobalt"].bg }}
                  >
                    {dossierBook.shortName.slice(0, 2)}
                  </div>
                )}

                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className="inline-block text-xs font-semibold font-mono tracking-wider"
                    style={{ color: themeStyles[dossierBook.theme || "cobalt"].bg }}
                  >
                    {dossierBook.roll} · {dossierBook.cohort}
                  </span>
                  <h1 className="font-['Newsreader',serif] font-bold text-2xl sm:text-4xl text-[#141414] leading-tight">
                    {dossierBook.name}
                  </h1>
                  <span className="text-xs sm:text-sm font-medium text-[#6D6A63]">
                    {dossierBook.role} · {dossierBook.specialization}
                  </span>

                  {dossierBook.placedAt && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold w-fit">
                      <span>🚀 Career Destination:</span>
                      <span className="font-bold">{dossierBook.placedAt}</span>
                      {dossierBook.placedRole && <span className="opacity-80 font-normal">({dossierBook.placedRole})</span>}
                    </div>
                  )}

                  {dossierBook.graduatedNote && (
                    <div className="mt-1 text-xs text-[#143B82] font-mono font-semibold">
                      🎓 {dossierBook.graduatedNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Scholar Bio Synopsis */}
              <div className="border-t border-[rgba(20,20,20,0.1)] pt-4">
                <h3 className="text-xs font-semibold text-[#6D6A63] font-mono tracking-wider mb-2">
                  Research Synopsis & Background
                </h3>
                <div className="space-y-3 font-['Newsreader',serif] text-base leading-relaxed text-[#202020] text-justify">
                  {dossierBook.synopsis.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Research Specializations */}
              {dossierBook.researchInterests && dossierBook.researchInterests.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-[#6D6A63] font-mono tracking-wider mb-2">
                    Research Specializations
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {dossierBook.researchInterests.map((ri) => (
                      <span
                        key={ri}
                        className="px-2.5 py-1 rounded-xs bg-[#143B82]/10 border border-[#143B82]/30 text-[#143B82] font-medium text-xs"
                      >
                        {ri}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-xs font-semibold text-[#6D6A63] font-mono tracking-wider mb-2">
                  Core Competencies & Tools
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {dossierBook.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[rgba(20,20,20,0.4)] px-2.5 py-1 text-xs font-medium bg-white/70 rounded-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Applied Engineering, Thesis & Internship Projects */}
              {dossierBook.projectDetails && dossierBook.projectDetails.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-[#6D6A63] font-mono tracking-wider mb-2">
                    Key Thesis, Internships & Lab Projects
                  </h3>
                  <div className="flex flex-col gap-2">
                    {dossierBook.projectDetails.map((proj) => (
                      <div key={proj.title} className="p-3 rounded border border-[rgba(20,20,20,0.15)] bg-white/60">
                        <span className="font-['Newsreader',serif] font-bold text-sm text-[#141414] block">
                          {proj.title}
                        </span>
                        <p className="text-xs text-[#505050] mt-1 leading-relaxed">
                          {proj.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-t border-[rgba(20,20,20,0.1)] pt-5 flex flex-wrap gap-3">
                <Link
                  href={`/people/${dossierBook.slug}`}
                  className="inline-flex items-center gap-2 h-10 px-5 text-white text-xs font-bold tracking-wide rounded-xs shadow-sm hover:brightness-110 transition-all cursor-pointer"
                  style={{ background: themeStyles[dossierBook.theme || "cobalt"].bg }}
                >
                  <span>Full Profile Page</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={`mailto:${dossierBook.officialEmail}`}
                  className="inline-flex items-center gap-2 h-10 px-4 border border-[rgba(20,20,20,0.85)] bg-white text-[#141414] text-xs font-medium hover:bg-[#141414] hover:text-[#EDEBE6] transition-all rounded-xs cursor-pointer"
                >
                  <Mail size={14} />
                  <span>Contact Email</span>
                </a>

                {dossierBook.github && (
                  <a
                    href={dossierBook.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-4 border border-[rgba(20,20,20,0.85)] bg-white text-[#141414] text-xs font-semibold hover:bg-[#141414] hover:text-[#EDEBE6] transition-all rounded-xs cursor-pointer shadow-xs"
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}

                {dossierBook.resumeUrl && (
                  <a
                    href={formatResumeUrl(dossierBook.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-4 border border-[rgba(20,20,20,0.85)] bg-white text-[#143B82] text-xs font-semibold hover:bg-[#141414] hover:text-[#EDEBE6] transition-all rounded-xs cursor-pointer shadow-xs"
                  >
                    <FileText size={14} />
                    <span>Resume (PDF)</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Archival Technical Blueprint Schematic Card */}
            <div className="flex flex-col items-center justify-center p-6 border border-[rgba(20,20,20,0.2)] bg-[#EDEBE6] rounded-xl shadow-inner">
              <div className="w-full max-w-[340px] aspect-[280/340] border border-[rgba(20,20,20,0.3)] bg-white p-4 shadow-md rounded-xs flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[rgba(20,20,20,0.15)] pb-1.5 font-mono text-[9px] text-[#6D6A63]">
                  <span>IIST Archives · MT</span>
                  <span>{dossierBook.roll}</span>
                </div>

                <div className="my-auto flex items-center justify-center py-2">
                  <TechnicalScreenprint
                    diagram={dossierBook.diagram}
                    color={themeStyles[dossierBook.theme || "cobalt"].illustrationColor}
                    className="w-full h-auto max-h-[220px]"
                  />
                </div>

                <div className="border-t border-[rgba(20,20,20,0.15)] pt-1.5 flex items-center justify-between gap-2 font-mono text-[9px] text-[#6D6A63]">
                  <span className="truncate">{dossierBook.specialization}</span>
                  <span className="font-bold shrink-0" style={{ color: themeStyles[dossierBook.theme || "cobalt"].bg }}>
                    Archive Record
                  </span>
                </div>
              </div>

              <span className="mt-3 text-[11px] font-mono text-[#6D6A63] text-center">
                Aerospace Engineering Archival Dossier · Indian Institute of Space Science and Technology
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
