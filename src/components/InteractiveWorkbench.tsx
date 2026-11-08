"use client";

import React, { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Cpu, Layers, Zap, PenTool, Activity,
  Rotate3d, Disc, Hammer, Compass, CheckCircle, BookOpen
} from "lucide-react";

interface ProcessParam {
  param: string;
  typical: string;
  unit: string;
}

interface CourseTopic {
  id: string;
  name: string;
  code: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: "blue" | "amber" | "green" | "saffron";
  summary: string;
  details: string[];
  params: ProcessParam[];
  formulaLabel: string;
  formula: string;
  formulaTerms: string[];
  diagramType: "cad" | "cam" | "additive" | "subtractive" | "nonconventional" | "metrology" | "welding" | "composite" | "fem" | "materials";
}

const topics: CourseTopic[] = [
  {
    id: "cad",
    name: "Computer Aided Design",
    code: "AE642",
    icon: Rotate3d,
    color: "blue",
    summary: "Parametric design, 3D modeling, assembly hierarchy, and dimensioning standards for space structures.",
    details: ["3D solid modeling", "Geometric dimensioning & tolerancing", "Assembly constraint networks", "B-rep & CSG modeling"],
    params: [
      { param: "Tolerance Grade", typical: "IT6–IT8", unit: "ISO" },
      { param: "Surface Finish", typical: "1.6–3.2", unit: "μm Ra" },
      { param: "Fit Type", typical: "H7/h6 (clearance)", unit: "ISO" },
      { param: "Drafting Standard", typical: "ISO 128 / ASME Y14.5", unit: "—" },
    ],
    formulaLabel: "Taylor's Principle (Envelope Condition)",
    formula: "MMC envelope ≥ actual mating size",
    formulaTerms: ["MMC = Maximum Material Condition", "LMC = Least Material Condition", "True Position tolerance zone applies at MMC"],
    diagramType: "cad",
  },
  {
    id: "cam",
    name: "Computer Aided Manufacturing",
    code: "AE642",
    icon: Disc,
    color: "amber",
    summary: "CNC tooling paths, G-code/M-code generation, machine post-processing, and multi-axis control loops.",
    details: ["Multi-axis cutter paths", "G-code compiler", "Feed & speed optimization", "Post-processor algorithms"],
    params: [
      { param: "Cutting Speed (Vc)", typical: "80–200", unit: "m/min" },
      { param: "Feed Rate (f)", typical: "0.1–0.4", unit: "mm/rev" },
      { param: "Depth of Cut (ap)", typical: "0.5–4", unit: "mm" },
      { param: "Spindle Speed (N)", typical: "2000–8000", unit: "RPM" },
    ],
    formulaLabel: "Taylor's Tool Life Equation",
    formula: "VcTⁿ = C",
    formulaTerms: ["Vc = cutting speed (m/min)", "T = tool life (min)", "n = tool life exponent (~0.25 for HSS)", "C = constant (material dependent)"],
    diagramType: "cam",
  },
  {
    id: "additive",
    name: "Additive Manufacturing",
    code: "AE645",
    icon: Layers,
    color: "green",
    summary: "Laser powder bed fusion, fused filament fabrication, stereolithography, and design for additive manufacturing.",
    details: ["Laser scan strategies", "Thermal stress analysis", "Powder bed optimization", "Lattice structure design"],
    params: [
      { param: "Layer Thickness", typical: "20–100", unit: "μm" },
      { param: "Laser Power", typical: "100–400", unit: "W" },
      { param: "Scan Speed", typical: "500–1500", unit: "mm/s" },
      { param: "Hatch Spacing", typical: "80–120", unit: "μm" },
    ],
    formulaLabel: "Volumetric Energy Density",
    formula: "E = P / (v × h × t)",
    formulaTerms: ["P = laser power (W)", "v = scan speed (mm/s)", "h = hatch spacing (mm)", "t = layer thickness (mm)"],
    diagramType: "additive",
  },
  {
    id: "subtractive",
    name: "Subtractive Processes",
    code: "AE642",
    icon: PenTool,
    color: "saffron",
    summary: "Milling, turning, grinding, tool-wear mechanics, shear-zone thermodynamics, and surface finish profiles.",
    details: ["Orthogonal cutting", "Merchant's force circle", "Taylor's tool life formula", "Surface roughness analysis"],
    params: [
      { param: "Shear Angle (φ)", typical: "25–45", unit: "degrees" },
      { param: "Rake Angle (α)", typical: "5–15", unit: "degrees" },
      { param: "Specific Cutting Force", typical: "1000–3500", unit: "N/mm²" },
      { param: "Tool Wear (VB)", typical: "≤ 0.3", unit: "mm" },
    ],
    formulaLabel: "Merchant's Force Circle",
    formula: "φ = 45° + α/2 - λ/2",
    formulaTerms: ["φ = shear angle", "α = rake angle", "λ = friction angle = arctan(μ)", "μ = coefficient of friction at chip-tool interface"],
    diagramType: "subtractive",
  },
  {
    id: "nonconventional",
    name: "Non-Conventional Machining",
    code: "AE644",
    icon: Zap,
    color: "blue",
    summary: "Electro-discharge machining (EDM), laser-beam cutting, abrasive jet processing, and chemical milling.",
    details: ["Spark erosion physics", "Plasma channel energetics", "Dielectric flow modeling", "Material removal rate"],
    params: [
      { param: "Discharge Voltage", typical: "40–120", unit: "V" },
      { param: "Pulse Duration", typical: "1–1000", unit: "μs" },
      { param: "Electrode Gap", typical: "0.01–0.05", unit: "mm" },
      { param: "MRR (EDM)", typical: "1–10", unit: "mm³/min" },
    ],
    formulaLabel: "EDM Material Removal Rate",
    formula: "MRR = K × Iₑ × Tₒⁿ",
    formulaTerms: ["K = material constant", "Iₑ = discharge current (A)", "Tₒ = pulse ON time (μs)", "n = exponent (~0.4 for metals)"],
    diagramType: "nonconventional",
  },
  {
    id: "metrology",
    name: "Metrology & Quality",
    code: "AE804",
    icon: Compass,
    color: "green",
    summary: "Coordinate measuring machines (CMM), surface laser scanning, optical comparators, and statistical quality control.",
    details: ["Interferometry principles", "GD&T inspection protocols", "Uncertainty budget calculation", "Laser profilometry"],
    params: [
      { param: "CMM Accuracy", typical: "±1–5", unit: "μm" },
      { param: "Surface Roughness Ra", typical: "0.4–6.3", unit: "μm" },
      { param: "Calibration Interval", typical: "6–12", unit: "months" },
      { param: "Cp / Cpk Target", typical: "≥ 1.33", unit: "—" },
    ],
    formulaLabel: "Process Capability Index",
    formula: "Cpk = min[(USL-μ)/3σ, (μ-LSL)/3σ]",
    formulaTerms: ["USL = Upper Specification Limit", "LSL = Lower Specification Limit", "μ = process mean", "σ = process standard deviation"],
    diagramType: "metrology",
  },
  {
    id: "welding",
    name: "Advanced Welding Technology",
    code: "AE647",
    icon: Hammer,
    color: "amber",
    summary: "TIG, MIG, friction stir welding, electron beam welding, and heat-affected zone metallurgical studies.",
    details: ["Friction stir mechanics", "Heat-affected zone (HAZ) phase shifts", "Plasma arc dynamics", "Weld bead geometry control"],
    params: [
      { param: "Heat Input (HI)", typical: "0.5–3", unit: "kJ/mm" },
      { param: "Welding Current", typical: "80–350", unit: "A" },
      { param: "Travel Speed", typical: "200–600", unit: "mm/min" },
      { param: "Preheat Temperature", typical: "100–300", unit: "°C" },
    ],
    formulaLabel: "Heat Input Equation",
    formula: "HI = (V × I × 60) / (1000 × S)",
    formulaTerms: ["V = arc voltage (V)", "I = welding current (A)", "S = travel speed (mm/min)", "Result in kJ/mm"],
    diagramType: "welding",
  },
  {
    id: "composite",
    name: "Composite Technology",
    code: "AE646",
    icon: Layers,
    color: "saffron",
    summary: "Autoclave processing, filament winding, vacuum-assisted resin transfer molding (VARTM), and layup mechanics.",
    details: ["Classical laminate theory", "Resin flow kinetics", "Void formation mitigation", "Filament tension control"],
    params: [
      { param: "Cure Temperature", typical: "120–180", unit: "°C" },
      { param: "Autoclave Pressure", typical: "5–7", unit: "bar" },
      { param: "Ply Orientation", typical: "[0/±45/90]s", unit: "°" },
      { param: "Fibre Volume Fraction", typical: "0.55–0.65", unit: "Vf" },
    ],
    formulaLabel: "Rule of Mixtures (Longitudinal Modulus)",
    formula: "E₁ = Ef·Vf + Em·(1-Vf)",
    formulaTerms: ["Ef = fibre modulus", "Em = matrix modulus", "Vf = fibre volume fraction", "E₁ = longitudinal composite modulus"],
    diagramType: "composite",
  },
  {
    id: "fem",
    name: "Finite Element Method",
    code: "AE601",
    icon: Activity,
    color: "blue",
    summary: "Stress-strain tensors, mesh generation, boundary conditions, dynamic response, and thermo-structural analysis.",
    details: ["Stiffness matrix derivation", "Isoparametric formulation", "Von Mises yield criterion", "Thermal expansion loads"],
    params: [
      { param: "Element Type", typical: "Quad4 / Hex8", unit: "—" },
      { param: "Mesh Size", typical: "0.5–5", unit: "mm" },
      { param: "Poisson's Ratio (ν)", typical: "0.25–0.35", unit: "—" },
      { param: "Young's Modulus", typical: "70–200", unit: "GPa" },
    ],
    formulaLabel: "Global FEM Stiffness Equation",
    formula: "[K]{u} = {F}",
    formulaTerms: ["[K] = global stiffness matrix", "{u} = nodal displacement vector", "{F} = external force vector", "Solved by Gaussian elimination or iterative methods"],
    diagramType: "fem",
  },
  {
    id: "materials",
    name: "Advanced Engineering Materials",
    code: "AE641",
    icon: Cpu,
    color: "green",
    summary: "Superalloys, titanium grades, metal matrix composites, shape memory alloys, and structural characterization.",
    details: ["Intermetallics & superalloys", "Dislocation glide & climb", "Austenite-Martensite phase shifts", "SEM & XRD micro-analysis"],
    params: [
      { param: "Ultimate Tensile Strength", typical: "800–1400", unit: "MPa (Ti alloys)" },
      { param: "Melting Point (Ni superalloy)", typical: "1300–1450", unit: "°C" },
      { param: "Density (CFRP)", typical: "1.6–1.8", unit: "g/cm³" },
      { param: "Fatigue Limit", typical: "0.4–0.5 × UTS", unit: "—" },
    ],
    formulaLabel: "Hall-Petch Strengthening",
    formula: "σy = σ₀ + K·d^(-1/2)",
    formulaTerms: ["σy = yield strength", "σ₀ = friction stress", "K = strengthening coefficient", "d = grain size (μm)"],
    diagramType: "materials",
  },
];

