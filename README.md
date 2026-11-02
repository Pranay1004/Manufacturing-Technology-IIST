# IIST Manufacturing Technology Portal: Immersive Engineering Showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015-black.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)]()
[![Institution: IIST](https://img.shields.io/badge/Institution-IIST%20ISRO-orange.svg)]()

High-performance digital portal for the Department of Aerospace Engineering / Manufacturing Technology at the Indian Institute of Space Science and Technology (IIST, ISRO). Features physics-grounded scroll-driven UI where interaction patterns mirror physical manufacturing processes (additive deposition, subtractive machining, CAD exploded view assemblies, and quality inspection scan lines).

---

## Design Architecture & Metaphors

| Manufacturing Process | UI / Kinetic Interaction System |
|---|---|
| **CAD Exploded Views** | Component assemblies separate on scroll to expose internal subsystems |
| **Additive Deposition (WAAM/AM)** | Layer-by-layer progressive content reveal on viewport entry |
| **Subtractive Machining** | Viewport clipping masks and geometric cut-aways |
| **Inspection Metrology** | Active scan-line overlays rendering dynamic sensor telemetry |

---

## Technical Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom forged-metal token primitives
- **Icons & Motion**: Lucide React, CSS Scroll-driven animations
- **Deployment**: Vercel Edge Runtime

---

## Directory Structure

```
iistmanufacturing/
├── public/                 # Static assets, schematics, and media
├── src/
│   ├── app/                # Next.js App Router endpoints and layouts
│   ├── components/         # Modular process components (ExplodedView, Deposition, Scanner)
│   └── lib/                # Telemetry utilities and department catalog
├── design_vision.md        # Comprehensive UI/UX physics-based design philosophy
├── SECURITY.md             # Security and vulnerability reporting disclosure
├── LICENSE                 # MIT Open Source License
└── README.md               # Production architecture manual
```

---

## Getting Started

```bash
git clone https://github.com/Pranay1004/iistmanufacturing.git
cd iistmanufacturing
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the development build.
