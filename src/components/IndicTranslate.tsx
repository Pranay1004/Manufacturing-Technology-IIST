"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const indicLanguages: Language[] = [
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
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function IndicTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load Google Translate script dynamically if not present
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check existing cookie
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
      const trimmed = c.trim();
      if (trimmed.startsWith("googtrans=")) {
        const val = trimmed.split("=")[1];
        const target = val.split("/").pop();
        if (target && indicLanguages.some((l) => l.code === target)) {
          setSelectedLang(target);
        }
      }
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", autoDisplay: false },
            "google_translate_element"
          );
        }
      };
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

    if (code === "en") {
      // Clear cookie to reset to native English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
      window.location.reload();
      return;
    }

    // Set google translate cookie: /en/targetCode
    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; domain=${window.location.hostname}; path=/;`;

    // Attempt to trigger the native select if available
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const current = indicLanguages.find((l) => l.code === selectedLang) || indicLanguages[0];

  return (
    <div ref={dropdownRef} className="relative z-50 inline-block text-left">
      {/* Hidden container for the native Google Translate element */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Modern Indic Language Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 h-[27px] px-2.5 rounded-sm border border-[rgba(20,20,20,0.85)] bg-[#EDEBE6] hover:bg-[#141414] hover:text-[#EDEBE6] text-[#141414] text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-xs select-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Translate to Indic Languages"
      >
        <Globe size={12} className="text-[#1F3FB0]" aria-hidden />
        <span>{current.nativeName}</span>
        <ChevronDown size={11} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-sm border border-[rgba(20,20,20,0.85)] bg-[#FAF8F5] shadow-xl py-1 z-50 text-[#141414] animate-[fadeIn_0.15s_ease-out]">
          <div className="px-3 py-1.5 border-b border-[rgba(20,20,20,0.1)] text-[9px] font-semibold font-mono uppercase tracking-wider text-[#6D6A63]">
            Indic Languages / अनुवाद
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
                      ? "bg-[#1F3FB0] text-white font-semibold"
                      : "hover:bg-[#141414]/8 text-[#141414]",
                  ].join(" ")}
                >
                  <div className="flex flex-col">
                    <span className="text-[12px]">{lang.nativeName}</span>
                    <span className={`text-[8.5px] uppercase font-mono ${isSelected ? "text-white/80" : "text-[#6D6A63]"}`}>
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