const colorMap = {
  blue:    { accent: "var(--arc-blue)",    dim: "var(--arc-blue-dim)",    text: "text-[var(--arc-blue)]",    badge: "bg-[var(--arc-blue-dim)] text-[var(--arc-blue)] border-[var(--arc-blue)]/20", tag: "bg-[var(--arc-blue-dim)] text-[var(--arc-blue)] border-[var(--arc-blue)]/15" },
  amber:   { accent: "var(--forge-amber)", dim: "var(--forge-amber-dim)", text: "text-[var(--forge-amber)]", badge: "bg-[var(--forge-amber-dim)] text-[var(--forge-amber)] border-[var(--forge-amber)]/20", tag: "bg-[var(--forge-amber-dim)] text-[var(--forge-amber)] border-[var(--forge-amber)]/15" },
  green:   { accent: "var(--laser-green)", dim: "rgba(47,139,95,0.07)",   text: "text-[var(--laser-green)]", badge: "bg-[rgba(47,139,95,0.07)] text-[var(--laser-green)] border-[var(--laser-green)]/20", tag: "bg-[rgba(47,139,95,0.07)] text-[var(--laser-green)] border-[var(--laser-green)]/15" },
  saffron: { accent: "var(--saffron)",     dim: "rgba(208,90,30,0.07)",   text: "text-[var(--saffron)]",    badge: "bg-[rgba(208,90,30,0.07)] text-[var(--saffron)] border-[var(--saffron)]/20", tag: "bg-[rgba(208,90,30,0.07)] text-[var(--saffron)] border-[var(--saffron)]/15" },
};

