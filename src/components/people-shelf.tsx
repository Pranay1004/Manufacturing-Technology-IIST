"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, ExternalLink, Mail, X } from "lucide-react";
import { people, type Person } from "@/lib/data";

// ─── Color & Timing Tokens (Exact Prompt Specification) ─────────────────────
// --paper:  #EDEBE6 (Warm off-white sheet of paper)
// --sheet:  #F4F2ED (Detail sheet background)
// --ink:    #141414 (All text, borders, cursor ring)
// --muted:  #6D6A63 (Detail meta line and italic credit)
// --cobalt: #1F3FB0 (Logo, tab indicator, subtitles, play ring, OPEN cursor, action button)
// --rule:   rgba(20,20,20,.9) (1px borders of every boxed label)
// --ease:   cubic-bezier(.2,.8,.2,1)

interface ScholarTapeItem {
  id: string;
  slug: string;
  name: string;
  romaji: string;
  kanji: string;
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
  colorScheme: "cobalt" | "vermilion" | "amber" | "forest";
  diagramType: "additive" | "turbine" | "composite" | "cnc" | "metrology" | "lattice";
}

const colorMap = {
  cobalt: { primary: "#1F3FB0", accent: "#E5ECF6", line: "#1F3FB0" },
  vermilion: { primary: "#C43B26", accent: "#F9ECE8", line: "#C43B26" },
  amber: { primary: "#B9682E", accent: "#FAF1E8", line: "#B9682E" },
  forest: { primary: "#21684B", accent: "#EAF3EE", line: "#21684B" },
};

// Map real profiles to curated 12-item endless shelf tapes
function createTapeData(): ScholarTapeItem[] {
  // 12 key scholars across cohorts (Middle index 5 is Pranay Kumar Pandey SC25M147)
  const selectedSlugs = [
    "sooraj-v-s",              // 0: Faculty Coordinator
    "chakravarthy-p",          // 1: Faculty Metallurgy
    "arun-binu",               // 2: 2024-2026 Outgoing
    "pushpal-das",             // 3: 2024-2026 Outgoing
    "aniket-balaji-parnale",   // 4: 2025-2027 Current
    "pranay-kumar-pandey",     // 5: 2025-2027 Current (Default active on open)
    "juveriya-sayyed",         // 6: 2025-2027 Current
    "lakshmi-k",               // 7: 2025-2027 Current
    "shivam-ajay-saraswat",    // 8: 2025-2027 Current
    "bishodeep-sardar",        // 9: 2025-2027 Current
    "abdullah-rishad",         // 10: 2025-2027 Current
    "preeti",                  // 11: PhD Scholar
  ];

  const diagrams: ScholarTapeItem["diagramType"][] = [
    "turbine", "cnc", "composite", "additive", "metrology",
    "additive", "lattice", "composite", "cnc", "turbine", "metrology", "lattice"
  ];

  const colors: ScholarTapeItem["colorScheme"][] = [
    "cobalt", "forest", "amber", "vermilion", "cobalt",
    "cobalt", "amber", "forest", "vermilion", "cobalt", "forest", "amber"
  ];

  const kanjiMap: Record<string, { romaji: string; kanji: string; roll: string }> = {
    "sooraj-v-s": { romaji: "SOORAJ V. S", kanji: "積層・精密加工", roll: "FAC-01" },
    "chakravarthy-p": { romaji: "CHAKRAVARTHY P", kanji: "金属・塑性加工", roll: "FAC-02" },
    "arun-binu": { romaji: "ARUN BINU", kanji: "複合材・接合", roll: "SC24M021" },
    "pushpal-das": { romaji: "PUSHPAL DAS", kanji: "超合金・冶金", roll: "SC24M022" },
    "aniket-balaji-parnale": { romaji: "ANIKET B. PARNALE", kanji: "積層・CAD/CAM", roll: "SC25M141" },
    "pranay-kumar-pandey": { romaji: "PRANAY K. PANDEY", kanji: "宇宙工学・計算工学", roll: "SC25M147" },
    "juveriya-sayyed": { romaji: "JUVERIYA SAYYED", kanji: "微細加工・検査", roll: "SC25M143" },
    "lakshmi-k": { romaji: "LAKSHMI K", kanji: "品質工学・最適化", roll: "SC25M144" },
    "shivam-ajay-saraswat": { romaji: "SHIVAM A. SARASWAT", kanji: "切削力学・CNC", roll: "SC25M145" },
    "bishodeep-sardar": { romaji: "BISHODEEP SARDAR", kanji: "溶接・熱影響部", roll: "SC25M146" },
    "abdullah-rishad": { romaji: "ABDULLAH RISHAD", kanji: "スマート製造", roll: "SC25M179" },
    "preeti": { romaji: "PREETI", kanji: "先端材料・研究", roll: "PHD-2025" },
  };

  return selectedSlugs.map((slug, idx) => {
    const p = people.find((item) => item.slug === slug) || people[0];
    const k = kanjiMap[slug] || { romaji: p.name.toUpperCase(), kanji: "製造技術", roll: p.role };
    return {
      id: slug,
      slug: p.slug,
      name: p.name,
      romaji: k.romaji,
      kanji: k.kanji,
      cohort: p.cohort ?? (p.type === "faculty" ? "FACULTY" : p.admissionYear ? `PHD ${p.admissionYear}` : "2025-2027"),
      roll: k.roll,
      specialization: p.specialization,
      role: p.role,
      synopsis: p.synopsis,
      skills: p.skills,
      projects: p.projects.map((proj) => proj.title),
      resumeUrl: p.resumeUrl,
      officialEmail: p.officialEmail,
      placedAt: p.placedAt,
      colorScheme: colors[idx % colors.length],
      diagramType: diagrams[idx % diagrams.length],
    };
  });
}

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

