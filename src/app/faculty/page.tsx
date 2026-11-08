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
      <main className="pt-6 sm:pt-10">
        {/* Faculty & Staff Cards */}
        <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          {members.map((person) => (
            <GlassCard key={person.slug} className="flex h-full flex-col">
              <div className="flex items-start gap-4">
                <Portrait name={person.name} photoUrl={person.photoUrl} />
                <div className="min-w-0">
                  <p className="font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)]">
                    {person.role}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-[var(--ceramic)]">
                    {person.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--ceramic-muted)]">
                    {person.specialization}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(person.researchInterests ?? person.skills).slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-xs text-[var(--ceramic-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-5 flex-1 text-sm leading-6 text-[var(--ceramic-muted)]">
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
