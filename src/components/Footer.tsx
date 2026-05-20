import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-rule)]">
      <div className="container-page py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="space-y-2">
          <p className="eyebrow">Get in touch</p>
          <a
            href={`mailto:${profile.email}`}
            className="font-display text-2xl md:text-3xl font-medium tracking-tight link-underline"
          >
            {profile.email}
          </a>
        </div>
        <div className="flex flex-col md:items-end gap-2 text-sm text-[var(--color-muted-strong)]">
          <div className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)] transition-colors cursor-pointer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)] transition-colors cursor-pointer">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-ink)] transition-colors cursor-pointer">Email</a>
          </div>
          <p className="text-xs text-[var(--color-muted)]">© {new Date().getFullYear()} Aiden Tran · Built with React, Three.js, Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
