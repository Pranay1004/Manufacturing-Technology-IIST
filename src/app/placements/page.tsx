import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, Download, ExternalLink, GraduationCap, Mail, MapPin, Share2, Star, Users } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MetalButton } from "@/components/ui/MetalButton";
import { people, formatResumeUrl } from "@/lib/data";

// Domain groups for roles/skills
const domainSkills = [
  {
    domain: "Additive Manufacturing",
    color: "arc-blue",
    roles: ["Metal AM Engineer", "Process Engineer", "AM Design Engineer", "DMLS Specialist"],
  },
  {
    domain: "Composites & Materials",
    color: "forge-amber",
    roles: ["Composite Engineer", "Materials Analyst", "NDT Engineer", "Laminate Design Engineer"],
  },
  {
    domain: "Welding & Joining",
    color: "laser-green",
    roles: ["Welding Engineer", "Friction Stir Welding", "Weld Inspection Engineer", "Process Metallurgist"],
  },
  {
    domain: "CNC & Machining",
    color: "arc-blue",
    roles: ["CNC Programmer", "Manufacturing Engineer", "Tooling Engineer", "CAD-CAM Specialist"],
  },
  {
    domain: "Quality & Metrology",
    color: "forge-amber",
    roles: ["Quality Engineer", "Metrology Engineer", "PGET", "QA Analyst"],
  },
  {
    domain: "Systems & Operations",
    color: "laser-green",
    roles: ["Production Engineer", "Operations Engineer", "Smart Manufacturing Engineer", "Supply Chain Engineer"],
  },
];

const colorMap: Record<string, { badge: string; label: string; tag: string }> = {
  "arc-blue": {
    badge: "bg-[var(--arc-blue-dim)] border-[var(--arc-blue)]/20 text-[var(--arc-blue)]",
    label: "text-[var(--arc-blue)]",
    tag: "bg-[var(--arc-blue-dim)] text-[var(--arc-blue)] border-[var(--arc-blue)]/15",
  },
  "forge-amber": {
    badge: "bg-[var(--forge-amber-dim)] border-[var(--forge-amber)]/20 text-[var(--forge-amber)]",
    label: "text-[var(--forge-amber)]",
    tag: "bg-[var(--forge-amber-dim)] text-[var(--forge-amber)] border-[var(--forge-amber)]/15",
  },
  "laser-green": {
    badge: "bg-[rgba(47,139,95,0.07)] border-[var(--laser-green)]/20 text-[var(--laser-green)]",
    label: "text-[var(--laser-green)]",
    tag: "bg-[rgba(47,139,95,0.07)] text-[var(--laser-green)] border-[var(--laser-green)]/15",
  },
};

