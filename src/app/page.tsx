import Link from "next/link";
import { ArrowRight, Cpu, FileText, Layers, Rocket, Users, Zap } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { Portrait } from "@/components/person-card";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetalButton } from "@/components/ui/MetalButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Hero from "@/components/design/Hero";
import { getPeopleByType, industrialVisits, people, programHighlights } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

export default function Home() {
  const faculty = getPeopleByType("faculty");
  const publicPeople = people.filter((person) => person.cohort !== "2026-2028");
  const currentStudents = people.filter((person) => person.cohort === "2025-2027");

  const featureRows: [LucideIcon, string, string][] = [
    [Users, "Talent directory", "Search current students, outgoing batches, and PhD scholars by skill area."],
    [FileText, "Claimable profiles", "Each member can update synopsis, skills, projects, contact visibility, photo, and resume PDF."],
    [Rocket, "ISRO context", `Program exposure highlights ISRO centres including ${industrialVisits.join(", ")}.`],
  ];

  const stats = [
    { value: String(faculty.length), label: "Core Faculty", icon: Cpu },
    { value: String(publicPeople.filter((person) => person.type === "student").length), label: "PG Profiles", icon: Users },
    { value: String(people.filter((person) => person.type === "phd").length), label: "PhD Scholars", icon: Layers },
  ];

  return (
    <PageFrame>
      <main>
        <Hero />

        {/* ═══════════════════════════════════════════
            STATS — Animated counters
            ═══════════════════════════════════════════ */}
        <section className="relative border-y border-[var(--edge)] bg-[var(--void-deep)] surface-grid">
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-[var(--edge)] px-4 sm:px-6 lg:px-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <ScrollReveal key={label} variant="scale" className="py-8 sm:py-12 text-center">
                <Icon size={20} className="mx-auto mb-3 text-[var(--arc-blue)]" aria-hidden />
                <p className="font-display text-3xl font-bold text-[var(--ceramic)] sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 font-data text-[10px] uppercase tracking-[0.18em] text-[var(--ceramic-muted)]">
                  {label}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            HIGHLIGHTS — Program features
            ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden surface-machined">
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <ScrollReveal>
              <SectionLabel color="amber" className="mb-4">
                Program Highlights
              </SectionLabel>
              <h2 className="max-w-2xl font-display text-3xl font-bold text-[var(--ceramic)] sm:text-4xl">
                Built for aerospace manufacturing excellence
              </h2>
            </ScrollReveal>

            <div className="mt-10 space-y-4">
              {programHighlights.map((highlight, i) => (
                <ScrollReveal key={highlight} variant={i % 2 === 0 ? "left" : "right"}>
                  <div className="flex items-start gap-4 rounded-lg border border-[var(--edge)] bg-[var(--panel)]/50 p-4 sm:p-5 transition-colors duration-200 hover:border-[var(--edge-hover)]">
                    <Zap size={18} className="mt-0.5 shrink-0 text-[var(--forge-amber)]" aria-hidden />
                    <p className="text-sm leading-7 text-[var(--ceramic-muted)] sm:text-base">{highlight}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FACULTY — Academic leadership
            ═══════════════════════════════════════════ */}
        <section className="border-t border-[var(--edge)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <ScrollReveal variant="left">
                <SectionLabel className="mb-3">Faculty</SectionLabel>
                <h2 className="font-display text-3xl font-bold text-[var(--ceramic)] sm:text-4xl">
                  Academic leadership
                </h2>
                <p className="mt-4 leading-7 text-[var(--ceramic-muted)]">
                  The program is anchored by additive manufacturing, metallurgy, quality engineering,
                  manufacturing systems, and aerospace process expertise.
                </p>
              </ScrollReveal>

              <div className="grid gap-4 md:grid-cols-3">
                {faculty.map((person, i) => (
                  <ScrollReveal key={person.slug} variant="up" className={`delay-${i}`}>
                    <Link
                      href="/faculty"
                      className="group block"
                    >
                      <GlassCard>
                        <Portrait name={person.name} />
                        <h3 className="mt-4 font-display text-xl font-semibold text-[var(--ceramic)] group-hover:text-[var(--arc-blue)] transition-colors duration-200">
                          {person.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-[var(--arc-blue)]">{person.role}</p>
                        <p className="mt-3 text-sm leading-6 text-[var(--ceramic-muted)]">{person.specialization}</p>
                      </GlassCard>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FEATURES — Directory capabilities
            ═══════════════════════════════════════════ */}
        <section className="border-t border-[var(--edge)] bg-[var(--void-deep)] surface-grid">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3 lg:px-8">
            {featureRows.map(([Icon, title, text]) => (
              <ScrollReveal key={title} variant="up">
                <GlassCard>
                  <div className="mb-4 grid size-10 place-items-center rounded-md bg-[var(--forge-amber-dim)]">
                    <Icon className="text-[var(--forge-amber)]" size={20} aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--ceramic)]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ceramic-muted)]">{text}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            COHORT — Current students
            ═══════════════════════════════════════════ */}
        <section className="border-t border-[var(--edge)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
              <ScrollReveal variant="left">
                <SectionLabel color="amber" className="mb-3">2025-2027</SectionLabel>
                <h2 className="font-display text-3xl font-bold text-[var(--ceramic)] sm:text-4xl">
                  Current M.Tech cohort
                </h2>
              </ScrollReveal>
              <MetalButton href="/people" variant="ghost">
                View full directory <ArrowRight size={14} aria-hidden />
              </MetalButton>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {currentStudents.slice(0, 8).map((person) => (
                <ScrollReveal key={person.slug} variant="up">
                  <Link
                    href={`/people/${person.slug}`}
                    className="group block rounded-lg border border-[var(--edge)] bg-[var(--panel)]/50 p-4 transition-all duration-200 hover:border-[var(--edge-active)] hover:shadow-[var(--shadow-glow-blue)] hover:-translate-y-0.5"
                  >
                    <p className="font-display text-lg font-semibold text-[var(--ceramic)] group-hover:text-[var(--arc-blue)] transition-colors duration-200">
                      {person.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--arc-blue)]">{person.specialization}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
