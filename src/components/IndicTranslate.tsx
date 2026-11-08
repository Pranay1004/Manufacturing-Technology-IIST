"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const indicLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English (Native)" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean; includedLanguages?: string },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function IndicTranslate({ compact = false }: { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read current active cookie on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const readCookie = () => {
      const cookies = document.cookie.split(";");
      for (const c of cookies) {
        const trimmed = c.trim();
        if (trimmed.startsWith("googtrans=")) {
          const val = trimmed.split("=")[1];
          const target = val ? val.split("/").pop() : "";
          if (target && indicLanguages.some((l) => l.code === target)) {
            setSelectedLang(target);
            return;
          }
        }
      }
      setSelectedLang("en");
    };

    readCookie();

    // Dynamically inject script once globally and ensure single container on body
    if (!document.getElementById("google-translate-script")) {
      if (!document.getElementById("global_google_translate_element")) {
        const container = document.createElement("div");
        container.id = "global_google_translate_element";
        container.style.position = "absolute";
        container.style.top = "-9999px";
        container.style.left = "-9999px";
        container.style.opacity = "0";
        container.style.pointerEvents = "none";
        document.body.appendChild(container);
      }

      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,ml,ta,te,kn,bn,mr,gu",
              autoDisplay: false,
            },
            "global_google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Close on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    setSelectedLang(code);
    setIsOpen(false);

    // Save cookie for persistence across pages (no domain restriction so it works on vercel.app and localhost)
    if (code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=/en/en; path=/;";
    } else {
      document.cookie = `googtrans=/en/${code}; path=/;`;
    }

    try {
      const hostname = window.location.hostname;
      if (!hostname.endsWith(".vercel.app") && hostname !== "localhost") {
        if (code === "en") {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
          document.cookie = `googtrans=/en/en; domain=${hostname}; path=/;`;
        } else {
          document.cookie = `googtrans=/en/${code}; domain=${hostname}; path=/;`;
        }
      }
    } catch {}

    // In-place live DOM translation: DO NOT RELOAD PAGE (reloading aborts in-flight Google translation)
    const triggerCombo = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event("change"));
        return true;
      }
      return false;
    };

    if (!triggerCombo()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerCombo() || attempts > 25) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const current = indicLanguages.find((l) => l.code === selectedLang) || indicLanguages[0];

  return (
    <div ref={dropdownRef} className="relative z-50 inline-block text-left">
      {/* Button Variant */}
      {compact ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="size-10 flex flex-col items-center justify-center text-[var(--ceramic-muted)] hover:text-white transition-colors cursor-pointer"
          aria-expanded={isOpen}
          title={`Language: ${current.nativeName}`}
        >
          <Globe size={16} className={selectedLang !== "en" ? "text-[var(--forge-amber)]" : "text-white/80"} />
          <span className="text-[9px] font-mono tracking-wider mt-0.5 font-semibold">
            {current.code}
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 h-[27px] px-2.5 rounded-xs border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] text-[#141414] text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer shadow-xs select-none"
          aria-expanded={isOpen}
          aria-haspopup="true"
          title="Translate to Indic Languages"
        >
          <Globe size={12} className="text-[#143B82]" aria-hidden />
          <span>{current.nativeName}</span>
          <ChevronDown size={11} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={[
            "absolute mt-1.5 w-48 rounded-sm border border-[rgba(20,20,20,0.85)] bg-[#FAF8F5] shadow-2xl py-1 z-[120] text-[#141414] animate-[fadeIn_0.15s_ease-out]",
            compact ? "left-full bottom-0 mb-1 ml-2" : "right-0 top-full",
          ].join(" ")}
        >
          <div className="px-3 py-1.5 border-b border-[rgba(20,20,20,0.1)] text-[10px] font-medium font-mono tracking-wide text-[#6D6A63]">
            Indic Languages / भाषा चयन
          </div>

          <div className="max-h-64 overflow-y-auto py-0.5">
            {indicLanguages.map((lang) => {
              const isSelected = lang.code === selectedLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={[
                    "w-full text-left px-3 py-1.5 text-[11px] font-medium flex items-center justify-between transition-colors cursor-pointer",
                    isSelected
                      ? "bg-[#143B82] text-white font-semibold"
                      : "hover:bg-[#141414]/8 text-[#141414]",
                  ].join(" ")}
                >
                  <div className="flex flex-col">
                    <span className="text-[12px]">{lang.nativeName}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? "text-white/80" : "text-[#6D6A63]"}`}>
                      {lang.name}
                    </span>
                  </div>
                  {isSelected && <Check size={13} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