// Static CSS/SVG diagrams for each process type
function ProcessDiagram({ type, color }: { type: CourseTopic["diagramType"]; color: CourseTopic["color"] }) {
  const c = colorMap[color];

  if (type === "cad") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="CAD wireframe diagram">
          {/* Grid */}
          <defs>
            <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={c.accent} strokeWidth="0.3" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="320" height="220" fill={`url(#cad-grid)`} />
          {/* Isometric box */}
          <polygon points="160,30 240,70 240,140 160,180 80,140 80,70" fill="none" stroke={c.accent} strokeWidth="1.5" opacity="0.7" />
          <line x1="160" y1="30" x2="160" y2="180" stroke={c.accent} strokeWidth="0.8" strokeDasharray="5,4" opacity="0.4" />
          <line x1="80" y1="70" x2="240" y2="70" stroke={c.accent} strokeWidth="0.8" strokeDasharray="5,4" opacity="0.4" />
          <line x1="80" y1="140" x2="240" y2="140" stroke={c.accent} strokeWidth="0.8" strokeDasharray="5,4" opacity="0.4" />
          {/* Dimension arrows */}
          <line x1="80" y1="195" x2="240" y2="195" stroke={c.accent} strokeWidth="1" markerEnd="url(#arrow)" opacity="0.7" />
          <text x="155" y="210" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.8">200.00 mm ±0.05</text>
          {/* Corner dots */}
          <circle cx="160" cy="30" r="3" fill={c.accent} opacity="0.8" />
          <circle cx="240" cy="70" r="3" fill={c.accent} opacity="0.8" />
          <circle cx="240" cy="140" r="3" fill={c.accent} opacity="0.8" />
          <circle cx="80" cy="70" r="3" fill={c.accent} opacity="0.8" />
          <circle cx="80" cy="140" r="3" fill={c.accent} opacity="0.8" />
          <circle cx="160" cy="180" r="3" fill={c.accent} opacity="0.8" />
          {/* Labels */}
          <text x="255" y="108" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.7">125.00</text>
          <text x="10" y="108" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.7">W=160</text>
        </svg>
      </div>
    );
  }

  if (type === "cam") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="CAM CNC toolpath diagram">
          {/* Workpiece */}
          <rect x="40" y="100" width="240" height="70" rx="2" fill="rgba(90,98,100,0.15)" stroke={c.accent} strokeWidth="1.5" />
          {/* Toolpath (dashed) */}
          <path d="M60,80 L80,80 L80,100" fill="none" stroke={c.accent} strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5" />
          <path d="M80,80 L200,80" fill="none" stroke={c.accent} strokeWidth="2" opacity="0.9" />
          <path d="M200,80 L220,80 L220,100" fill="none" stroke={c.accent} strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5" />
          {/* Tool head */}
          <polygon points="140,55 150,55 152,80 138,80" fill="rgba(90,98,100,0.5)" stroke={c.accent} strokeWidth="1.5" />
          <rect x="135" y="42" width="20" height="15" rx="2" fill="rgba(90,98,100,0.4)" stroke={c.accent} strokeWidth="1" />
          {/* Chips */}
          <circle cx="148" cy="82" r="3" fill={c.accent} opacity="0.7" />
          {/* Labels */}
          <text x="160" y="40" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.8" textAnchor="middle">SPINDLE: 6000 RPM</text>
          <text x="160" y="185" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.7" textAnchor="middle">FEED: F1200 · DEPTH: 2mm</text>
          {/* G-code annotation */}
          <text x="15" y="95" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.6">G01</text>
          <text x="200" y="95" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.6">G02</text>
        </svg>
      </div>
    );
  }

  if (type === "additive") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="Additive manufacturing layer diagram">
          {/* Build platform */}
          <rect x="60" y="185" width="200" height="8" rx="2" fill="rgba(90,98,100,0.4)" stroke="rgba(90,98,100,0.5)" strokeWidth="1" />
          {/* Printed layers */}
          {[0,1,2,3,4,5].map((i) => (
            <rect key={i} x="80" y={175 - i*15} width="160" height="12" rx="1"
              fill={`rgba(47,139,95,${0.1 + i*0.06})`}
              stroke={c.accent} strokeWidth={i === 5 ? "2" : "1"}
              opacity={i === 5 ? 1 : 0.7}
            />
          ))}
          {/* Nozzle */}
          <polygon points="150,60 170,60 165,90 155,90" fill="rgba(90,98,100,0.5)" stroke={c.accent} strokeWidth="1.5" />
          <rect x="148" y="45" width="24" height="18" rx="2" fill="rgba(90,98,100,0.4)" stroke={c.accent} strokeWidth="1.2" />
          {/* Laser/extrusion beam */}
          <line x1="160" y1="90" x2="160" y2="100" stroke={c.accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          {/* Labels */}
          <text x="255" y="160" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.8">Layer 6</text>
          <text x="255" y="173" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">50μm</text>
          <text x="160" y="30" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.8">LAYER DEPOSITION — LPBF</text>
          {/* Temp HUD */}
          <rect x="15" y="50" width="65" height="45" rx="4" fill="rgba(17,24,32,0.7)" stroke={c.accent} strokeWidth="0.8" opacity="0.8" />
          <text x="47" y="65" textAnchor="middle" fontSize="7" fill={c.accent} fontFamily="monospace">CHAMBER</text>
          <text x="47" y="78" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" fontWeight="bold">245°C</text>
          <text x="47" y="90" textAnchor="middle" fontSize="7" fill={c.accent} fontFamily="monospace">Ar inert gas</text>
        </svg>
      </div>
    );
  }

  if (type === "subtractive") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="Subtractive machining diagram">
          {/* Workpiece before */}
          <rect x="40" y="80" width="240" height="80" rx="2" fill="rgba(90,98,100,0.12)" stroke="rgba(90,98,100,0.3)" strokeWidth="1.2" strokeDasharray="5,3" />
          {/* Machined step */}
          <path d="M40,80 L40,140 L200,140 L200,110 L280,110 L280,80 Z" fill="rgba(90,98,100,0.25)" stroke={c.accent} strokeWidth="1.5" />
          {/* Tool cutter circle */}
          <circle cx="200" cy="95" r="20" fill="rgba(208,90,30,0.1)" stroke={c.accent} strokeWidth="1.5" />
          {/* Chip flow */}
          <path d="M200,75 Q215,55 225,40" fill="none" stroke={c.accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.6" />
          {/* Labels */}
          <text x="120" y="70" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.8">ap = 2mm DEPTH</text>
          <text x="160" y="185" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.7">Shear Plane Angle φ = 35°</text>
          <text x="220" y="35" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.6">Chip ↗</text>
          {/* Arrows showing forces */}
          <line x1="200" y1="95" x2="200" y2="115" stroke={c.accent} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.8" />
          <text x="206" y="113" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">Fc</text>
        </svg>
      </div>
    );
  }

  if (type === "nonconventional") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="EDM discharge diagram">
          {/* Workpiece */}
          <rect x="60" y="140" width="200" height="55" rx="2" fill="rgba(90,98,100,0.2)" stroke="rgba(90,98,100,0.4)" strokeWidth="1.5" />
          {/* Tool electrode */}
          <rect x="120" y="60" width="80" height="45" rx="2" fill={`rgba(23,111,134,0.15)`} stroke={c.accent} strokeWidth="1.5" />
          {/* Discharge gap */}
          <line x1="160" y1="105" x2="155" y2="115" stroke="white" strokeWidth="2" opacity="0.9" />
          <line x1="155" y1="115" x2="163" y2="122" stroke="white" strokeWidth="2" opacity="0.9" />
          <line x1="163" y1="122" x2="157" y2="130" stroke="white" strokeWidth="2" opacity="0.9" />
          <line x1="157" y1="130" x2="160" y2="140" stroke="white" strokeWidth="2" opacity="0.9" />
          {/* Glow at contact */}
          <circle cx="160" cy="140" r="5" fill={c.accent} opacity="0.7" />
          {/* Dielectric label */}
          <text x="220" y="125" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">Dielectric</text>
          <text x="220" y="135" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">fluid gap</text>
          {/* Labels */}
          <text x="160" y="40" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.85">EDM · 80V DISCHARGE</text>
          <text x="160" y="210" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">Gap: 0.03mm · Deionized water dielectric</text>
          <text x="160" y="82" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">TOOL ELECTRODE (–)</text>
          <text x="160" y="168" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">WORKPIECE (+)</text>
        </svg>
      </div>
    );
  }

  if (type === "metrology") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="CMM metrology scan diagram">
          {/* Part profile */}
          <path d="M60,160 L60,100 Q60,80 80,80 L150,80 L150,100 L240,100 L240,160 Z" fill="rgba(90,98,100,0.2)" stroke="rgba(90,98,100,0.5)" strokeWidth="1.5" />
          {/* Laser scanner arm */}
          <rect x="140" y="25" width="8" height="55" rx="2" fill="rgba(47,139,95,0.3)" stroke={c.accent} strokeWidth="1.2" />
          {/* Laser beam */}
          <line x1="144" y1="80" x2="144" y2="100" stroke={c.accent} strokeWidth="2" opacity="0.9" strokeLinecap="round" />
          {/* Scan points */}
          {[80,100,120,144,170,200,240].map((x, i) => (
            <circle key={i} cx={x} cy={i < 4 ? (i < 2 ? 80 : 80) : 100} r="2.5" fill={c.accent} opacity="0.7" />
          ))}
          {/* CMM readout */}
          <rect x="200" y="25" width="100" height="70" rx="4" fill="rgba(17,24,32,0.8)" stroke={c.accent} strokeWidth="0.8" />
          <text x="250" y="40" textAnchor="middle" fontSize="7" fill={c.accent} fontFamily="monospace" opacity="0.8">CMM READOUT</text>
          <text x="210" y="55" fontSize="7" fill={c.accent} fontFamily="monospace">X: 144.502mm</text>
          <text x="210" y="68" fontSize="7" fill={c.accent} fontFamily="monospace">Y:  80.003mm</text>
          <text x="210" y="81" fontSize="7" fill={c.accent} fontFamily="monospace">DEV: +0.003</text>
          <text x="210" y="88" fontSize="7" fill={c.accent} fontFamily="monospace" opacity="0.7">✓ WITHIN TOL</text>
          {/* Tolerance zone */}
          <rect x="60" y="77" width="240" height="6" rx="1" fill="none" stroke={c.accent} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4" />
          <text x="160" y="200" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.7">Surface Profile Tolerance: 0.05mm</text>
        </svg>
      </div>
    );
  }

  if (type === "welding") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="TIG welding diagram">
          {/* Base plates */}
          <rect x="40" y="110" width="105" height="60" rx="2" fill="rgba(90,98,100,0.25)" stroke="rgba(90,98,100,0.5)" strokeWidth="1.5" />
          <rect x="175" y="110" width="105" height="60" rx="2" fill="rgba(90,98,100,0.25)" stroke="rgba(90,98,100,0.5)" strokeWidth="1.5" />
          {/* HAZ zones */}
          <rect x="125" y="110" width="25" height="60" rx="1" fill={`rgba(185,104,46,0.2)`} stroke="var(--forge-amber)" strokeWidth="0.8" opacity="0.6" />
          <rect x="170" y="110" width="20" height="60" rx="1" fill={`rgba(185,104,46,0.2)`} stroke="var(--forge-amber)" strokeWidth="0.8" opacity="0.6" />
          {/* Weld bead */}
          <ellipse cx="160" cy="110" rx="20" ry="8" fill={c.accent} opacity="0.4" />
          <ellipse cx="160" cy="110" rx="20" ry="8" fill="none" stroke={c.accent} strokeWidth="1.5" />
          {/* TIG torch */}
          <polygon points="152,45 168,45 164,80 156,80" fill="rgba(90,98,100,0.4)" stroke={c.accent} strokeWidth="1.5" />
          <line x1="160" y1="80" x2="160" y2="110" stroke="white" strokeWidth="2" opacity="0.85" strokeLinecap="round" />
          {/* Shielding gas zone */}
          <ellipse cx="160" cy="95" rx="28" ry="18" fill="none" stroke={c.accent} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4" />
          {/* Labels */}
          <text x="160" y="28" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.85">TIG WELDING — 110A / Ar 100%</text>
          <text x="145" y="107" fontSize="7" fill="var(--forge-amber)" fontFamily="monospace" opacity="0.9">HAZ</text>
          <text x="160" y="200" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">Heat Input: 1.2 kJ/mm</text>
        </svg>
      </div>
    );
  }

  if (type === "composite") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="Composite layup diagram">
          {/* Mold */}
          <path d="M50,185 L270,185 L270,180 L50,180 Z" fill="rgba(90,98,100,0.3)" stroke="rgba(90,98,100,0.5)" strokeWidth="1" />
          {/* Composite plies */}
          {[
            { y: 140, label: "[90°]", color: "rgba(208,90,30,0.25)" },
            { y: 153, label: "[45°]", color: "rgba(47,139,95,0.2)" },
            { y: 166, label: "[0°]",  color: "rgba(23,111,134,0.25)" },
            { y: 179, label: "[-45°]", color: "rgba(185,104,46,0.2)" },
          ].map((ply) => (
            <g key={ply.y}>
              <rect x="70" y={ply.y} width="180" height="11" fill={ply.color} stroke={c.accent} strokeWidth="1" />
              <text x="260" y={ply.y + 9} fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.8">{ply.label}</text>
            </g>
          ))}
          {/* Vacuum bag (dashed) */}
          <rect x="55" y="134" width="210" height="52" rx="3" fill="none" stroke="var(--laser-green)" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
          <text x="272" y="162" fontSize="7" fill="var(--laser-green)" fontFamily="monospace" opacity="0.8">Vac</text>
          <text x="272" y="171" fontSize="7" fill="var(--laser-green)" fontFamily="monospace" opacity="0.8">bag</text>
          {/* Labels */}
          <text x="160" y="120" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.85">VARTM LAYUP — [0/45/90/-45]s</text>
          <text x="160" y="200" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">Autoclave: 135°C @ 6 bar · Vf = 0.60</text>
          {/* Resin arrow */}
          <path d="M40,158 L65,158" fill="none" stroke={c.accent} strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.6" />
          <text x="12" y="162" fontSize="7" fill={c.accent} fontFamily="monospace" opacity="0.7">Resin</text>
          <text x="12" y="171" fontSize="7" fill={c.accent} fontFamily="monospace" opacity="0.7">flow</text>
        </svg>
      </div>
    );
  }

  if (type === "fem") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="FEM mesh diagram">
          {/* FEM mesh grid — 5×4 elements */}
          {[0,1,2,3,4].map(col =>
            [0,1,2,3].map(row => {
              const x = 60 + col * 45;
              const y = 50 + row * 38;
              const stressVal = (col + row) / 7;
              const r = Math.floor(21 + (200 - 21) * stressVal);
              const g = Math.floor(100 + (30 - 100) * stressVal);
              const b = Math.floor(190 + (68 - 190) * stressVal);
              return (
                <rect key={`${col}-${row}`} x={x} y={y} width="44" height="37"
                  fill={`rgba(${r},${g},${b},0.25)`}
                  stroke={`rgba(${r},${g},${b},0.7)`}
                  strokeWidth="1"
                />
              );
            })
          )}
          {/* Fixed boundary (left) */}
          {[50,88,126,164].map(y => (
            <g key={y}>
              <line x1="50" y1={y} x2="60" y2={y+18} stroke="rgba(90,98,100,0.5)" strokeWidth="1.5" />
              <line x1="50" y1={y} x2="60" y2={y-0} stroke="rgba(90,98,100,0.5)" strokeWidth="1.5" />
            </g>
          ))}
          <line x1="50" y1="50" x2="50" y2="202" stroke="rgba(90,98,100,0.7)" strokeWidth="2.5" />
          {/* Force arrows (right) */}
          <line x1="280" y1="120" x2="265" y2="120" stroke="var(--stress-red)" strokeWidth="2.5" markerEnd="url(#arr-red)" />
          <text x="283" y="123" fontSize="8" fill="var(--stress-red)" fontFamily="monospace">F</text>
          {/* Labels */}
          <text x="160" y="30" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.85">FEM MESH — QUAD4 ELEMENTS</text>
          <text x="160" y="205" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">Von Mises Stress field · [K]{'{u}'} = {'{F}'}</text>
          {/* Color legend */}
          <defs>
            <linearGradient id="stress-legend" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(21,101,192)" />
              <stop offset="100%" stopColor="rgb(200,30,68)" />
            </linearGradient>
          </defs>
          <rect x="200" y="40" width="100" height="10" rx="2" fill="url(#stress-legend)" opacity="0.8" />
          <text x="200" y="60" fontSize="7" fill="rgb(21,101,192)" fontFamily="monospace">Low</text>
          <text x="275" y="60" fontSize="7" fill="rgb(200,30,68)" fontFamily="monospace">High</text>
        </svg>
      </div>
    );
  }

  // materials — crystal lattice
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-label="Crystal lattice diagram">
        {/* HCP lattice schematic */}
        {/* Hexagonal base */}
        <polygon points="160,80 200,100 200,140 160,160 120,140 120,100" fill="none" stroke={c.accent} strokeWidth="1.5" opacity="0.7" />
        {/* Top hexagon */}
        <polygon points="160,30 200,50 200,90 160,110 120,90 120,50" fill="none" stroke={c.accent} strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5" />
        {/* Vertical struts */}
        <line x1="160" y1="80" x2="160" y2="30" stroke={c.accent} strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="100" x2="200" y2="50" stroke={c.accent} strokeWidth="1" opacity="0.5" />
        <line x1="120" y1="100" x2="120" y2="50" stroke={c.accent} strokeWidth="1" opacity="0.5" />
        <line x1="160" y1="160" x2="160" y2="110" stroke={c.accent} strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="140" x2="200" y2="90" stroke={c.accent} strokeWidth="1" opacity="0.5" />
        <line x1="120" y1="140" x2="120" y2="90" stroke={c.accent} strokeWidth="1" opacity="0.5" />
        {/* Atoms */}
        {[
          [160,80],[200,100],[200,140],[160,160],[120,140],[120,100],
          [160,30],[200,50],[200,90],[160,110],[120,90],[120,50],
        ].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r={i < 6 ? 6 : 5} fill={c.accent} opacity={i < 6 ? 0.8 : 0.5} />
        ))}
        {/* Center interstitial atom */}
        <circle cx="160" cy="120" r="4" fill="var(--forge-amber)" opacity="0.7" />
        {/* Labels */}
        <text x="160" y="15" textAnchor="middle" fontSize="9" fill={c.accent} fontFamily="monospace" opacity="0.85">Ti-6Al-4V · HCP CRYSTAL (α-phase)</text>
        <text x="160" y="200" textAnchor="middle" fontSize="8" fill={c.accent} fontFamily="monospace" opacity="0.7">a=2.95Å · c/a=1.587 · Grain size: ASTM 8</text>
        <text x="170" y="122" fontSize="7" fill="var(--forge-amber)" fontFamily="monospace" opacity="0.8">O (interstitial)</text>
      </svg>
    </div>
  );
}

