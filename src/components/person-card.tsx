"use client";
import { type Person, formatResumeUrl } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { Download, ExternalLink, Share2, Mail } from "lucide-react";

export { formatResumeUrl };

export function Portrait({ name, photoUrl, large = false }: { name: string; photoUrl?: string; large?: boolean }) {
  if (photoUrl) {
    return (
      <div
        className={[
          "relative shrink-0 overflow-hidden rounded-xl border border-[var(--edge)] aspect-[3/4] select-none bg-[var(--panel-alt)] shadow-sm",
          large ? "w-32 sm:w-36 md:w-40" : "w-28 sm:w-32 md:w-36",
        ].join(" ")}
      >
        <img
          src={photoUrl}
          alt={name}
          className="h-full w-full object-cover object-[center_20%] sm:object-top transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-1.5 left-1.5 size-2 border-t border-l border-white/50" />
        <div className="absolute top-1.5 right-1.5 size-2 border-t border-r border-white/50" />
        <div className="absolute bottom-1.5 left-1.5 size-2 border-b border-l border-white/50" />
        <div className="absolute bottom-1.5 right-1.5 size-2 border-b border-r border-white/50" />
      </div>
    );
  }

  const initials = name
    .replace("Dr.", "")
    .replace("Mr.", "")
    .replace("Shri", "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  const hash = name.split("").reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 45 + (Math.abs(hash >> 8) % 40)) % 360;
  const gradient = `linear-gradient(135deg, hsl(${hue1}, 42%, 68%) 0%, hsl(${hue2}, 38%, 52%) 100%)`;

  return (
    <div
      className={[
        "relative shrink-0 overflow-hidden rounded-xl border border-[var(--edge)] aspect-[3/4] select-none shadow-sm",
        large ? "w-32 sm:w-36 md:w-40" : "w-28 sm:w-32 md:w-36",
      ].join(" ")}
      style={{ background: gradient }}
      aria-label={`${name} portrait placeholder`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
      <div className="absolute top-1.5 left-1.5 size-2 border-t border-l border-white/40" />
      <div className="absolute top-1.5 right-1.5 size-2 border-t border-r border-white/40" />
      <div className="absolute bottom-1.5 left-1.5 size-2 border-b border-l border-white/40" />
      <div className="absolute bottom-1.5 right-1.5 size-2 border-b border-r border-white/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={[
          "font-display font-bold text-white/90 drop-shadow-sm",
          large ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl",
        ].join(" ")}>
          {initials}
        </span>
      </div>
      <span className="absolute bottom-1.5 left-1.5 font-data text-[8px] font-mono tracking-wider text-white/60 select-none">
        ID-{initials || "NA"}
      </span>
    </div>
  );
}

export function PersonCard({
  person,
  onPreview,
}: {
  person: Person;
  onPreview?: (person: Person) => void;
}) {
  const resumeUrl = formatResumeUrl(person.resumeUrl);

  return (
    <GlassCard 
      className="p-4 sm:p-5 cursor-pointer hover:border-[var(--arc-blue)] transition-colors duration-200 group" 
      hover={true} 
      as="article"
      onClick={() => onPreview?.(person)}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-5 items-start">
        <div className="flex justify-center sm:justify-start">
          <Portrait name={person.name} photoUrl={person.photoUrl} />
        </div>
        <div className="min-w-0 flex flex-col justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xl font-semibold text-[var(--ceramic)] group-hover:text-[var(--arc-blue)] transition-colors duration-200">
                {person.name}
              </span>
              <span className="rounded-md bg-[var(--forge-amber-dim)] px-2 py-0.5 font-data text-xs font-semibold tracking-wide text-[var(--forge-amber)]">
                {person.batch ?? person.type}
              </span>
            </div>
            <span className="mt-1 block text-sm font-medium text-[var(--arc-blue)]">{person.role}</span>
            <span className="mt-2 block text-sm leading-6 text-[var(--ceramic-muted)] line-clamp-2">{person.specialization}</span>
            <span className="mt-3 flex flex-wrap gap-2">
              {person.skills.slice(0, 3).map((skill, idx) => (
                <span key={`${skill}-${idx}`} className="rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2 py-0.5 text-xs text-[var(--ceramic-muted)]">
                  {skill}
                </span>
              ))}
            </span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2.5 text-xs font-medium text-[var(--ceramic-muted)] hover:border-[var(--arc-blue)] hover:text-[var(--arc-blue)] transition-colors duration-200"
              >
                <Share2 size={13} aria-hidden />
                LinkedIn
              </a>
            )}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-2.5 text-xs font-medium text-[var(--ceramic-muted)] hover:border-[var(--forge-amber)] hover:text-[var(--forge-amber)] transition-colors duration-200"
              >
                <Download size={13} aria-hidden />
                Resume
              </a>
            ) : (
              <span className="inline-flex h-8 items-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--carbon)] px-2.5 text-xs font-medium text-[var(--ceramic-muted)]/50">
                <Download size={13} aria-hidden />
                Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function ProfileActions({ person }: { person: Person }) {
  const resumeUrl = formatResumeUrl(person.resumeUrl);

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`mailto:${person.officialEmail}`}
        className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-[var(--arc-blue)] px-3 text-sm font-medium text-white hover:brightness-90 hover:shadow-[var(--shadow-glow-blue)] transition-all duration-200 sm:flex-none"
      >
        <Mail size={16} aria-hidden />
        Email
      </a>
      {person.portfolio && (
        <a
          href={person.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-sm font-medium text-[var(--ceramic)] hover:border-[var(--forge-amber)] sm:flex-none"
        >
          <ExternalLink size={16} aria-hidden />
          Portfolio
        </a>
      )}
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-sm font-medium text-[var(--ceramic)] hover:border-[var(--arc-blue)] sm:flex-none"
        >
          <Share2 size={16} aria-hidden />
          LinkedIn
        </a>
      )}
      {resumeUrl ? (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--panel)] px-3 text-sm font-medium text-[var(--ceramic)] hover:border-[var(--forge-amber)] sm:flex-none"
        >
          <Download size={16} aria-hidden />
          Resume
        </a>
      ) : (
        <span className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md border border-[var(--edge)] bg-[var(--carbon)] px-3 text-sm font-medium text-[var(--ceramic-muted)]/50 sm:flex-none">
          <Download size={16} aria-hidden />
          Pending
        </span>
      )}
      <Link
        href={`/people/${person.slug}`}
        className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md border border-[var(--arc-blue)] px-3 text-sm font-medium text-[var(--arc-blue)] hover:bg-[var(--arc-blue)] hover:text-white transition-colors duration-200 sm:flex-none"
      >
        Full Profile
      </Link>
    </div>
  );
}
