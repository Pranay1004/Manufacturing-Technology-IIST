import { ImageIcon, PlayCircle, Quote } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

const mediaSections = [
  {
    title: "Photos",
    label: "Lab Frames",
    icon: ImageIcon,
    tone: "var(--arc-blue)",
    items: [
      "Advanced manufacturing lab walkthroughs",
      "CAD-CAM, CNC, and process planning sessions",
      "Metrology, welding, composites, and materials work",
    ],
  },
  {
    title: "Videos",
    label: "Motion Records",
    icon: PlayCircle,
    tone: "var(--forge-amber)",
    items: [
      "Exploded-view equipment explainers",
      "Smooth process transitions from design to build",
      "Student project demos and lab capability reels",
    ],
  },
  {
    title: "Testimonials",
    label: "Voices",
    icon: Quote,
    tone: "var(--laser-green)",
    items: [
      "Student reflections from each academic year",
      "Alumni notes on manufacturing roles and research",
      "Industry and lab mentor comments after visits",
    ],
  },
];

export default function MediaPage() {
  return (
    <PageFrame>
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <ScrollReveal>
            <SectionLabel className="mb-3">Media</SectionLabel>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-[var(--ceramic)] sm:text-5xl">
              Photos, videos, and testimonials from the manufacturing technology program.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--ceramic-muted)] sm:text-lg sm:leading-8 text-justify">
              This page is prepared as the warm public archive for lab moments, process videos,
              student voices, and department stories.
            </p>
          </ScrollReveal>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-3 lg:px-8">
          {mediaSections.map((section) => {
            const Icon = section.icon;
            return (
              <GlassCard key={section.title} className="min-h-[360px] overflow-hidden">
                <div className="relative min-h-40 rounded-lg border border-[var(--edge)] bg-[var(--void-deep)] surface-grid">
                  <span
                    className="absolute left-6 top-6 grid size-14 place-items-center rounded-md border border-[var(--edge)] bg-[var(--panel)] shadow-[var(--shadow-sm)]"
                    style={{ color: section.tone }}
                  >
                    <Icon size={26} aria-hidden />
                  </span>
                  <span
                    className="absolute bottom-8 left-8 h-2 w-28 rounded-full"
                    style={{ background: section.tone }}
                  />
                  <span
                    className="absolute bottom-14 left-20 h-2 w-40 rounded-full opacity-45"
                    style={{ background: section.tone }}
                  />
                  <span className="absolute right-8 top-8 size-20 rounded-lg border border-[var(--edge)] bg-[var(--panel)]/70 shadow-[var(--shadow-sm)] [transform:perspective(700px)_rotateX(58deg)_rotateZ(-22deg)]" />
                  <span className="absolute right-16 top-20 size-16 rounded-lg border border-[var(--edge)] bg-[var(--panel)]/70 shadow-[var(--shadow-sm)] [transform:perspective(700px)_rotateX(58deg)_rotateZ(-22deg)]" />
                </div>

                <p className="mt-5 font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">
                  {section.label}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-[var(--ceramic)]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-[var(--ceramic-muted)]">
                      <span
                        className="mt-2 block size-1.5 shrink-0 rounded-full"
                        style={{ background: section.tone }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </section>
      </main>
    </PageFrame>
  );
}
