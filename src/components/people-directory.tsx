"use client";

import { useMemo, useState, useEffect } from "react";
import { X } from "lucide-react";
import { people, type Person, type PersonType } from "@/lib/data";
import { PersonCard, Portrait, ProfileActions } from "@/components/person-card";

const tabs: { label: string; value: PersonType }[] = [
  { label: "M.Tech Students", value: "student" },
  { label: "PhD Scholars", value: "phd" },
];

const cohortsForType: Record<PersonType, string[]> = {
  faculty: [],
  staff: [],
  student: ["2025-2027", "2024-2026", "2026-2028"],
  phd: ["2025", "2024", "2023", "2022", "2021"],
};

export function PeopleDirectory() {
  const [type, setType] = useState<PersonType>("student");
  const [cohort, setCohort] = useState("2025-2027");
  const [preview, setPreview] = useState<Person | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = useMemo(
    () =>
      people.filter((person) => {
        if (person.type !== type) return false;
        if (type === "student") return person.cohort === cohort;
        if (type === "phd") return person.admissionYear === cohort;
        return true;
      }),
    [type, cohort],
  );

  const availableCohorts = cohortsForType[type];

  const handleTypeChange = (newType: PersonType) => {
    setType(newType);
    setCohort(cohortsForType[newType][0] ?? "");
    setVisibleCount(8);
  };

  const handleCohortChange = (newCohort: string) => {
    setCohort(newCohort);
    setVisibleCount(8);
  };

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
          setVisibleCount((prev) => Math.min(prev + 8, filtered.length));
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
        
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start border-b border-[var(--edge)] pb-6">
          <div className="max-w-2xl">
            <span className="font-data text-xs font-semibold tracking-wider text-[var(--arc-blue)] select-none">
              People Directory
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-[var(--ceramic)] sm:text-4xl">
              M.Tech Scholars & PhD Researchers
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--ceramic-muted)]">
              Academic directory arranged by cohort year. Select a profile card to view projects, research details, and upload credentials.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-auto shrink-0">
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
                      {people.filter(p => p.type === tab.value).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

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

        <div className="rounded-lg border border-[var(--edge)] bg-[var(--void-deep)]/40 p-4 overflow-hidden select-none">
          <span className="block font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)] mb-2.5">
            Quick Select ({filtered.length} Profiles)
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
              <span className="col-span-full text-xs text-[var(--ceramic-muted)] italic py-1 select-none">No active profiles in selected cohort.</span>
            )}
          </div>
        </div>

        <section className="flex flex-col gap-6">
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {filtered.slice(0, visibleCount).map((person) => (
              <PersonCard key={person.slug} person={person} onPreview={setPreview} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 8, filtered.length))}
                className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-4 py-2 font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)] hover:border-[var(--arc-blue)] hover:text-[var(--arc-blue)] hover:shadow-[var(--shadow-glow-blue)] transition-all duration-200 cursor-pointer"
              >
                Load More Profiles (+{filtered.length - visibleCount})
              </button>
            </div>
          )}
        </section>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-[var(--void)]/80 backdrop-blur-sm p-0 sm:place-items-center sm:p-4" role="dialog" aria-modal="true">
          <div className="max-h-[92svh] w-full max-w-4xl overflow-auto rounded-t-lg bg-[var(--void-deep)] border border-[var(--edge)] shadow-2xl sm:max-h-[90vh] sm:rounded-lg">
            <div className="sticky top-0 z-10 flex justify-end border-b border-[var(--edge)] bg-[var(--void-deep)]/95 backdrop-blur-sm p-3">
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="grid size-9 place-items-center rounded-md border border-[var(--edge)] bg-[var(--panel)] text-[var(--ceramic-muted)] hover:border-[var(--stress-red)] hover:text-[var(--stress-red)] transition-colors duration-200 cursor-pointer"
                aria-label="Close profile preview"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <div className="grid gap-5 p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:p-6 md:grid-cols-[176px_minmax(0,1fr)]">
              <div className="flex justify-center sm:justify-start sm:block">
                <Portrait name={preview.name} large />
              </div>
              <div className="min-w-0">
                <p className="font-data text-[11px] uppercase tracking-[0.18em] text-[var(--forge-amber)]">
                  {preview.batch ?? preview.type}
                </p>
                <h2 className="mt-2 overflow-wrap-anywhere font-display text-3xl font-bold leading-tight text-[var(--ceramic)] sm:text-4xl">
                  {preview.name}
                </h2>
                <p className="mt-1 font-medium text-[var(--arc-blue)]">{preview.role}</p>
                <p className="mt-4 leading-7 text-[var(--ceramic-muted)]">{preview.synopsis}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {preview.skills.map((skill, idx) => (
                    <span key={`${skill}-${idx}`} className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-xs text-[var(--ceramic-muted)]">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <ProfileActions person={preview} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
