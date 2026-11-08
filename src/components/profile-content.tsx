"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageFrame } from "@/components/site-shell";
import { Portrait, ProfileActions } from "@/components/person-card";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import type { Person } from "@/lib/data";

export function ProfileContent({ initialPerson }: { initialPerson: Person }) {
  const person = initialPerson;

  return (
    <PageFrame>
      <main>
        <section className="border-b border-[var(--edge)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <ScrollReveal>
              <Link
                href="/people"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--forge-amber)] hover:text-[var(--arc-blue)] transition-colors"
              >
                <ArrowLeft size={16} aria-hidden />
                Back to directory
              </Link>
            </ScrollReveal>
            <div className="mt-8">
              <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8">
                <ScrollReveal variant="scale">
                  <div className="w-fit">
                    <Portrait name={person.name} photoUrl={person.photoUrl} large />
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <div className="min-w-0">
                    <SectionLabel color="amber">{person.batch ?? person.type}</SectionLabel>
                    <h1 className="mt-3 overflow-wrap-anywhere font-display text-4xl font-bold leading-tight sm:text-5xl text-[var(--ceramic)]">
                      {person.name}
                    </h1>
                    <p className="mt-2 text-base font-semibold text-[var(--arc-blue)] sm:text-lg">{person.role}</p>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ceramic-muted)] sm:text-lg sm:leading-8 whitespace-pre-wrap text-justify">
                      {person.synopsis}
                    </p>
                    <div className="mt-6">
                      <ProfileActions person={person} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <ScrollReveal variant="left" as="aside">
            <div className="space-y-6">
              <div>
                <Divider className="mb-5" />
                <h2 className="font-display text-2xl font-bold text-[var(--ceramic)]">Contact</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">Official</dt>
                    <dd className="mt-1 text-[var(--arc-blue)]">{person.officialEmail}</dd>
                  </div>
                  {person.personalEmail && (
                    <div>
                      <dt className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">Personal</dt>
                      <dd className="mt-1 text-[var(--ceramic)]">{person.personalEmail}</dd>
                    </div>
                  )}
                  {person.supervisor && (
                    <div>
                      <dt className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">Supervisor</dt>
                      <dd className="mt-1 text-[var(--ceramic)]">{person.supervisor}</dd>
                    </div>
                  )}
                  {person.admissionYear && (
                    <div>
                      <dt className="font-data text-xs font-semibold tracking-wide text-[var(--ceramic-muted)]">Admission</dt>
                      <dd className="mt-1 text-[var(--ceramic)]">
                        {person.admissionYear}
                        {person.mode ? `, ${person.mode}` : ""}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {person.seekingRoles && person.seekingRoles.length > 0 && (
                <div>
                  <Divider className="mb-5" />
                  <h2 className="font-display text-2xl font-bold text-[var(--ceramic)]">Seeking</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {person.seekingRoles.map((role) => (
                      <span key={role} className="rounded-md bg-[var(--forge-amber-dim)] px-2.5 py-1 text-sm text-[var(--forge-amber)]">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {person.sourceUrl && (
                <div>
                  <Divider className="mb-5" />
                  <p className="text-sm leading-6 text-[var(--ceramic-muted)]">
                    Faculty seed data references the public IIST profile page. Members can refine this after claiming their dashboard profile.
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" as="div">
            <div className="space-y-10">
              <section>
                <Divider className="mb-5" />
                <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">Skills and expertise</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {Object.entries(person.skillGroups || {}).map(([group, skills]) => (
                    <GlassCard key={group} variant="compact">
                      <h3 className="font-display text-base font-semibold text-[var(--forge-amber)]">{group}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                          <span key={`${skill}-${idx}`} className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-xs text-[var(--ceramic-muted)]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  ))}
                  {person.skills && person.skills.length > 0 && (
                    <GlassCard variant="compact" className="md:col-span-2">
                      <h3 className="font-display text-base font-semibold text-[var(--arc-blue)]">All Skills</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {person.skills.map((skill, idx) => (
                          <span key={`${skill}-${idx}`} className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2.5 py-1 text-xs text-[var(--ceramic-muted)] font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                </div>
              </section>

              <section>
                <Divider className="mb-5" />
                <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">Demonstrated projects</h2>
                <div className="mt-5 space-y-4">
                  {person.projects && person.projects.length ? (
                    person.projects.map((project) => (
                      <GlassCard key={project.title} variant="featured" accent="blue">
                        <p className="flex items-center gap-2 font-display font-semibold text-[var(--ceramic)]">
                          <CheckCircle2 size={17} className="text-[var(--arc-blue)]" aria-hidden />
                          {project.title}
                        </p>
                        <p className="mt-2 leading-7 text-[var(--ceramic-muted)]">{project.summary}</p>
                        <span className="mt-2 inline-block font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)]">
                          {project.status}
                        </span>
                      </GlassCard>
                    ))
                  ) : (
                    <p className="leading-7 text-[var(--ceramic-muted)]">Projects will appear here after the profile is claimed and updated.</p>
                  )}
                </div>
              </section>

              {person.profileSections && person.profileSections.length > 0 && (
                <section className="space-y-10">
                  {person.profileSections.map((section) => (
                    <div key={section.title}>
                      <Divider className="mb-5" />
                      <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">{section.title}</h2>
                      <p className="mt-4 leading-7 text-[var(--ceramic-muted)] whitespace-pre-wrap">{section.body}</p>
                      {section.items && section.items.length > 0 && (
                        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-[var(--ceramic-muted)]">
                          {section.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {person.courses && (
                <section>
                  <Divider className="mb-5" />
                  <h2 className="font-display text-3xl font-bold text-[var(--ceramic)]">Courses and research areas</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {[...(person.researchInterests ?? []), ...person.courses].map((item) => (
                      <p key={item} className="border-l-2 border-[var(--forge-amber)] pl-3 leading-7 text-[var(--ceramic-muted)]">
                        {item}
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </ScrollReveal>
        </section>
      </main>
    </PageFrame>
  );
}
