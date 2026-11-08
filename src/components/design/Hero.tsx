import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroVideoPlayer } from "@/components/design/HeroVideoPlayer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MetalButton } from "@/components/ui/MetalButton";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-12 lg:py-20 select-none bg-[var(--void)]">
      {/* Background blueprint details and radial lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--arc-blue-dim)_0%,_transparent_75%)] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 z-0 h-32 bg-gradient-to-t from-[var(--void)] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Majestic text and interactive controls */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <SectionLabel color="blue" className="mb-6 w-fit animate-[fadeIn_0.5s_ease-out]">
              M.Tech Program · Department of Aerospace Engineering
            </SectionLabel>

            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-[var(--ceramic)] sm:text-5xl lg:text-6xl xl:text-7xl animate-[fadeIn_0.6s_ease-out]">
              Manufacturing{" "}
              <span className="gradient-shimmer">
                Technology
              </span>
              <br />
              <span className="text-[var(--ceramic-muted)] font-display">for aerospace</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--ceramic-muted)] sm:text-lg sm:leading-8 animate-[fadeIn_0.7s_ease-out]">
              A structured IIST academic directory for faculty, M.Tech scholars, PhD researchers,
              facilities, projects, skills, resumes, and industry-facing opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-[fadeIn_0.8s_ease-out]">
              <MetalButton href="/people" variant="primary">
                Explore Profiles
                <ArrowRight size={16} aria-hidden />
              </MetalButton>
              <MetalButton href="/about" variant="secondary">
                Program Overview
              </MetalButton>
            </div>
          </div>

          {/* Right Column: Premium aerospace additive manufacturing video player */}
          <div className="lg:col-span-6 w-full flex items-center justify-center animate-[fadeIn_0.9s_ease-out]">
            <HeroVideoPlayer />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 scroll-indicator">
        <span className="font-data text-xs font-semibold tracking-wider text-[var(--ceramic-muted)]">Scroll</span>
        <ChevronDown size={16} className="text-[var(--ceramic-muted)]" />
      </div>
    </section>
  );
}
