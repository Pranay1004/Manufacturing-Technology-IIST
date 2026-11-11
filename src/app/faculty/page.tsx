import { ExternalLink, Mail, Share2 } from "lucide-react";
import { getPeopleByType } from "@/lib/data";
import { PageFrame } from "@/components/site-shell";
import { Portrait } from "@/components/person-card";
import { GlassCard } from "@/components/ui/GlassCard";

export default function FacultyPage() {
  const faculty = getPeopleByType("faculty");
  const staff = getPeopleByType("staff");
  const members = [...faculty, ...staff];

  return (
    <PageFrame>
      <main className="pt-8 sm:pt-12">
        {/* Research Overview & Thematic Domains */}
        <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ceramic)]">
            Faculty & Research Themes
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ceramic-muted)] text-justify sm:text-center max-w-4xl mx-auto">
            Research within the Manufacturing Technology stream in the Department of Aerospace Engineering at IIST bridges fundamental materials physics with flight-qualified manufacturing hardware. Across additive and subtractive manufacturing, aerospace metallurgy, solid-state and high-energy joining (FSW, FBTIG, Electron Beam Welding, and Wire Arc Additive Manufacturing), cryogenic and high-strain-rate metal forming, sustainable machining, precision metrology, and intelligent production scheduling, faculty groups lead collaborative programs with VSSC, LPSC, IISU, CMSE, and national research laboratories. These efforts span from orbit-proven microgravity payload prototyping such as ARIS on PSLV-C45 to multi-scale constitutive modeling, constitutive processing maps, and experimental laboratory instrumentation supporting M.Tech and PhD scholars.
          </p>
        </section>

        {/* Faculty & Staff Cards (3x2 Grid on Desktop) */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 pb-12 sm:px-6 lg:px-8">
          {members.map((person) => (
            <GlassCard key={person.slug} className="flex h-full flex-col">
              <div className="flex items-start gap-4">
                <Portrait name={person.name} photoUrl={person.photoUrl} />
                <div className="min-w-0">
                  <p className="font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)]">
                    {person.role}
                  </p>
                  <h2 className="mt-1.5 font-display text-xl font-bold leading-tight text-[var(--ceramic)]">
                    {person.name}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm leading-5 text-[var(--ceramic-muted)]">
                    {person.specialization}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {(person.researchInterests ?? person.skills).slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-[11px] text-[var(--ceramic-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-4 flex-1 text-xs sm:text-sm leading-6 text-[var(--ceramic-muted)] text-justify">
                {person.synopsis}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`mailto:${person.officialEmail}`}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[var(--arc-blue)] px-3 text-sm font-medium text-white hover:brightness-90 hover:shadow-[var(--shadow-glow-blue)] sm:flex-none"
                >
                  <Mail size={16} aria-hidden />
                  Email
                </a>
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-sm font-medium text-[var(--ceramic)] hover:border-[var(--arc-blue)] sm:flex-none"
                  >
                    <Share2 size={16} aria-hidden />
                    LinkedIn
                  </a>
                )}
                {person.sourceUrl && (
                  <a
                    href={person.sourceUrl}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-sm font-medium text-[var(--ceramic)] hover:border-[var(--forge-amber)] sm:flex-none"
                  >
                    <ExternalLink size={16} aria-hidden />
                    IIST Profile
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