// Inline Technical Vector Diagram for Box Cover and Detail Poster
function TechnicalDiagram({
  type,
  color,
  className = "",
}: {
  type: ScholarTapeItem["diagramType"];
  color: string;
  className?: string;
}) {
  if (type === "additive") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        {/* Powder Bed Laser Build Pattern */}
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.85">
          <rect x="20" y="20" width="240" height="300" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
          <path d="M 40 280 L 240 280 M 40 250 L 240 250 M 40 220 L 240 220 M 40 190 L 240 190 M 40 160 L 240 160" opacity="0.4" />
          {/* Sinuous laser hatch path */}
          <path d="M 50 160 Q 90 120 140 160 T 230 160 L 230 130 Q 180 90 140 130 T 50 130 Z" fill={color} fillOpacity="0.12" />
          <polyline points="50,160 80,110 110,160 140,110 170,160 200,110 230,160" strokeWidth="1.8" />
          {/* Laser beam & focus cone */}
          <line x1="140" y1="30" x2="140" y2="110" stroke={color} strokeWidth="2" />
          <polygon points="135,110 145,110 140,120" fill={color} />
          <circle cx="140" cy="110" r="14" strokeDasharray="2 2" strokeWidth="0.8" />
          <circle cx="140" cy="110" r="4" fill={color} />
          {/* Coordinate callout */}
          <text x="35" y="45" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">L-PBF :: λ=1064nm</text>
          <text x="35" y="58" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">P=280W · V=900mm/s</text>
        </g>
      </svg>
    );
  }

  if (type === "turbine") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.85">
          <ellipse cx="140" cy="170" rx="95" ry="135" strokeDasharray="3 3" opacity="0.3" />
          {/* Cambered Airfoil Profile */}
          <path
            d="M 60 220 C 70 140, 120 80, 200 60 C 225 100, 220 180, 180 240 C 130 260, 80 250, 60 220 Z"
            fill={color}
            fillOpacity="0.1"
            strokeWidth="2"
          />
          {/* Internal cooling conduits */}
          <circle cx="110" cy="180" r="14" strokeWidth="1.5" />
          <circle cx="150" cy="150" r="18" strokeWidth="1.5" />
          <circle cx="180" cy="120" r="10" strokeWidth="1.5" />
          <line x1="60" y1="220" x2="200" y2="60" strokeDasharray="4 4" strokeWidth="0.8" opacity="0.5" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">AIRFOIL :: Ti-6Al-4V</text>
          <text x="35" y="58" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">TURBINE BLADE SECTION</text>
        </g>
      </svg>
    );
  }

  if (type === "composite") {
    return (
      <svg viewBox="0 0 280 340" className={className} aria-hidden>
        <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.85">
          {/* Layered Orthotropic Ply Stacking */}
          <rect x="35" y="70" width="210" height="40" fill={color} fillOpacity="0.15" />
          <line x1="35" y1="90" x2="245" y2="90" strokeDasharray="2 2" />
          <rect x="35" y="125" width="210" height="40" fill={color} fillOpacity="0.25" />
          <path d="M 45 125 L 85 165 M 95 125 L 135 165 M 145 125 L 185 165 M 195 125 L 235 165" />
          <rect x="35" y="180" width="210" height="40" fill={color} fillOpacity="0.15" />
          <rect x="35" y="235" width="210" height="40" fill={color} fillOpacity="0.35" />
          <path d="M 85 235 L 45 275 M 135 235 L 95 275 M 185 235 L 145 275 M 235 235 L 195 275" />
          <text x="35" y="45" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">LAYUP :: [0/45/90/-45]s</text>
          <text x="35" y="58" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">CARBON FIBRE REINFORCED</text>
        </g>
      </svg>
    );
  }

  // Default CNC / Metrology / Lattice CAD
  return (
    <svg viewBox="0 0 280 340" className={className} aria-hidden>
      <g stroke={color} strokeWidth="1.2" fill="none" opacity="0.85">
        <circle cx="140" cy="170" r="95" strokeDasharray="4 4" opacity="0.35" />
        <polygon points="140,80 220,130 220,210 140,260 60,210 60,130" strokeWidth="2" fill={color} fillOpacity="0.1" />
        <line x1="140" y1="80" x2="140" y2="260" strokeDasharray="3 3" opacity="0.5" />
        <line x1="60" y1="130" x2="220" y2="210" strokeDasharray="3 3" opacity="0.5" />
        <line x1="60" y1="210" x2="220" y2="130" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="140" cy="170" r="30" strokeWidth="1.5" />
        <text x="35" y="45" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">METROLOGY :: CAD/CAM</text>
        <text x="35" y="58" fontFamily="monospace" fontSize="8" fill={color} opacity="0.8">PRECISION DATUM AXES</text>
      </g>
    </svg>
  );
}