export function InteractiveWorkbench() {
  const [activeTopic, setActiveTopic] = useState<CourseTopic>(topics[0]);
  const c = colorMap[activeTopic.color];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Course Sidebar selector */}
      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[620px] [scrollbar-width:none] pr-1">
        <SectionLabel color="blue" className="mb-2">Course Modules</SectionLabel>
        {topics.map((topic) => {
          const Icon = topic.icon;
          const isActive = activeTopic.id === topic.id;
          const tc = colorMap[topic.color];
          return (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className={[
                "flex items-center gap-3 w-full rounded-lg border p-3 text-left transition-all duration-200 cursor-pointer",
                isActive
                  ? `border-[${tc.accent}] bg-[${tc.dim}] shadow-sm`
                  : "border-[var(--edge)] bg-[var(--panel)]/40 text-[var(--ceramic-muted)] hover:border-[var(--edge-hover)] hover:bg-[var(--panel)]"
              ].join(" ")}
              style={isActive ? { borderColor: tc.accent, background: tc.dim } : {}}
            >
              <Icon
              size={16}
              className={isActive ? tc.text : "text-[var(--ceramic-muted)]"}
            />
            <div className="min-w-0">
                <p className={`font-display text-sm font-semibold truncate ${isActive ? "text-[var(--ceramic)]" : ""}`}>
                  {topic.name}
                </p>
                <p className="font-mono text-[10px] tracking-wider opacity-50 mt-0.5">{topic.code}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main panel */}
      <div className="flex flex-col gap-4 min-w-0">
        {/* Header */}
        <div className="rounded-xl border border-[var(--edge)] bg-[var(--void-deep)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="grid size-10 place-items-center rounded-lg border"
                style={{ background: c.dim, borderColor: `${c.accent}30` }}
              >
                <activeTopic.icon size={20} className={c.text} />
              </div>
              <div>
                <span
                  className="rounded-md px-2 py-0.5 font-mono text-xs font-semibold tracking-wide border"
                  style={{ background: c.dim, color: c.accent, borderColor: `${c.accent}25` }}
                >
                  {activeTopic.code}
                </span>
                <h2 className="font-display text-xl font-bold text-[var(--ceramic)] mt-1">
                  {activeTopic.name}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-[var(--ceramic-muted)]" />
              <span className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">
                IDDTS Reference Panel
              </span>
            </div>
          </div>
          <p className="text-sm leading-6 text-[var(--ceramic-muted)]">{activeTopic.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeTopic.details.map((d) => (
              <span
                key={d}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs"
                style={{ borderColor: `${c.accent}20`, background: c.dim, color: c.accent }}
              >
                <CheckCircle size={11} style={{ color: c.accent }} />
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Diagram + Params grid */}
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          {/* Process Diagram */}
          <div
            className="rounded-xl border bg-[var(--void-deep)] overflow-hidden"
            style={{ borderColor: `${c.accent}20` }}
          >
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b text-xs font-mono font-medium tracking-wide"
              style={{ borderColor: `${c.accent}15`, background: c.dim, color: c.accent }}
            >
              <span>Process Schematic — {activeTopic.name}</span>
              <span className="opacity-60">IIST-MT-{activeTopic.id}</span>
            </div>
            <div className="p-4 min-h-[240px] flex items-center justify-center bg-[var(--void-deep)]">
              <ProcessDiagram type={activeTopic.diagramType} color={activeTopic.color} />
            </div>
          </div>

          {/* Process Parameters Table */}
          <div className="rounded-xl border border-[var(--edge)] bg-[var(--void-deep)] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--edge)] bg-[var(--panel)]/50">
              <p className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">
                Process Parameters
              </p>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--edge)]">
                  <th className="text-left px-3 py-2 font-data text-[10px] font-semibold tracking-wide text-[var(--ceramic-muted)]">Parameter</th>
                  <th className="text-right px-3 py-2 font-data text-[10px] font-semibold tracking-wide text-[var(--ceramic-muted)]">Typical</th>
                  <th className="text-right px-3 py-2 font-data text-[10px] font-semibold tracking-wide text-[var(--ceramic-muted)]">Unit</th>
                </tr>
              </thead>
              <tbody>
                {activeTopic.params.map((p, i) => (
                  <tr key={p.param} className={i % 2 === 0 ? "bg-[var(--panel)]/30" : ""}>
                    <td className="px-3 py-2 text-[var(--ceramic)] font-medium text-xs">{p.param}</td>
                    <td className="px-3 py-2 text-right font-mono" style={{ color: c.accent }}>{p.typical}</td>
                    <td className="px-3 py-2 text-right text-[var(--ceramic-muted)] font-mono text-[10px]">{p.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula block */}
        <div className="rounded-xl border border-[var(--edge)] bg-[var(--void-deep)] p-5">
          <p className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)] mb-3">
            Key Equation — {activeTopic.formulaLabel}
          </p>
          <div
            className="rounded-lg border px-5 py-3 font-mono text-xl font-bold text-center tracking-wide mb-4"
            style={{ borderColor: `${c.accent}25`, background: c.dim, color: c.accent }}
          >
            {activeTopic.formula}
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {activeTopic.formulaTerms.map((term) => (
              <p key={term} className="text-xs text-[var(--ceramic-muted)] flex items-start gap-2">
                <span style={{ color: c.accent }} className="mt-0.5 shrink-0">▸</span>
                {term}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
