"use client";

import { useMemo, useState, useEffect } from "react";
import { X, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { people, type Person, type PersonType } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";

const tabs = [
  { label: "M.Tech Projects", value: "student" as PersonType },
  { label: "PhD Research", value: "phd" as PersonType },
];

const cohortsForType: Record<PersonType, string[]> = {
  faculty: [],
  staff: [],
  student: ["2025-2027", "2024-2026", "2026-2028"],
  phd: ["2025", "2024", "2023", "2022", "2021"],
};

export function ResearchDirectory() {
  const [type, setType] = useState<PersonType>("student");
  const [cohort, setCohort] = useState("2025-2027");
  const [preview, setPreview] = useState<Person | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(
    () =>
      people.filter((person) => {
        if (person.type !== type) return false;
        if (!person.projects || person.projects.length === 0) return false;
        if (type === "student") return person.cohort === cohort;
        if (type === "phd") return person.admissionYear === cohort;
        return true;
      }),
    [type, cohort]
  );

  const availableCohorts = cohortsForType[type];

  const handleTypeChange = (newType: PersonType) => {
    setType(newType);
    setCohort(cohortsForType[newType][0] ?? "");
    setVisibleCount(6);
  };

  const handleCohortChange = (newCohort: string) => {
    setCohort(newCohort);
    setVisibleCount(6);
  };

  // Auto scroll reveal — throttled + passive for mobile perf
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop + clientHeight >= scrollHeight - 400) {
          setVisibleCount((prev) => Math.min(prev + 6, filtered.length));
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filtered.length]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        
        {/* Top Header Row with Title/Paragraph on Left and Category/Cohort Selectors on Right */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start border-b border-[var(--edge)] pb-6">
          <div className="max-w-2xl">
            <span className="font-data text-xs font-semibold tracking-wider text-[var(--arc-blue)] select-none">
              Projects & Research
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-[var(--ceramic)] sm:text-4xl">
              Ongoing M.Tech and PhD Work
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--ceramic-muted)]">
              Select a project from the directory below to view abstract details, progress summaries, and researcher profiles.
            </p>
          </div>

          {/* Selectors Container */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-auto shrink-0">
            {/* Category Selector */}
            <div className="flex flex-col gap-1.5 rounded-lg border border-[var(--edge)] bg-[var(--panel)] p-2.5 w-full sm:w-[220px]">
              <span className="font-data text-[10px] font-semibold tracking-wider text-[var(--ceramic-muted)] select-none">
                Category
              </span>
              <div className="flex flex-col gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleTypeChange(tab.value)}
                    className={[
                      "w-full text-left rounded border px-2.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-between",
                      type === tab.value
                        ? "border-[var(--arc-blue)] bg-[var(--arc-blue)] text-white shadow-[var(--shadow-glow-blue)]"
                        : "border-[var(--edge)] bg-[var(--void)] text-[var(--ceramic-muted)] hover:border-[var(--arc-blue)] hover:text-[var(--ceramic)]",
                    ].join(" ")}
                  >
                    <span>{tab.label}</span>
                    <span className={[
                      "text-[10px] px-1.5 py-0.2 rounded-full font-data",
                      type === tab.value ? "bg-white/20 text-white" : "bg-[var(--panel)] text-[var(--ceramic-muted)]",
                    ].join(" ")}>
                      {people.filter(p => p.type === tab.value && p.projects && p.projects.length > 0).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cohort Year Selector */}
            {availableCohorts.length > 0 && (
              <div className="flex flex-col gap-1.5 rounded-lg border border-[var(--edge)] bg-[var(--panel)] p-2.5 w-full sm:w-[150px]">
                <span className="font-data text-[10px] font-semibold tracking-wider text-[var(--ceramic-muted)] select-none">
                  Cohort
                </span>
                <div className="flex flex-col gap-1">
                  {availableCohorts.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleCohortChange(item)}
                      className={[
                        "w-full text-left rounded border px-2.5 py-1.5 font-data text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer",
                        cohort === item
                          ? "border-[var(--forge-amber)] bg-[var(--forge-amber)] text-white shadow-[var(--shadow-glow-amber)]"
                          : "border-[var(--edge)] bg-[var(--void)] text-[var(--ceramic-muted)] hover:border-[var(--forge-amber)] hover:text-[var(--ceramic)]",
                      ].join(" ")}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Name Navigation Ribbon - Shows all names in a single horizontal scrolling row */}
        <div className="rounded-lg border border-[var(--edge)] bg-[var(--void-deep)]/40 p-4 overflow-hidden select-none">
          <span className="block font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)] mb-2.5">
            Quick Select ({filtered.length} Projects)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {filtered.map((person) => (
              <button
                key={person.slug}
                type="button"
                onClick={() => setPreview(person)}
                className={[
                  "w-full rounded border px-2.5 py-1.5 font-display text-xs font-medium transition-colors duration-150 cursor-pointer flex items-center gap-2 text-left justify-start min-w-0",
                  type === "student"
                    ? "border-[var(--edge)] bg-[var(--panel)] text-[var(--ceramic)] hover:border-[var(--forge-amber)]"
                    : "border-[var(--edge)] bg-[var(--panel)] text-[var(--ceramic)] hover:border-[var(--laser-green)]",
                ].join(" ")}
              >
                <span className={[
                  "size-1.5 rounded-full shrink-0 opacity-80",
                  type === "student" ? "bg-[var(--forge-amber)]" : "bg-[var(--laser-green)]",
                ].join(" ")} />
                <span className="truncate">{person.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <span className="col-span-full text-xs text-[var(--ceramic-muted)] italic py-1 select-none">No active projects in selected cohort.</span>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <section className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.slice(0, visibleCount).map((person) => {
              const project = person.projects[0];
              return (
                <GlassCard
                  key={person.slug}
                  variant={type === "phd" ? "featured" : "compact"}
                  accent={type === "phd" ? "green" : undefined}
                  onClick={() => setPreview(person)}
                  className="cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">
                        {type === "student" 
                          ? `${person.batch} · ${person.specialization}`
                          : `${person.admissionYear}${person.mode ? ` · ${person.mode}` : ""}`
                        }
                      </span>
                      {project.status && (
                        <span className={[
                          "font-data text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded border",
                          project.status === "Completed"
                            ? "border-[var(--laser-green)] text-[var(--laser-green)] bg-[var(--laser-green)]/10"
                            : project.status === "Ongoing"
                            ? "border-[var(--forge-amber)] text-[var(--forge-amber)] bg-[var(--forge-amber)]/10"
                            : "border-[var(--edge)] text-[var(--ceramic-muted)] bg-[var(--panel)]",
                        ].join(" ")}>
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-[var(--ceramic)] group-hover:text-[var(--arc-blue)] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--arc-blue)]">{person.name}</p>
                    {type === "phd" && person.supervisor && (
                      <p className="mt-0.5 text-xs text-[var(--ceramic-muted)]">Supervisor: {person.supervisor}</p>
                    )}
                    <p className="mt-2 text-sm leading-6 text-[var(--ceramic-muted)] line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-[var(--edge)]/40 flex justify-between items-center">
                    <span className="text-xs text-[var(--ceramic-muted)] group-hover:text-[var(--ceramic)] transition-colors duration-200 flex items-center gap-1.5">
                      <Eye size={13} /> Quick Preview
                    </span>
                    <Link
                      href={`/people/${person.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200"
                    >
                      Full Profile <ArrowRight size={12} />
                    </Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filtered.length))}
                className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-4 py-2 font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)] hover:border-[var(--arc-blue)] hover:text-[var(--arc-blue)] hover:shadow-[var(--shadow-glow-blue)] transition-all duration-200 cursor-pointer"
              >
                Load More Projects (+{filtered.length - visibleCount})
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-[var(--void)]/80 backdrop-blur-sm p-0 sm:place-items-center sm:p-4" role="dialog" aria-modal="true">
          <div className="max-h-[92svh] w-full max-w-4xl overflow-auto rounded-t-lg bg-[var(--void-deep)] border border-[var(--edge)] shadow-2xl sm:max-h-[90vh] sm:rounded-lg">
            <div className="sticky top-0 z-10 flex justify-end border-b border-[var(--edge)] bg-[var(--void-deep)]/95 backdrop-blur-sm p-3">
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="grid size-9 place-items-center rounded-md border border-[var(--edge)] bg-[var(--panel)] text-[var(--ceramic-muted)] hover:border-[var(--stress-red)] hover:text-[var(--stress-red)] transition-colors duration-200 cursor-pointer"
                aria-label="Close project preview"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="border-b border-[var(--edge)] pb-6 mb-6">
                <span className="font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)]">
                  {preview.type === "student" ? "M.Tech Project Dossier" : "PhD Research Dossier"}
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight text-[var(--ceramic)]">
                  {preview.projects[0].title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ceramic-muted)]">
                  <div>
                    <span className="font-semibold text-[var(--ceramic)]">Researcher:</span>{" "}
                    <Link href={`/people/${preview.slug}`} className="text-[var(--arc-blue)] hover:underline">
                      {preview.name}
                    </Link>
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--ceramic)]">Cohort:</span> {preview.batch ?? preview.cohort ?? preview.admissionYear}
                  </div>
                  {preview.supervisor && (
                    <div>
                      <span className="font-semibold text-[var(--ceramic)]">Supervisor:</span> {preview.supervisor}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)] mb-3">Project Summary</h3>
                <p className="leading-7 text-[var(--ceramic-muted)] text-base whitespace-pre-line">
                  {preview.projects[0].summary}
                </p>
                
                <div className="mt-8 pt-6 border-t border-[var(--edge)] flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    {preview.skills.slice(0, 5).map((skill) => (
                      <span key={skill} className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2.5 py-1 text-xs text-[var(--ceramic-muted)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/people/${preview.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-4 py-2 text-sm font-medium text-[var(--ceramic)] hover:border-[var(--arc-blue)] hover:text-[var(--arc-blue)] transition-all duration-200"
                  >
                    View Researcher&apos;s Full Profile <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