export function PeopleShelf() {
  const tapes = useMemo(() => createTapeData(), []);
  const N = tapes.length; // 12 items
  const totalTapes = N * 3; // 36 tapes across 3 virtual cycles

  // Physics & Animation State Refs
  const sRef = useRef(17); // Middle copy index 5 (5 + 12 = 17)
  const targetRef = useRef(17);
  const hoverRef = useRef(-1);
  const activeIdxRef = useRef(5);

  const pointerPosRef = useRef({ x: 0, y: 0 });
  const cursorSmoothRef = useRef({ x: 0, y: 0 });
  const tiltRef = useRef({ x: 0, y: 0 });
  const onCoverRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, target: 17 });
  const lastWheelTimeRef = useRef(0);
  const wheelSnapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // UI state for reactive elements
  const [activeTape, setActiveTape] = useState<ScholarTapeItem>(tapes[5]);
  const [activeCohort, setActiveCohort] = useState("2025-27");
  const [detailOpen, setDetailOpen] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "spine" | "btn" | "open">("default");
  const [playRingScale, setPlayRingScale] = useState(1);

  // DOM Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tapeElsRef = useRef<(HTMLDivElement | null)[]>([]);
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

  // Cohort tabs definition
  const cohorts = [
    { label: "ALL / すべて", value: "ALL", targetIdx: 0 },
    { label: "2025-27", value: "2025-27", targetIdx: 5 }, // Pranay SC25M147
    { label: "2024-26", value: "2024-26", targetIdx: 2 }, // Arun Binu SC24M021
    { label: "PhD / 博士", value: "PHD", targetIdx: 11 }, // Preeti
    { label: "FACULTY / 教員", value: "FACULTY", targetIdx: 0 }, // Dr. Sooraj
  ];

  // ─── Swap Caption with Mask Slide ─────────────────────────────────────────
  const swapCaption = useCallback(
    (newTape: ScholarTapeItem, dir: number) => {
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
            { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
          ).onfinish = () => oldSpan.remove();
        }

        container.appendChild(newSpan);
        newSpan.animate(
          [
            { transform: `translateY(${dir * 105}%)` },
            { transform: "translateY(0)" },
          ],
          { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
        );
      };

      slideMask(captionTitleRef.current, newTape.name);
      slideMask(captionSubRef.current, `${newTape.roll} / ${newTape.specialization.toUpperCase()} / ${newTape.kanji}`);
      slideMask(captionYearRef.current, `${newTape.cohort} · IIST AEROSPACE MANUFACTURING`);
    },
    []
  );

  // ─── Update Cohort Tab Highlight ──────────────────────────────────────────
  const updateTabIndicator = useCallback((tape: ScholarTapeItem) => {
    let matchedCohort = "ALL";
    if (tape.cohort.includes("2025")) matchedCohort = "2025-27";
    else if (tape.cohort.includes("2024")) matchedCohort = "2024-26";
    else if (tape.cohort.includes("PHD")) matchedCohort = "PhD / 博士";
    else if (tape.cohort.includes("FACULTY")) matchedCohort = "FACULTY / 教員";
    setActiveCohort(matchedCohort);

    if (!tabsContainerRef.current || !tabIndicatorRef.current) return;
    const buttons = tabsContainerRef.current.querySelectorAll("button");
    buttons.forEach((btn) => {
      const val = btn.getAttribute("data-cohort");
      if (val === matchedCohort) {
        tabIndicatorRef.current!.style.width = `${btn.offsetWidth}px`;
        tabIndicatorRef.current!.style.transform = `translateX(${btn.offsetLeft}px)`;
      }
    });
  }, []);

  // ─── Jump To Index via Shortest Modulo Loop ───────────────────────────────
  const jumpToIndex = useCallback(
    (targetIndexIn12: number) => {
      const currentMod = ((Math.round(targetRef.current) % N) + N) % N;
      let diff = targetIndexIn12 - currentMod;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      targetRef.current = Math.round(targetRef.current) + diff;
    },
    [N]
  );

  // ─── Open Detail Paper Sheet with Ink Bleed Sequence ──────────────────────
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

      // 2. Normalise drift beyond +-4 full loops
      if (sRef.current > N * 2.5) {
        sRef.current -= N;
        targetRef.current -= N;
      } else if (sRef.current < N * 0.5) {
        sRef.current += N;
        targetRef.current += N;
      }

      // 3. Caption Swap Trigger on integer crossover
      const currentActive = Math.round(sRef.current);
      const modActive = ((currentActive % N) + N) % N;
      if (modActive !== activeIdxRef.current) {
        const dir = targetRef.current >= prevS ? 1 : -1;
        activeIdxRef.current = modActive;
        const newTape = tapes[modActive];
        setActiveTape(newTape);
        swapCaption(newTape, dir);
        updateTabIndicator(newTape);
      }

      // 4. Cursor Smoothing
      cursorSmoothRef.current.x += (pointerPosRef.current.x - cursorSmoothRef.current.x) * (1 - Math.exp(-16 * dt));
      cursorSmoothRef.current.y += (pointerPosRef.current.y - cursorSmoothRef.current.y) * (1 - Math.exp(-16 * dt));

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${cursorSmoothRef.current.x}px, ${cursorSmoothRef.current.y}px, 0)`;
      }

      // 5. Measure Responsive Dimensions
      const W = window.innerWidth;
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
      const cx = W / 2;
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
        tiltRef.current.y += ((dxFromCenter / W) * 5 - tiltRef.current.y) * (1 - Math.exp(-7 * dt));
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
        playRingRef.current.style.left = `${W / 2 - 0.5 * d - 6}px`;
        playRingRef.current.style.top = `${cy + 0.36 * H}px`;
      }

      // 8. Transform Each of the 36 Tape Boxes in 3D Stage
      for (let v = 0; v < totalTapes; v++) {
        const el = tapeElsRef.current[v];
        if (!el) continue;

        // Relative index r in range [-18, +18]
        let r = ((v - sRef.current) % totalTapes);
        if (r > totalTapes / 2) r -= totalTapes;
        if (r < -totalTapes / 2) r += totalTapes;

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
  }, [N, tapes, totalTapes, detailOpen, swapCaption, updateTabIndicator]);

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
    let r = ((virtualIdx - sRef.current) % totalTapes);
    if (r > totalTapes / 2) r -= totalTapes;
    if (r < -totalTapes / 2) r += totalTapes;

    if (Math.abs(r) < 0.5) {
      openDetail();
    } else {
      targetRef.current = Math.round(targetRef.current + r);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-[#EDEBE6] text-[#141414] font-['Inter_Tight',sans-serif]"
      style={{
        ["--paper" as string]: "#EDEBE6",
        ["--sheet" as string]: "#F4F2ED",
        ["--ink" as string]: "#141414",
        ["--muted" as string]: "#6D6A63",
        ["--cobalt" as string]: "#1F3FB0",
        ["--rule" as string]: "rgba(20,20,20,.9)",
        ["--ease" as string]: "cubic-bezier(.2,.8,.2,1)",
      }}
    >
      {/* ─── Paper Grain Overlay (Exact Prompt SVG Tile) ───────────────────── */}
      <div
        className="fixed inset-0 z-40 pointer-events-none mix-blend-multiply opacity-55"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── 1. Top Bar ────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 h-[84px] px-8 grid grid-cols-[1fr_auto_1fr] items-center z-30 select-none">
        {/* Left Link */}
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className="inline-flex items-center h-[21px] px-2 border border-[var(--rule)] text-[10.5px] font-semibold tracking-[0.09em] uppercase text-[#141414] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors duration-200"
          >
            ← BACK / 戻る
          </Link>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center justify-center gap-1 text-[#1F3FB0]">
          <span className="font-['Noto_Serif_SC',serif] font-bold text-[22px] tracking-[0.04em]">
            宇宙工学 · 製造技術
          </span>
          <span className="font-['Inter_Tight',sans-serif] font-semibold text-[9px] tracking-[0.34em] pl-[0.34em] uppercase">
            IIST MANUFACTURING TECHNOLOGY
          </span>
        </div>

        {/* Right Label */}
        <div className="flex items-center justify-end">
          <span className="hidden sm:inline-block text-[10.5px] font-semibold tracking-[0.09em] uppercase text-[#141414]">
            SCHOLARS · 2024年〜2028年
          </span>
        </div>
      </header>

      {/* ─── 2. Cohort Tabs ────────────────────────────────────────────────── */}
      <nav
        aria-label="Cohorts"
        className="fixed left-1/2 -translate-x-1/2 z-30 flex items-center"
        style={{
          top: "calc(50% - min(46vh, 31vw)/2 - 86px)",
        }}
      >
        <div
          ref={tabsContainerRef}
          className="relative inline-flex items-center bg-[#EDEBE6]"
        >
          {/* Cobalt Sliding Indicator Block */}
          <div
            ref={tabIndicatorRef}
            className="absolute top-0 bottom-0 bg-[#1F3FB0] transition-all duration-600 ease-[cubic-bezier(.2,.8,.2,1)] z-0 pointer-events-none"
            style={{ width: "80px", transform: "translateX(0px)" }}
          />

          {cohorts.map((tab) => (
            <button
              key={tab.value}
              type="button"
              data-cohort={tab.value}
              onClick={() => jumpToIndex(tab.targetIdx)}
              className={[
                "relative z-10 h-[23px] px-[11px] border border-[var(--rule)] -ml-px first:ml-0 text-[10.5px] font-semibold tracking-[0.09em] uppercase transition-colors duration-450 select-none whitespace-nowrap cursor-pointer",
                activeCohort === tab.value ? "text-white" : "text-[#141414] hover:bg-[#141414]/5",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── 3. The Shelf (3D Stage) ───────────────────────────────────────── */}
      <section
        aria-label="Filmography shelf"
        onPointerDown={handleShelfPointerDown}
        onWheel={handleShelfWheel}
        className="fixed inset-x-0 w-full z-20 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible select-none"
        style={{
          top: "calc(50% - min(46vh, 31vw)/2 - 40px)",
          height: "calc(min(46vh, 31vw) + 80px)",
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
            ["--ws" as string]: "80px",
            ["--d" as string]: "240px",
            ["--H" as string]: "460px",
          }}
        >
          {Array.from({ length: totalTapes }).map((_, v) => {
            const tape = tapes[v % N];
            const colors = colorMap[tape.colorScheme];

            return (
              <div
                key={v}
                ref={(el) => {
                  tapeElsRef.current[v] = el;
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
                  className="sp absolute rounded-[2px] overflow-hidden select-none border border-[rgba(20,20,20,.85)] bg-[#EDEBE6] flex flex-col justify-between p-2 shadow-sm"
                  style={{
                    width: "var(--ws)",
                    height: "var(--H)",
                    top: "calc(-1 * var(--H) / 2)",
                    left: "calc(-1 * var(--ws) / 2)",
                    transform: "translateZ(calc(var(--d) / 2))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Dynamic Shading Overlay */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
                    style={{ opacity: "var(--shade-spine, 0)" }}
                  />

                  {/* Top Badge */}
                  <div className="relative z-10 flex flex-col items-center gap-1 border-b border-[var(--rule)] pb-1.5">
                    <span className="font-mono text-[8px] font-bold tracking-wider text-[#1F3FB0]">
                      {tape.roll}
                    </span>
                    <span className="text-[7px] tracking-widest text-[#6D6A63] uppercase">
                      {tape.cohort.slice(0, 7)}
                    </span>
                  </div>

                  {/* Vertical Condensed Title */}
                  <div className="relative z-10 flex-1 flex items-center justify-center my-3 overflow-hidden">
                    <span
                      className="font-['Newsreader',serif] font-bold text-[14px] sm:text-[16px] tracking-[0.08em] uppercase text-[#141414] whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {tape.name}
                    </span>
                  </div>

                  {/* Bottom IIST / MT Badge */}
                  <div className="relative z-10 flex flex-col items-center gap-1 pt-1.5 border-t border-[var(--rule)]">
                    <span className="border border-[var(--rule)] px-1 py-0.5 text-[8px] font-bold font-mono tracking-widest">
                      IIST
                    </span>
                    <span className="text-[7px] font-bold tracking-widest text-[#1F3FB0]">
                      DOSSIER
                    </span>
                  </div>
                </div>

                {/* ─── Cover Face (.cv) ─────────────────────────────────── */}
                <div
                  className="cv absolute rounded-[2px] overflow-hidden select-none border border-[rgba(20,20,20,.85)] bg-[#FAF8F5] flex flex-col justify-between p-5"
                  style={{
                    width: "var(--d)",
                    height: "var(--H)",
                    top: "calc(-1 * var(--H) / 2)",
                    left: "calc(-1 * var(--d) / 2)",
                    transform: "rotateY(90deg) translateZ(calc(var(--ws) / 2))",
                    backfaceVisibility: "hidden",
                    boxShadow: "0 30px 60px -28px rgba(20,16,10,.55)",
                  }}
                >
                  {/* Dynamic Shading Overlay */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
                    style={{ opacity: "var(--shade-cover, 0)" }}
                  />

                  {/* Background Technical Grid and Vector */}
                  <div className="absolute inset-0 z-0 opacity-80 pointer-events-none flex items-center justify-center p-4">
                    <TechnicalDiagram type={tape.diagramType} color={colors.primary} className="w-full h-auto max-h-[70%]" />
                  </div>

                  {/* Cover Header */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[var(--rule)] pb-2">
                    <span className="font-['Inter_Tight',sans-serif] font-semibold text-[8px] tracking-[0.14em] uppercase text-[#1F3FB0]">
                      AEROSPACE ARCHIVE · IIST
                    </span>
                    <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 border border-[var(--rule)]">
                      {tape.roll}
                    </span>
                  </div>

                  {/* Cover Title Area */}
                  <div className="relative z-10 my-auto">
                    <span className="text-[9px] font-bold tracking-[0.15em] text-[#6D6A63] uppercase block mb-1">
                      {tape.specialization}
                    </span>
                    <h2 className="font-['Newsreader',serif] font-bold text-2xl sm:text-3xl leading-[1.05] tracking-tight text-[#141414]">
                      {tape.name}
                    </h2>
                    <span className="text-[10px] font-semibold tracking-wider text-[#1F3FB0] block mt-2">
                      {tape.kanji}
                    </span>
                  </div>

                  {/* Cover Footer & Badges */}
                  <div className="relative z-10 flex items-center justify-between border-t border-[var(--rule)] pt-2.5">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono uppercase text-[#6D6A63]">COHORT</span>
                      <span className="text-[9px] font-bold text-[#141414]">{tape.cohort}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="border border-[#1F3FB0] bg-[#1F3FB0]/10 text-[#1F3FB0] font-mono text-[8px] px-1.5 py-0.5 font-bold">
                        OPEN
                      </span>
                      <span className="border border-[var(--rule)] text-[8px] font-bold font-mono px-1 py-0.5">
                        SPECIMEN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 4. Play Ring (Dossier Action Button) ───────────────────────────── */}
      <button
        ref={playRingRef}
        type="button"
        aria-label="Open Dossier"
        onClick={openDetail}
        className="fixed z-30 size-[42px] rounded-full border border-[#1F3FB0] bg-[rgba(237,235,230,.75)] text-[#1F3FB0] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 shadow-md backdrop-blur-sm"
        style={{
          transform: `scale(${playRingScale})`,
          transition: "transform 0.2s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <FileText size={18} className="translate-x-px" aria-hidden />
      </button>

      {/* ─── 5. Caption Stack ──────────────────────────────────────────────── */}
      <div
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center gap-2 pointer-events-none w-[min(92vw,760px)]"
        style={{
          top: "calc(50% + min(46vh, 31vw)/2 + 30px)",
        }}
      >
        {/* Title Mask */}
        <div
          ref={captionTitleRef}
          className="overflow-hidden h-[36px] flex items-center justify-center font-['Newsreader',serif] font-normal text-[26px] sm:text-[31px] leading-[1.12] tracking-[-0.01em] text-[#141414]"
        >
          <span>{activeTape.name}</span>
        </div>

        {/* Subtitle Mask */}
        <div
          ref={captionSubRef}
          className="overflow-hidden h-[18px] flex items-center justify-center text-[10.5px] font-semibold tracking-[0.09em] uppercase text-[#1F3FB0]"
        >
          <span>{activeTape.roll} / {activeTape.specialization.toUpperCase()} / {activeTape.kanji}</span>
        </div>

        {/* Year / Meta Mask */}
        <div
          ref={captionYearRef}
          className="overflow-hidden h-[16px] flex items-center justify-center text-[11px] font-medium tracking-[0.08em] text-[#6D6A63]"
        >
          <span>{activeTape.cohort} · IIST AEROSPACE MANUFACTURING</span>
        </div>
      </div>

      {/* ─── 6. Navigation Arrows ──────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="Previous scholar"
        onClick={() => {
          targetRef.current = Math.round(targetRef.current) - 1;
        }}
        className="fixed left-5 z-30 size-[44px] flex items-center justify-center border border-[var(--rule)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors duration-200 cursor-pointer"
        style={{
          top: "calc(50% + min(46vh, 31vw)/2 + 40px)",
        }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M5 1 L1 5 L5 9 M1 5 L17 5" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next scholar"
        onClick={() => {
          targetRef.current = Math.round(targetRef.current) + 1;
        }}
        className="fixed right-5 z-30 size-[44px] flex items-center justify-center border border-[var(--rule)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors duration-200 cursor-pointer"
        style={{
          top: "calc(50% + min(46vh, 31vw)/2 + 40px)",
        }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M13 1 L17 5 L13 9 M17 5 L1 5" />
        </svg>
      </button>

      {/* ─── 7. Footer ─────────────────────────────────────────────────────── */}
      <footer className="fixed bottom-[26px] inset-x-8 z-30 flex items-center justify-between text-[10.5px] font-semibold tracking-[0.09em] uppercase text-[#141414]">
        <span>© IIST AEROSPACE ENGINEERING. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-4">
          <Link href={`/people/${activeTape.slug}`} className="hover:text-[#1F3FB0] underline-offset-2 hover:underline">
            DOSSIER DOSSIER / 詳細
          </Link>
          <Link href="/about" className="hover:text-[#1F3FB0]">
            ABOUT / 概要
          </Link>
        </div>
      </footer>

      {/* ─── 8. Custom Ring Cursor ─────────────────────────────────────────── */}
      <div
        ref={cursorRingRef}
        className={[
          "fixed top-0 left-0 -mt-[29px] -ml-[29px] size-[58px] rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform",
          cursorState === "default" ? "scale-100 border-[1.5px] border-[#141414] bg-transparent" : "",
          cursorState === "spine" ? "scale-75 border-[1.5px] border-[#141414] bg-transparent" : "",
          cursorState === "btn" ? "scale-50 border-[1.5px] border-[#141414] bg-transparent" : "",
          cursorState === "open" ? "scale-[1.75] border-[1.5px] border-[#1F3FB0] bg-[#1F3FB0]" : "",
        ].join(" ")}
      >
        {/* Center Dot */}
        <span
          className={[
            "size-[6px] rounded-full bg-[#141414] transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)]",
            cursorState === "open" || cursorState === "btn" ? "scale-0" : "scale-100",
          ].join(" ")}
        />

        {/* OPEN / 開く Disc Label */}
        <span
          className={[
            "absolute inset-0 flex flex-col items-center justify-center text-white text-[9px] font-semibold tracking-[0.1em] leading-[1.25] transition-transform duration-450 ease-[cubic-bezier(.2,.8,.2,1)] select-none",
            cursorState === "open" ? "scale-100" : "scale-0",
          ].join(" ")}
        >
          <span>OPEN</span>
          <span className="text-[7.5px] opacity-90">開く</span>
        </span>
      </div>

      {/* ─── 9. Opening a Profile: Detail Dialog with SVG Ink Bleed ────────── */}
      <div
        ref={detailDialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${activeTape.name} Dossier`}
        className="fixed inset-0 z-[60] bg-[#F4F2ED] text-[#141414] overflow-y-auto invisible"
        style={{
          padding: "110px 6vw 56px 7vw",
        }}
      >
        {/* Close Button Top Left */}
        <button
          type="button"
          onClick={closeDetail}
          className="fixed top-8 left-8 z-20 inline-flex items-center gap-1.5 h-[31px] px-3 border border-[var(--rule)] text-[10.5px] font-semibold tracking-[0.09em] uppercase hover:bg-[#141414] hover:text-[#EDEBE6] transition-colors duration-200 cursor-pointer"
        >
          <X size={14} aria-hidden />
          CLOSE / 閉じる
        </button>

        {/* Logo Band */}
        <div className="fixed top-8 inset-x-0 h-[84px] pointer-events-none flex flex-col items-center justify-center gap-1 text-[#1F3FB0] z-10">
          <span className="font-['Noto_Serif_SC',serif] font-bold text-[20px] tracking-[0.04em]">
            宇宙工学 · 製造技術
          </span>
          <span className="font-['Inter_Tight',sans-serif] font-semibold text-[8.5px] tracking-[0.34em] uppercase">
            IIST MANUFACTURING TECHNOLOGY
          </span>
        </div>

        {/* Two-Column Grid: Left Content + Right SVG Poster */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-[4vw] items-center min-h-[calc(100vh-170px)]">
          {/* Left Column: Masked Text Lines */}
          <div className="flex flex-col justify-center max-w-[520px] gap-4">
            <div className="detail-mask-line overflow-hidden">
              <span className="inline-block text-[10.5px] font-semibold tracking-[0.12em] uppercase text-[#1F3FB0]">
                {activeTape.roll} / {activeTape.kanji}
              </span>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <h1 className="inline-block font-['Newsreader',serif] font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.025em] text-[#141414]">
                {activeTape.name}
              </h1>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <span className="inline-block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6D6A63]">
                {activeTape.cohort} / {activeTape.specialization.toUpperCase()}
              </span>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <p className="inline-block font-['Newsreader',serif] text-base sm:text-lg leading-[1.55] text-[#141414] max-w-[42ch] text-justify">
                {activeTape.synopsis}
              </p>
            </div>

            {/* Skills & Projects tags */}
            <div className="detail-mask-line overflow-hidden">
              <div className="inline-flex flex-wrap gap-2 pt-1">
                {activeTape.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="border border-[var(--rule)] px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-mask-line overflow-hidden">
              <p className="inline-block font-['Newsreader',serif] italic text-[15px] text-[#6D6A63]">
                M.Tech Manufacturing Technology · Department of Aerospace Engineering. 監督作品
              </p>
            </div>

            {/* Action Buttons */}
            <div className="detail-mask-line overflow-hidden pt-2">
              <div className="inline-flex flex-wrap items-center gap-3">
                <Link
                  href={`/people/${activeTape.slug}`}
                  className="inline-flex items-center gap-2 h-[44px] px-5 border border-[#1F3FB0] bg-[#1F3FB0] text-white text-[11px] font-semibold tracking-[0.1em] uppercase hover:brightness-110 transition-all cursor-pointer shadow-sm"
                >
                  FULL DOSSIER / 詳細
                  <ArrowRight size={14} aria-hidden />
                </Link>

                <a
                  href={`mailto:${activeTape.officialEmail}`}
                  className="inline-flex items-center gap-2 h-[44px] px-5 border border-[var(--rule)] bg-transparent text-[#141414] text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#141414] hover:text-[#EDEBE6] transition-all cursor-pointer"
                >
                  <Mail size={14} aria-hidden />
                  CONTACT / 連絡
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: The Poster with Ragged SVG Ink Bleed Mask */}
          <div className="flex items-center justify-center w-full">
            <div className="relative w-full max-w-[420px] aspect-[474/900] max-h-[78vh] border border-[var(--rule)] shadow-2xl bg-[#EDEBE6] overflow-hidden rounded-[2px]">
              <svg viewBox="0 0 474 900" className="w-full h-full" aria-hidden="true">
                <defs>
                  {/* Ragged Ink Bleed Filter (Exact Prompt Formula) */}
                  <filter id="ink-bleed-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                  </filter>

                  {/* 7 Circle Expanding Ink Mask */}
                  <mask id="ink-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="874" height="1300">
                    <rect x="-200" y="-200" width="874" height="1300" fill="black" />
                    <g filter="url(#ink-bleed-filter)">
                      {/* Blob 1 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[0] = el;
                        }}
                        cx="150"
                        cy="330"
                        r="0"
                        fill="white"
                      />
                      {/* Blob 2 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[1] = el;
                        }}
                        cx="340"
                        cy="600"
                        r="0"
                        fill="white"
                      />
                      {/* Blob 3 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[2] = el;
                        }}
                        cx="250"
                        cy="120"
                        r="0"
                        fill="white"
                      />
                      {/* Blob 4 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[3] = el;
                        }}
                        cx="90"
                        cy="760"
                        r="0"
                        fill="white"
                      />
                      {/* Blob 5 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[4] = el;
                        }}
                        cx="400"
                        cy="250"
                        r="0"
                        fill="white"
                      />
                      {/* Blob 6 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[5] = el;
                        }}
                        cx="260"
                        cy="860"
                        r="0"
                        fill="white"
                      />
                      {/* Blob 7 */}
                      <circle
                        ref={(el) => {
                          inkBlobsRef.current[6] = el;
                        }}
                        cx="230"
                        cy="470"
                        r="0"
                        fill="white"
                      />
                    </g>
                  </mask>
                </defs>

                {/* Poster Content Subject to Ink Mask */}
                <g mask="url(#ink-mask)">
                  {/* Poster Paper Background */}
                  <rect width="474" height="900" fill="#F8F6F0" />

                  {/* Blueprint Coordinate Grid */}
                  <g stroke="#1F3FB0" strokeWidth="0.4" opacity="0.2">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 50} x2="474" y2={i * 50} />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="900" />
                    ))}
                  </g>

                  {/* Header typography */}
                  <text x="35" y="60" fontFamily="'Inter Tight', sans-serif" fontSize="10" fontWeight="600" letterSpacing="2" fill="#1F3FB0">
                    AEROSPACE ARCHIVES · IIST VALIAMALA
                  </text>
                  <text x="35" y="80" fontFamily="'Newsreader', serif" fontSize="28" fontWeight="600" fill="#141414">
                    {activeTape.name}
                  </text>
                  <text x="35" y="100" fontFamily="monospace" fontSize="10" fill="#6D6A63">
                    {activeTape.roll} · {activeTape.cohort}
                  </text>

                  {/* Technical Diagram in Center */}
                  <g transform="translate(47, 180) scale(1.35)">
                    <TechnicalDiagram type={activeTape.diagramType} color="#1F3FB0" />
                  </g>

                  {/* Key Specifications Table */}
                  <g transform="translate(35, 680)">
                    <rect width="404" height="150" fill="#141414" fillOpacity="0.04" stroke="#141414" strokeWidth="0.8" />
                    <text x="15" y="30" fontFamily="'Inter Tight', sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.5" fill="#1F3FB0">
                      RESEARCH PROFILE & SPECIALIZATION
                    </text>
                    <text x="15" y="55" fontFamily="'Newsreader', serif" fontSize="15" fill="#141414">
                      {activeTape.specialization}
                    </text>
                    <line x1="15" y1="75" x2="389" y2="75" stroke="#141414" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                    <text x="15" y="100" fontFamily="monospace" fontSize="9" fill="#6D6A63">
                      STATUS :: {activeTape.placedAt ? `Placed at ${activeTape.placedAt}` : "Research Scholar / Active"}
                    </text>
                    <text x="15" y="120" fontFamily="monospace" fontSize="9" fill="#1F3FB0">
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

