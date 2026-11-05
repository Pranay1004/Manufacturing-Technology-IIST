"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ManufacturingScrollHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const giantLettersRef = useRef<HTMLDivElement>(null);
  const speedReadoutRef = useRef<HTMLDivElement>(null);
  const darkBandRef = useRef<HTMLDivElement>(null);
  const capabilitiesStripRef = useRef<HTMLDivElement>(null);

  const [speedText, setSpeedText] = useState("00 MM/S");
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    const giantLetters = giantLettersRef.current;
    const darkBand = darkBandRef.current;
    const strip = capabilitiesStripRef.current;
    if (!track || !video || !giantLetters || !darkBand || !strip) return;

    const cards = strip.querySelectorAll<HTMLElement>(".card-item");

    const A = 2.4; // 2.4 viewports for the clip
    let B = 2.0;   // Calculated dynamically based on strip width
    const DURATION = 4.041667;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let stripWidth = strip.scrollWidth;
    let lettersWidth = giantLetters.scrollWidth;

    let currentTime = 0;
    let targetTime = 0;
    let isSeeking = false;
    let pendingTime: number | null = null;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let smoothedSpeed = 0;

    function clamp(val: number, min: number, max: number): number {
      return Math.max(min, Math.min(max, val));
    }

    function updateLayout() {
      if (!track || !video || !giantLetters || !darkBand || !strip) return;
      vw = window.innerWidth;
      vh = window.innerHeight;
      stripWidth = strip.scrollWidth;
      lettersWidth = giantLetters.scrollWidth;

      // B = (strip width + 0.45 * vw) / vw * 1.1 viewports
      B = ((stripWidth + 0.45 * vw) / vw) * 1.1;

      // Track height = (1 + A + B) * viewport
      const trackHeight = (1 + A + B) * vh;
      track.style.height = `${trackHeight}px`;

      // Position & size video
      const isNarrow = vw < 768 || vw <= vh;
      let vidW: number, vidH: number, vidLeft: number, vidTop: number, finalBandEdgePx: number;

      if (!isNarrow) {
        // Wide screens: cover (scale = max(vw/1920, vh/1080), centred)
        const scale = Math.max(vw / 1920, vh / 1080);
        vidW = 1920 * scale;
        vidH = 1080 * scale;
        vidLeft = (vw - vidW) / 2;
        vidTop = (vh - vidH) / 2;
        finalBandEdgePx = vidTop + 0.448 * vidH;
      } else {
        // Narrow or portrait screens: width 155vw
        vidW = 1.55 * vw;
        vidH = vidW * (1080 / 1920);
        vidLeft = vw * 0.5 - 0.4 * vidW;
        finalBandEdgePx = 0.36 * vh;
        vidTop = finalBandEdgePx - 0.448 * vidH;
      }

      video.style.width = `${vidW}px`;
      video.style.height = `${vidH}px`;
      video.style.left = `${vidLeft}px`;
      video.style.top = `${vidTop}px`;

      darkBand.style.top = `${finalBandEdgePx}px`;
      giantLetters.style.top = `${finalBandEdgePx - giantLetters.offsetHeight}px`;
    }

    window.addEventListener("resize", updateLayout);
    updateLayout();

    // Video Seek Logic
    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        seekVideo(t);
      }
    };
    video.addEventListener("seeked", onSeeked);

    function seekVideo(time: number) {
      if (isSeeking) {
        pendingTime = time;
        return;
      }
      if (Math.abs(video!.currentTime - time) > 1 / 60) {
        isSeeking = true;
        video!.currentTime = time;
      }
    }

    let animId = 0;
    const onFrame = (now: number) => {
      const dt = Math.max(0.001, (now - lastTime) / 1000);
      lastTime = now;

      // Track relative scroll within the track
      const trackRect = track.getBoundingClientRect();
      const scrollY = -trackRect.top;

      const deltaY = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      // Speed readout: |Δy|/Δt ÷ 32, capped at 99
      const instSpeed = deltaY / dt / 32;
      smoothedSpeed += (instSpeed - smoothedSpeed) * Math.min(1, dt * 8);
      const displaySpeed = Math.min(99, Math.round(smoothedSpeed));
      setSpeedText(`${String(displaySpeed).padStart(2, "0")} MM/S`);

      // 1. Clip scrub mapping: q = clamp(scrollY / (A * vh))
      const q = clamp(scrollY / (A * vh), 0, 1);
      targetTime = q * (DURATION - 1 / 48);

      currentTime += (targetTime - currentTime) * 0.2;
      seekVideo(currentTime);

      // Settled flag: when q >= 0.94
      const settled = q >= 0.94;
      setIsSettled(settled);

      // 2. Strip scroll mapping: r = clamp((scrollY - A * vh) / (B * vh))
      const r = clamp((scrollY - A * vh) / (B * vh), 0, 1);

      const stripTranslateX = vw - r * (stripWidth + 0.45 * vw);
      strip.style.transform = `translate3d(${stripTranslateX}px, 0, 0)`;

      const lettersTranslateX = vw - r * (lettersWidth + vw);
      giantLetters.style.transform = `translate3d(${lettersTranslateX}px, 0, 0)`;

      // 3. Card text sweep reveal: white -> cobalt -> transparent
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardLeft = rect.left;
        const s = clamp((0.98 - cardLeft / vw) / 0.3, -0.4, 1.6) * 100;

        const s34 = Math.max(0, s - 34);
        const s6 = Math.max(0, s - 6);
        const s26 = Math.min(100, s + 26);

        card.style.setProperty("--s-34", `${s34}%`);
        card.style.setProperty("--s-6", `${s6}%`);
        card.style.setProperty("--s-plus-26", `${s26}%`);
      });

      animId = requestAnimationFrame(onFrame);
    };

    animId = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateLayout);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative w-full bg-white text-[#111111] font-['Archivo',sans-serif]"
      style={{
        ["--u" as string]: "min(100vw / 1440, 100vh / 960)",
      }}
    >
      {/* Top Nav: absolute at top of track, so it scrolls away */}
      <header className="absolute top-0 left-0 w-full h-[calc(80*var(--u))] px-[calc(52*var(--u))] flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-baseline gap-[calc(14*var(--u))]">
          <Link
            href="/"
            className="font-['Archivo',sans-serif] font-semibold text-[calc(30*var(--u))] tracking-[-0.06em] leading-none text-[#111111] no-underline"
          >
            MT
          </Link>
          <span className="hidden sm:inline-block font-['Archivo',sans-serif] font-medium text-[calc(9*var(--u))] tracking-[0.1em] uppercase text-[#111111]/55">
            IIST · Aerospace Engineering
          </span>
        </div>

        <nav className="flex items-center gap-[calc(24*var(--u))]">
          <Link
            href="/people"
            className="font-['Archivo',sans-serif] font-medium text-[calc(10*var(--u))] tracking-[0.1em] uppercase text-[#111111] hover:opacity-60 transition-opacity no-underline"
          >
            → Directory
          </Link>
          <Link
            href="/research"
            className="hidden sm:inline-block font-['Archivo',sans-serif] font-medium text-[calc(10*var(--u))] tracking-[0.1em] uppercase text-[#111111] hover:opacity-60 transition-opacity no-underline"
          >
            Research
          </Link>
          <Link
            href="/about"
            className="font-['Archivo',sans-serif] font-medium text-[calc(10*var(--u))] tracking-[0.1em] uppercase text-[#111111] px-[calc(18*var(--u))] py-[calc(8*var(--u))] border border-[#111111] rounded-full hover:bg-[#111111] hover:text-white transition-all no-underline"
          >
            Collaborate with us
          </Link>
        </nav>
      </header>

      {/* Sticky Scene (100vh) */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100lvh] overflow-hidden bg-white">
        {/* Layer 1: Video Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <video
            ref={videoRef}
            className="absolute block will-change-transform"
            muted
            playsInline
            preload="auto"
            poster="/assets/process-poster.jpg"
          >
            <source src="/assets/process-1080.mp4" type="video/mp4" media="(min-width: 901px)" />
            <source src="/assets/process-720.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 2: Giant Letters "MANUFACTURING" with mix-blend-mode: darken */}
        <div
          ref={giantLettersRef}
          className="absolute left-0 font-['Anton',sans-serif] text-[calc(180*var(--u))] sm:text-[calc(330*var(--u))] leading-[0.8] text-[#e9e9e9] whitespace-nowrap z-20 pointer-events-none will-change-transform mix-blend-darken"
          style={{ transform: "translate3d(100vw, 0, 0)" }}
        >
          MANUFACTURING
        </div>

        {/* Layer 3: Speed Readout */}
        <div
          ref={speedReadoutRef}
          className={[
            "absolute top-[calc(52*var(--u))] left-[calc(26*var(--u))] font-mono text-[calc(10.5*var(--u))] text-[#111111] z-40 pointer-events-none tracking-wider transition-opacity duration-400",
            isSettled ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {speedText}
        </div>

        {/* Layer 4: Dark Band & Capabilities Strip */}
        <div
          ref={darkBandRef}
          className="absolute inset-x-0 bottom-0 bg-[#111111] z-30 overflow-hidden"
        >
          <div
            ref={capabilitiesStripRef}
            className="absolute top-[calc(44*var(--u))] sm:top-[calc(76*var(--u))] left-0 flex flex-row items-start gap-[calc(56*var(--u))] sm:gap-[calc(120*var(--u))] text-white will-change-transform whitespace-nowrap pl-5 sm:pl-0"
            style={{ transform: "translate3d(100vw, 0, 0)" }}
          >
            {/* Lead Block */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-[calc(64*var(--u))] shrink-0">
              <h1 className="font-['Anton',sans-serif] text-[calc(46*var(--u))] sm:text-[calc(64*var(--u))] leading-[0.98] uppercase text-white whitespace-nowrap">
                FROM RAW METAL<br />
                TO FLIGHT HARDWARE.<br />
                <span className="text-[#2f63ff] block">UNDER ONE LAB.</span>
              </h1>
              <div className="w-[300px] sm:w-[calc(250*var(--u))] flex flex-col gap-3 font-['Archivo',sans-serif] text-[13px] sm:text-[calc(12*var(--u))] leading-normal text-white/62 whitespace-normal">
                <p>
                  Additive, subtractive and joining processes, backed by materials characterisation, so one part can be built, finished and qualified in the same group.
                </p>
                <p>
                  Process simulation and in-process monitoring tie every run to measured microstructure and mechanical properties.
                </p>
              </div>
            </div>

            {/* Card 1: Additive Manufacturing */}
            <article className="card-item w-[250px] sm:w-[calc(270*var(--u))] px-5 sm:px-[calc(30*var(--u))] flex flex-col gap-[calc(14*var(--u))] shrink-0 border-l border-white/12 first-of-type:border-l-0">
              <svg className="size-[calc(38*var(--u))] stroke-white fill-none stroke-[1.5]" viewBox="0 0 38 38">
                <path d="M19 4 L22 13 L16 13 Z" />
                <line x1="19" y1="13" x2="19" y2="18" />
                <line x1="10" y1="22" x2="28" y2="22" />
                <line x1="8" y1="26" x2="30" y2="26" />
                <line x1="6" y1="30" x2="32" y2="30" />
                <line x1="4" y1="34" x2="34" y2="34" strokeDasharray="2 2" />
              </svg>
              <h2
                className="font-['Anton',sans-serif] text-[26px] sm:text-[calc(26*var(--u))] leading-[1.05] uppercase whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Additive<br />manufacturing
              </h2>
              <p
                className="font-['Archivo',sans-serif] text-[13px] sm:text-[calc(12.4*var(--u))] leading-normal whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Wire arc and ultrasonic-assisted deposition for near-net-shape metal parts, from process studies to build trials.
              </p>
            </article>

            {/* Card 2: Subtractive Machining */}
            <article className="card-item w-[250px] sm:w-[calc(270*var(--u))] px-5 sm:px-[calc(30*var(--u))] flex flex-col gap-[calc(14*var(--u))] shrink-0 border-l border-white/12">
              <svg className="size-[calc(38*var(--u))] stroke-white fill-none stroke-[1.5]" viewBox="0 0 38 38">
                <rect x="14" y="5" width="10" height="12" rx="1" />
                <path d="M12 17 L26 17 L22 28 L16 28 Z" />
                <path d="M14 20 L24 23 M14 24 L22 27" />
                <line x1="6" y1="33" x2="32" y2="33" strokeWidth="2" />
              </svg>
              <h2
                className="font-['Anton',sans-serif] text-[26px] sm:text-[calc(26*var(--u))] leading-[1.05] uppercase whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Subtractive<br />machining
              </h2>
              <p
                className="font-['Archivo',sans-serif] text-[13px] sm:text-[calc(12.4*var(--u))] leading-normal whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Multi-axis milling and turning for precision finishing of cast, wrought and additively built parts.
              </p>
            </article>

            {/* Card 3: Welding and Joining */}
            <article className="card-item w-[250px] sm:w-[calc(270*var(--u))] px-5 sm:px-[calc(30*var(--u))] flex flex-col gap-[calc(14*var(--u))] shrink-0 border-l border-white/12">
              <svg className="size-[calc(38*var(--u))] stroke-white fill-none stroke-[1.5]" viewBox="0 0 38 38">
                <path d="M12 6 L18 18 L15 20 L9 8 Z" />
                <line x1="18" y1="18" x2="24" y2="28" />
                <circle cx="25" cy="29" r="1.5" fill="currentColor" />
                <path d="M22 24 L20 22 M27 26 L30 25 M28 31 L32 32 M23 33 L21 36" />
                <line x1="4" y1="33" x2="34" y2="33" />
              </svg>
              <h2
                className="font-['Anton',sans-serif] text-[26px] sm:text-[calc(26*var(--u))] leading-[1.05] uppercase whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welding<br />and joining
              </h2>
              <p
                className="font-['Archivo',sans-serif] text-[13px] sm:text-[calc(12.4*var(--u))] leading-normal whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Arc and friction stir joining, with procedure development and distortion control for thin-wall structures.
              </p>
            </article>

            {/* Card 4: Materials Science */}
            <article className="card-item w-[250px] sm:w-[calc(270*var(--u))] px-5 sm:px-[calc(30*var(--u))] flex flex-col gap-[calc(14*var(--u))] shrink-0 border-l border-white/12">
              <svg className="size-[calc(38*var(--u))] stroke-white fill-none stroke-[1.5]" viewBox="0 0 38 38">
                <polygon points="19,6 30,12 30,26 19,32 8,26 8,12" />
                <line x1="19" y1="6" x2="19" y2="19" />
                <line x1="8" y1="12" x2="19" y2="19" />
                <line x1="30" y1="12" x2="19" y2="19" />
                <line x1="8" y1="26" x2="19" y2="19" />
                <line x1="30" y1="26" x2="19" y2="19" />
                <line x1="19" y1="32" x2="19" y2="19" />
              </svg>
              <h2
                className="font-['Anton',sans-serif] text-[26px] sm:text-[calc(26*var(--u))] leading-[1.05] uppercase whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Materials<br />science
              </h2>
              <p
                className="font-['Archivo',sans-serif] text-[13px] sm:text-[calc(12.4*var(--u))] leading-normal whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Microstructure, hardness and tensile testing that link process parameters to grain structure and properties.
              </p>
            </article>

            {/* Card 5: Simulation and Inspection */}
            <article className="card-item w-[250px] sm:w-[calc(270*var(--u))] px-5 sm:px-[calc(30*var(--u))] flex flex-col gap-[calc(14*var(--u))] shrink-0 border-l border-white/12">
              <svg className="size-[calc(38*var(--u))] stroke-white fill-none stroke-[1.5]" viewBox="0 0 38 38">
                <rect x="7" y="7" width="24" height="24" />
                <line x1="7" y1="15" x2="31" y2="15" />
                <line x1="7" y1="23" x2="31" y2="23" />
                <line x1="15" y1="7" x2="15" y2="31" />
                <line x1="23" y1="7" x2="23" y2="31" />
                <polyline points="14,20 18,24 25,16" stroke="#2f63ff" strokeWidth="2.5" />
              </svg>
              <h2
                className="font-['Anton',sans-serif] text-[26px] sm:text-[calc(26*var(--u))] leading-[1.05] uppercase whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Simulation<br />and inspection
              </h2>
              <p
                className="font-['Archivo',sans-serif] text-[13px] sm:text-[calc(12.4*var(--u))] leading-normal whitespace-normal transition-[background] duration-100"
                style={{
                  background: "linear-gradient(90deg, #ffffff var(--s-34, 0%), #2f63ff var(--s-6, 0%), transparent var(--s-plus-26, 100%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Thermal and residual-stress modelling, plus non-destructive and dimensional inspection to qualify parts.
              </p>
            </article>
          </div>

          {/* Capabilities Pill */}
          <div
            className={[
              "absolute bottom-[calc(36*var(--u))] left-1/2 -translate-x-1/2 font-['Archivo',sans-serif] font-medium text-[calc(10*var(--u))] tracking-[0.1em] uppercase text-white px-[calc(16*var(--u))] py-[calc(7*var(--u))] border border-white/35 rounded-full whitespace-nowrap pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isSettled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            Our capabilities
          </div>
        </div>
      </div>
    </div>
  );
}
