"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Sparkles } from "lucide-react";

export function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-pause when scrolled out of view to save 100% GPU / battery
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  return (
    <div className="relative w-full max-w-[560px] aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl border border-[var(--edge)] bg-[#14181B] shadow-2xl overflow-hidden flex flex-col group select-none">
      {/* Corner crosshairs (Aerospace Optical Inspection HUD) */}
      <div className="absolute top-2.5 left-2.5 size-3 border-t-2 border-l-2 border-white/60 z-20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 size-3 border-t-2 border-r-2 border-white/60 z-20 pointer-events-none" />
      <div className="absolute bottom-11 left-2.5 size-3 border-b-2 border-l-2 border-white/60 z-20 pointer-events-none" />
      <div className="absolute bottom-11 right-2.5 size-3 border-b-2 border-r-2 border-white/60 z-20 pointer-events-none" />

      {/* Top Header Overlay */}
      <div className="absolute top-0 inset-x-0 h-10 px-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-20 font-data text-[9.5px] tracking-wider text-white select-none">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="font-bold text-white/95">Additive DED · Wire Arc Process</span>
        </div>
        <div className="flex items-center gap-2 text-white/75 font-mono">
          <span>720p · 24 fps</span>
          <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/20 text-[8.5px]">HD</span>
        </div>
      </div>

      {/* Video Stream Container */}
      <div className="relative flex-1 w-full h-full bg-black overflow-hidden cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          poster="/media/videos/manufacturing-hero-poster.webp"
          className="w-full h-full object-cover"
        >
          <source src="/media/videos/manufacturing-hero.webm" type="video/webm" />
          <source src="/media/videos/manufacturing-hero.mp4" type="video/mp4" />
        </video>

        {/* Center Play Overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all z-10">
            <div className="size-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg transform scale-100 hover:scale-105 transition-transform">
              <Play size={20} className="ml-0.5 fill-black" />
            </div>
          </div>
        )}

        {/* Scanline / Grid subtle overlay for high-tech aerospace feeling */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      </div>

      {/* Real-time scrub line */}
      <div className="relative w-full h-1 bg-white/15 z-20">
        <div
          className="h-full bg-[var(--arc-blue)] transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="h-10 px-4 bg-[#14181B] border-t border-white/10 flex items-center justify-between font-data text-[9.5px] tracking-wide text-[#9BA3A9] select-none z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-1.5 text-white/90 hover:text-[var(--arc-blue)] transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={11} /> : <Play size={11} className="fill-current" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <span className="text-white/20">|</span>
          <span className="hidden xs:inline text-white/70">6-Axis Kinematics</span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--arc-blue)] font-bold">
          <Sparkles size={11} />
          <span>IIST Aerospace Lab</span>
        </div>
      </div>
    </div>
  );
}

