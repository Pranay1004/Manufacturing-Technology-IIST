import { PageFrame } from "@/components/site-shell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { GlassCard } from "@/components/ui/GlassCard";
import { academicEvents, collaborations } from "@/lib/data";
import { ResearchDirectory } from "@/components/research-directory";

export default function ResearchPage() {
  const areas = [
    "Additive manufacturing for aerospace structures",
    "Aerospace alloys, hot working, and deformation processing",
    "Composite manufacturing and inspection-ready quality workflows",
    "Welding, joining, and heat affected zone studies",
    "Manufacturing scheduling, operations research, and supply chain systems",
    "CAD-CAM, subtractive manufacturing, and hybrid process planning",
  ];

  return (
    <PageFrame>
      <main>
        <ResearchDirectory />

        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">

        {/* ─── Themes & Outputs ─── */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal variant="left" as="section">
            <Divider className="mb-6" />
            <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">Project themes</h2>
            <div className="mt-5 space-y-3">
              {areas.map((area) => (
                <div key={area} className="flex gap-3 text-sm leading-7 text-[var(--ceramic-muted)]">
                  <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[var(--arc-blue)]" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal variant="right" as="section">
            <Divider className="mb-6" />
            <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">Publication-ready outputs</h2>
            <div className="mt-5 space-y-4">
              {[
                "Thesis synopsis and abstract pages for each M.Tech scholar",
                "Doctoral progress summaries under the relevant faculty supervisor",
                "Conference papers, journal submissions, posters, and technical reports when approved",
                "Project media, process sheets, lab notes, datasets, and downloadable public artifacts",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-7 text-[var(--ceramic-muted)]">
                  <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[var(--forge-amber)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ─── Events & Collaborations ─── */}
        <section className="mt-16 grid gap-12 lg:grid-cols-2">
          <ScrollReveal variant="left" as="div">
            <Divider className="mb-6" />
            <SectionLabel color="amber">Conferences, seminars, workshops</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-bold text-[var(--ceramic)]">Department event record</h2>
            <div className="mt-5 space-y-4">
              {academicEvents.map((event, i) => (
                <ScrollReveal key={event.title} delay={i * 60}>
                  <GlassCard variant="compact">
                    <span className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">{event.date}</span>
                    <h3 className="mt-2 font-display text-xl font-bold text-[var(--ceramic)]">{event.title}</h3>
                    <p className="mt-1 text-sm text-[var(--arc-blue)]">{event.scope}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal variant="right" as="div">
            <Divider className="mb-6" />
            <SectionLabel color="green">MoUs and collaborations</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-bold text-[var(--ceramic)]">Relevant institutional links</h2>
            <div className="mt-5 space-y-4">
              {collaborations.map((item, i) => (
                <ScrollReveal key={item.partner} delay={i * 60}>
                  <GlassCard variant="featured" accent="green">
                    <h3 className="font-display text-xl font-bold text-[var(--ceramic)]">{item.partner}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--ceramic-muted)]">{item.summary}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </section>
        </div>
      </main>
    </PageFrame>
  );
}
