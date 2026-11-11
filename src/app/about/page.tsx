import { PageFrame } from "@/components/site-shell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { curriculum, programHighlights } from "@/lib/data";

export default function AboutPage() {
  return (
    <PageFrame>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ScrollReveal>
          <SectionLabel className="mb-3">Program Overview</SectionLabel>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-[var(--ceramic)] sm:text-5xl">
            M.Tech Manufacturing Technology under Aerospace Engineering at IIST.
          </h1>
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <ScrollReveal variant="left" as="aside">
            <h2 className="font-display text-2xl font-bold text-[var(--ceramic)]">Salient features</h2>
            <div className="mt-5 space-y-3">
              {programHighlights.map((item) => (
                <div key={item} className="rounded-lg border border-[var(--edge)] bg-[var(--panel)]/50 p-4 transition-colors duration-200 hover:border-[var(--edge-hover)]">
                  <p className="text-sm leading-7 text-[var(--ceramic-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" as="article">
            <div className="space-y-5 text-base leading-7 text-[var(--ceramic-muted)] sm:text-lg sm:leading-8 text-justify">
              <p>
                In line with national initiatives such as Make in India and Atmanirbhar Bharat,
                manufacturing technology is a key subject domain for building strong career prospects,
                strategic capability, and research capacity.
              </p>
              <p>
                The Manufacturing Technology master&apos;s program initiated by IIST under the Department
                of Aerospace Engineering is oriented toward advanced manufacturing processes for aerospace
                applications. It covers additive manufacturing and smart practices, composite manufacturing
                technology, deformation and joining processes, computer-aided subtractive manufacturing,
                manufacturing planning and control, and hands-on work with manufacturing, testing, and
                characterization equipment.
              </p>
              <p>
                The program is designed to develop creative and technologically competent human resources,
                while opening research avenues connected to ISRO centres, aerospace manufacturing case
                studies, space-oriented demonstrations, internships, and project opportunities.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <section className="mt-12 border-t border-[var(--edge)] pt-8">
          <ScrollReveal>
            <SectionLabel color="amber" className="mb-3">
              Curriculum effective from 2024 admission
            </SectionLabel>
          </ScrollReveal>

          <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <ScrollReveal variant="left">
              <div className="space-y-5 text-base leading-7 text-[var(--ceramic-muted)] text-justify">
                <p>
                  <strong className="text-[var(--ceramic)]">Vision:</strong> {curriculum.vision}
                </p>
                <p>
                  <strong className="text-[var(--ceramic)]">Mission:</strong> {curriculum.mission}
                </p>
                <p>
                  <strong className="text-[var(--ceramic)]">Objective:</strong> {curriculum.objective}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {curriculum.semesters.map((semester) => (
                <ScrollReveal key={semester.title} variant="up">
                  <GlassCard>
                    <SectionLabel color="amber" className="mb-2">
                      {semester.credits} credits
                    </SectionLabel>
                    <h2 className="font-display text-xl font-bold text-[var(--ceramic)]">{semester.title}</h2>
                    <div className="mt-3 space-y-2">
                      {semester.courses.map((course) => (
                        <p key={course} className="text-sm leading-6 text-[var(--ceramic-muted)]">
                          {course}
                        </p>
                      ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal className="mt-12 border-t border-[var(--edge)] pt-6">
            <h2 className="font-display text-2xl font-bold text-[var(--ceramic)]">Elective spread</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {curriculum.electives.map((elective) => (
                <span key={elective} className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 py-1.5 text-sm text-[var(--ceramic-muted)] transition-colors duration-200 hover:border-[var(--arc-blue)] hover:text-[var(--arc-blue)]">
                  {elective}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </main>
    </PageFrame>
  );
}
