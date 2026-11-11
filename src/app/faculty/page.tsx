import Link from "next/link";
import { ArrowRight, ExternalLink, Mail, Share2 } from "lucide-react";
import { getPeopleByType } from "@/lib/data";
import { PageFrame } from "@/components/site-shell";
import { Portrait } from "@/components/person-card";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

const researchThemes = [
  "Space Additive & Subtractive Manufacturing",
  "Aerospace Metallurgy & Cryogenic Deformation",
  "FBTIG, EBW & Solid-State Joining",
  "ICME, Alloy Design & Operations Scheduling",
];

export default function FacultyPage() {
  const faculty = getPeopleByType("faculty");
  const staff = getPeopleByType("staff");
  const members = [...faculty, ...staff];

  return (
    <PageFrame>
      <main>
        {/* Asymmetric Architectural Intro Band (Left-Aligned Editorial Monograph) */}
        <section className="border-b border-[var(--edge)] bg-[var(--void-deep)] surface-grid">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
              <div>
                <SectionLabel color="amber" className="mb-3">
                  Department of Aerospace Engineering · IIST
                </SectionLabel>
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ceramic)] leading-tight">
                  Faculty, Research Labs & Technical Officers
                </h1>
                <div className="mt-4 h-0.5 w-14 bg-[var(--arc-blue)]" aria-hidden />
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-base leading-7 text-[var(--ceramic-muted)] text-left">
                  Faculty groups in Manufacturing Technology pair fundamental materials physics with
                  flight-qualified aerospace hardware through joint programs with VSSC, LPSC, IISU,
                  and CMSE—spanning orbital microgravity payloads such as ARIS on PSLV-C45, granted
                  patents in smart additive grinding and combustion rigs, high-energy welding
                  metallurgy, cryogenic forming, ICME alloy informatics, and manufacturing scheduling.
                </p>
                <div className="flex flex-wrap gap-2">
                  {researchThemes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2.5 py-1 text-xs font-medium text-[var(--ceramic-muted)]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty & Staff Cards (Structured 3x2 Desktop Grid) */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          {members.map((person) => (
            <GlassCard key={person.slug} className="flex h-full flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="flex items-start gap-4">
                  <Portrait name={person.name} photoUrl={person.photoUrl} />
                  <div className="min-w-0">
                    <p className="font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)]">
                      {person.role}
                    </p>
                    <h2 className="mt-1.5 font-display text-xl font-bold leading-snug text-[var(--ceramic)]">
                      {person.name}
                    </h2>
                    <p className="mt-1.5 text-xs leading-5 text-[var(--ceramic-muted)] line-clamp-3">
                      {person.specialization}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--edge)] flex flex-wrap gap-1.5">
                  {person.skills.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-[11px] font-medium text-[var(--ceramic-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[var(--ceramic-muted)] text-left">
                  {person.synopsis}
                </p>

                {person.projects && person.projects.length > 0 && (
                  <div className="mt-4 rounded-lg border border-[var(--edge)] bg-[var(--panel)]/50 p-3">
                    <p className="font-data text-[11px] font-semibold tracking-wide text-[var(--arc-blue)]">
                      Projects & Patents ({person.projects.length})
                    </p>
                    <ul className="mt-1.5 space-y-1 text-xs text-[var(--ceramic-muted)]">
                      {person.projects.slice(0, 2).map((proj) => (
                        <li key={proj.title} className="truncate">
                          · {proj.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--edge)] flex flex-wrap items-center gap-2">
                <Link
                  href={`/people/${person.slug}`}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-[var(--arc-blue)] px-3 text-xs font-semibold text-white hover:brightness-95 transition-all"
                >
                  <span>Full Dossier</span>
                  <ArrowRight size={13} aria-hidden />
                </Link>
                <a
                  href={`mailto:${person.officialEmail}`}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-xs font-medium text-[var(--ceramic)] hover:border-[var(--arc-blue)] transition-colors"
                >
                  <Mail size={13} aria-hidden />
                  <span>Email</span>
                </a>
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-xs font-medium text-[var(--ceramic)] hover:border-[var(--arc-blue)] transition-colors"
                  >
                    <Share2 size={13} aria-hidden />
                    <span>LinkedIn</span>
                  </a>
                )}
                {person.sourceUrl && (
                  <a
                    href={person.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-xs font-medium text-[var(--ceramic)] hover:border-[var(--forge-amber)] transition-colors"
                  >
                    <ExternalLink size={13} aria-hidden />
                    <span>IIST</span>
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </section>
      </main>
    </PageFrame>
  );
}