export default function PlacementsPage() {
  const outgoingBatch2025 = people.filter((p) => p.cohort === "2025-2027");
  const graduatedBatch2024 = people.filter((p) => p.cohort === "2024-2026");

  const stats = [
    { value: String(outgoingBatch2025.length), label: "Outgoing Scholars (2025–2027)", icon: Users },
    { value: "85.7%", label: "Placement Rate (2024–2026 Class)", icon: Star },
    { value: String(graduatedBatch2024.length), label: "Graduated Alumni", icon: GraduationCap },
    { value: "20+", label: "Target Roles Matched", icon: Briefcase },
  ];

  return (
    <PageFrame>
      <main>
        {/* ─── HERO ─── */}
        <section className="relative border-b border-[var(--edge)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--arc-blue-dim)_0%,_transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 surface-grid pointer-events-none opacity-50" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <ScrollReveal>
              <SectionLabel color="blue" className="mb-3">
                Campus Recruitment & Placements
              </SectionLabel>
              <h1 className="mt-2 max-w-4xl font-display text-4xl font-bold leading-tight text-[var(--ceramic)] sm:text-5xl lg:text-6xl">
                Hire manufacturing engineers{" "}
                <span className="gradient-shimmer">forged across all domains.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--ceramic-muted)] sm:text-lg text-justify">
                Our outgoing M.Tech scholars are engineered for precision and forged across aerospace, automobile,
                machinery, industrial systems, operations, biomedical engineering, CAD/CAM, and advanced manufacturing.
                Currently completing advanced thesis work and actively seeking full-time engineering and R&D roles.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MetalButton href="mailto:sooraj@iist.ac.in" variant="primary">
                  Contact Program Coordinator
                  <ArrowRight size={16} />
                </MetalButton>
                <MetalButton href="/people" variant="secondary">
                  Browse Scholar Archive
                </MetalButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="border-b border-[var(--edge)] bg-[var(--void-deep)]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[var(--edge)] lg:grid-cols-4 lg:divide-y-0 px-4 sm:px-6 lg:px-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center py-8 text-center gap-2">
                <Icon size={20} className="text-[var(--arc-blue)]" aria-hidden />
                <p className="font-display text-4xl font-bold text-[var(--ceramic)]">{value}</p>
                <p className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PRIMARY SHOWCASE: OUTGOING CLASS (2025–2027) ─── */}
        <section className="border-b border-[var(--edge)] bg-[var(--void)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-10">
                <div>
                  <SectionLabel color="blue" className="mb-2">Class of 2025–2027 · Outgoing Scholars</SectionLabel>
                  <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">
                    Available for full-time engineering roles
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ceramic-muted)]">
                    Outgoing M.Tech scholars specializing in wire-arc additive manufacturing, titanium forming, orthotropic composites, quality assurance, 5-axis machining, and process optimization.
                  </p>
                </div>
                <MetalButton href="/people" variant="ghost">
                  View in 3D shelf <ArrowRight size={14} />
                </MetalButton>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {outgoingBatch2025.map((person) => {
                const formattedResume = formatResumeUrl(person.resumeUrl);
                return (
                  <ScrollReveal key={person.slug} variant="up">
                    <div className="group flex flex-col justify-between rounded-xl border border-[var(--edge)] bg-[var(--void-deep)] p-5 transition-all duration-200 hover:border-[var(--arc-blue)] hover:shadow-[var(--shadow-glow-blue)] hover:-translate-y-0.5 h-full">
                      <div>
                        {/* Portrait Photo / Avatar Header */}
                        <div className="flex items-center gap-3.5 mb-4">
                          {person.photoUrl ? (
                            <div className="size-14 rounded-xl overflow-hidden border border-[var(--edge)] bg-white shrink-0 shadow-xs">
                              <img
                                src={person.photoUrl}
                                alt={person.name}
                                className="w-full h-full object-cover object-[center_20%] sm:object-top"
                              />
                            </div>
                          ) : (
                            <div className="grid size-14 place-items-center rounded-xl bg-[var(--arc-blue-dim)] border border-[var(--arc-blue)]/20 font-display text-lg font-bold text-[var(--arc-blue)] shrink-0">
                              {person.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                            </div>
                          )}

                          <div className="min-w-0">
                            <Link
                              href={`/people/${person.slug}`}
                              className="font-display text-base font-semibold text-[var(--ceramic)] group-hover:text-[var(--arc-blue)] transition-colors block truncate"
                            >
                              {person.name}
                            </Link>
                            <span className="font-data text-xs text-[var(--arc-blue)] block truncate mt-0.5">
                              {person.role}
                            </span>
                          </div>
                        </div>

                        {/* Specialization & Research Focus */}
                        <div className="mb-3">
                          <span className="font-data text-[11px] font-semibold tracking-wide text-[var(--forge-amber)] block">
                            {person.specialization}
                          </span>
                          <p className="mt-1 text-xs text-[var(--ceramic-muted)] line-clamp-2 leading-relaxed">
                            {person.synopsis}
                          </p>
                        </div>

                        {/* Seeking Roles */}
                        {person.seekingRoles && person.seekingRoles.length > 0 && (
                          <div className="mb-3">
                            <span className="font-data text-[10px] font-semibold text-[var(--ceramic-muted)] block mb-1">
                              Seeking Roles:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {person.seekingRoles.slice(0, 2).map((role) => (
                                <span
                                  key={role}
                                  className="rounded bg-[var(--arc-blue-dim)] border border-[var(--arc-blue)]/20 px-2 py-0.5 text-[10.5px] font-medium text-[var(--arc-blue)]"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Core Skills Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {person.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-[10.5px] text-[var(--ceramic-muted)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Status & Links */}
                      <div className="pt-3 border-t border-[var(--edge)] flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Open to roles
                        </span>

                        <div className="flex items-center gap-1.5">
                          {person.linkedin && (
                            <a
                              href={person.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="size-7 rounded-md border border-[var(--edge)] bg-[var(--panel)] flex items-center justify-center text-[var(--ceramic-muted)] hover:text-[var(--arc-blue)] hover:border-[var(--arc-blue)] transition-colors"
                              title="LinkedIn Profile"
                            >
                              <Share2 size={12} />
                            </a>
                          )}
                          {formattedResume && (
                            <a
                              href={formattedResume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="size-7 rounded-md border border-[var(--edge)] bg-[var(--panel)] flex items-center justify-center text-[var(--ceramic-muted)] hover:text-[var(--forge-amber)] hover:border-[var(--forge-amber)] transition-colors"
                              title="Download Resume (PDF)"
                            >
                              <Download size={12} />
                            </a>
                          )}
                          <Link
                            href={`/people/${person.slug}`}
                            className="size-7 rounded-md border border-[var(--arc-blue)]/30 bg-[var(--arc-blue-dim)] flex items-center justify-center text-[var(--arc-blue)] hover:bg-[var(--arc-blue)] hover:text-white transition-colors"
                            title="Full Profile Dossier"
                          >
                            <ExternalLink size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── GRADUATED ALUMNI BATCH (2024–2026) ─── */}
        <section className="border-b border-[var(--edge)] bg-[var(--void-deep)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col gap-2 mb-8">
                <SectionLabel color="amber" className="mb-2">Graduated Alumni · Class of 2024–2026</SectionLabel>
                <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">
                  Placement track record & career destinations
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-[var(--ceramic-muted)]">
                  85.7% placement achievement across leading aerospace, defense, precision engineering firms, and prestigious doctoral research offers.
                </p>
              </div>
            </ScrollReveal>

            {/* Placement Poster */}
            <ScrollReveal variant="up">
              <div className="overflow-hidden rounded-2xl border border-[var(--edge)] bg-black/40 shadow-2xl transition-all hover:border-[var(--forge-amber)]/40 mb-10">
                <Image
                  src="/media/photos/placed-2024-2026.jpeg"
                  alt="M.Tech Manufacturing Technology 2024-2026 Placements Announcement Poster"
                  width={1200}
                  height={850}
                  className="w-full h-auto object-contain max-h-[850px] mx-auto"
                />
              </div>
            </ScrollReveal>

            {/* Graduated Alumni Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {graduatedBatch2024.map((person) => (
                <ScrollReveal key={person.slug} variant="up">
                  <Link
                    href={`/people/${person.slug}`}
                    className="group block rounded-xl border border-[var(--edge)] bg-[var(--panel)] p-5 transition-all duration-200 hover:border-[var(--forge-amber)] hover:shadow-[var(--shadow-glow-amber)] hover:-translate-y-0.5"
                  >
                    <div className="mb-3 grid size-10 place-items-center rounded-lg bg-[var(--forge-amber-dim)] border border-[var(--forge-amber)]/15 font-display text-base font-bold text-[var(--forge-amber)]">
                      {person.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>

                    <p className="font-display text-base font-semibold text-[var(--ceramic)] group-hover:text-[var(--forge-amber)] transition-colors">
                      {person.name}
                    </p>
                    <p className="mt-0.5 font-data text-xs text-[var(--forge-amber)]">
                      {person.specialization}
                    </p>

                    {person.placedAt && (
                      <div className="mt-3 rounded-lg border border-[var(--forge-amber)]/25 bg-[var(--forge-amber-dim)]/40 p-2.5">
                        <p className="font-data text-[10px] text-[var(--forge-amber)] font-bold">
                          Career Destination
                        </p>
                        <p className="text-xs font-semibold text-[var(--ceramic)] mt-0.5">
                          {person.placedAt}
                        </p>
                        {person.placedRole && (
                          <p className="text-[11px] text-[var(--ceramic-muted)]">
                            {person.placedRole}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between text-xs text-[var(--ceramic-muted)]">
                      <span>Graduated May 2026</span>
                      <span className="text-[var(--forge-amber)] group-hover:translate-x-0.5 transition-transform">
                        Dossier →
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SKILL DOMAINS ─── */}
        <section className="border-b border-[var(--edge)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <ScrollReveal>
              <SectionLabel className="mb-3">Skill Matrix</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">
                Core competency domains
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ceramic-muted)]">
                Profiles are distributed across six core manufacturing competency domains, versatile enough for high-tech sectors spanning aerospace, automotive, machinery, biomedical systems, CAD/CAM, and industrial operations.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {domainSkills.map((domain) => {
                const colors = colorMap[domain.color];
                return (
                  <ScrollReveal key={domain.domain} variant="up">
                    <GlassCard className="h-full">
                      <div className={`mb-4 inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold ${colors.badge}`}>
                        {domain.domain}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {domain.roles.map((role) => (
                          <span
                            key={role}
                            className={`rounded-md border px-2.5 py-1 text-xs font-medium ${colors.tag}`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── PROGRAM CONTEXT ─── */}
        <section className="border-b border-[var(--edge)] bg-[var(--void-deep)] surface-grid">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <ScrollReveal variant="left">
                <SectionLabel color="amber" className="mb-3">Program Context</SectionLabel>
                <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">
                  Why IIST Manufacturing Technology?
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ceramic-muted)]">
                  <p>
                    The M.Tech Manufacturing Technology program at the Indian Institute of Space
                    Science & Technology (IIST) is a 2-year postgraduate program embedded in the
                    Department of Aerospace Engineering, focusing on multidisciplinary engineering excellence.
                  </p>
                  <p>
                    While our roots lie in handling demanding aerospace-grade challenges with exposure to ISRO facilities (VSSC, LPSC, CMSE, IISU), the training builds a core foundation of versatility. Our students are prepared to tackle precision engineering in automobile, biomedical devices, heavy machinery, and industrial operations.
                  </p>
                  <p>
                    Graduates are equipped for diverse, high-impact roles in aerospace and defense production, automotive manufacturing, advanced biomedical machinery, operations management, CAD/CAM software development, and cutting-edge R&D labs.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="right">
                <div className="space-y-4">
                  {[
                    ["ISRO Centre Exposure", "Industrial visits to VSSC, LPSC, IISU, CMSE"],
                    ["Hands-on Labs", "Composite, welding, additive, metrology facilities"],
                    ["Thesis Projects", "Real aerospace manufacturing challenges"],
                    ["PhD Pathways", "Aligned PhD research opportunities at IIST"],
                  ].map(([title, desc]) => (
                    <div
                      key={title}
                      className="flex items-start gap-4 rounded-xl border border-[var(--edge)] bg-white p-4"
                    >
                      <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--arc-blue-dim)]">
                        <Star size={15} className="text-[var(--arc-blue)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--ceramic)]">{title}</p>
                        <p className="mt-0.5 text-sm text-[var(--ceramic-muted)]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-gradient-to-br from-[var(--arc-blue)] to-[var(--cool-zone)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Ready to recruit from IIST?
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-base text-white/80 leading-7">
                Reach out to the program coordinator to discuss campus recruitment, full-time offers,
                project sponsorships, and engineering collaborations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <a
                  href="mailto:sooraj@iist.ac.in"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[var(--arc-blue)] hover:bg-white/90 transition-all shadow-lg"
                >
                  <Mail size={16} />
                  Email Program Coordinator
                </a>
                <a
                  href="https://www.iist.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  <MapPin size={16} />
                  Visit IIST Website
                </a>
              </div>

              <p className="mt-8 font-data text-xs tracking-wider text-white/70">
                Indian Institute of Space Science and Technology · Valiamala, Thiruvananthapuram
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
