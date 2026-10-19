"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Radio, Terminal } from "lucide-react";
import { LinkCard } from "@/components/LinkCard";
import { LINKS, SITE } from "@/lib/site";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Page() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0.2, delay } : { duration: 0.55, ease: EASE, delay },
  });

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop opacity-[0.32]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/4 size-[36rem] rounded-full bg-accent/10 blur-[140px] animate-glow-pulse" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      {/* header */}
      <header className="sticky top-0 z-30 border-b border-edge/60 bg-void/70 backdrop-blur-lg">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md border border-edge bg-surface text-accent">
              <Terminal className="size-4" />
            </span>
            <span className="font-mono text-sm tracking-tight text-fg">ardmst<span className="text-accent">.my.id</span></span>
          </Link>
          <a href={`mailto:${SITE.email}`} className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-edge bg-surface px-3 py-1.5 font-mono text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-accent-soft">
            <Mail className="size-3.5" /> {SITE.email}
          </a>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl px-5 pb-16 pt-10 sm:pt-14">
        {/* hero */}
        <section className="mx-auto max-w-3xl text-center">
          <motion.div {...reveal(0)} className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-soft">
            <Radio className="size-3 animate-pulse" /> {SITE.availability}
          </motion.div>

          <motion.p {...reveal(0.06)} className="mt-5 font-mono text-sm tracking-widest text-accent-soft">
            &gt;_ ardmst.my.id
          </motion.p>

          <motion.h1 {...reveal(0.12)} className="mt-3 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {SITE.fullName}
          </motion.h1>

          <motion.p {...reveal(0.18)} className="mt-3 font-display text-lg font-medium text-fg-muted sm:text-xl">
            Fullstack Developer & Game Creator — {SITE.domain}
          </motion.p>

          <motion.p {...reveal(0.22)} className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
            Dark, fast and deliberate — web apps, game systems and interfaces. Central hub for everything I ship.
          </motion.p>

          <motion.div {...reveal(0.28)} className="mt-4 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-fg-subtle">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-surface px-3 py-1">
              <MapPin className="size-3" /> {SITE.location}
            </span>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-surface px-3 py-1 transition-colors hover:border-accent/40 hover:text-accent-soft">
              <Mail className="size-3" /> {SITE.email}
            </a>
          </motion.div>

          <motion.div {...reveal(0.34)} className="mt-6 flex flex-wrap justify-center gap-2">
            <a href="https://portofolio.ardmst.my.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-soft hover:shadow-[0_0_22px_-6px_var(--color-accent)]">
              View Portfolio <ArrowUpRight className="size-4" />
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-md border border-edge bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent-soft">
              Contact <Mail className="size-4" />
            </a>
          </motion.div>
        </section>

        {/* link grid */}
        <section className="mt-10 sm:mt-12">
          <motion.p {...reveal(0.4)} className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-subtle">Links</motion.p>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: reduced ? 0 : 0.42 } } }}
            className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {LINKS.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: reduced ? { duration: 0.2 } : { duration: 0.45, ease: EASE } },
                }}
              >
                <LinkCard item={item} />
              </motion.div>
            ))}
          </motion.div>
          <p className="hidden" aria-hidden="true">
            Add future projects by editing src/lib/site.ts → LINKS
          </p>
        </section>
      </main>

      {/* footer */}
      <footer className="relative border-t border-edge bg-surface/40">
        <div className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <span className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-md border border-edge bg-surface text-accent"><Terminal className="size-4" /></span>
                <span className="font-mono text-sm text-fg">ardmst<span className="text-accent">.my.id</span></span>
              </span>
              <p className="max-w-sm text-xs leading-relaxed text-fg-subtle">Fullstack Developer & Game Creator — {SITE.domain}</p>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <a href="https://github.com/Ardmst" target="_blank" rel="noopener noreferrer" className="rounded-md border border-edge bg-void px-3 py-1.5 text-fg-muted hover:border-accent/40 hover:text-accent-soft">GitHub</a>
              <a href="https://linkedin.com/in/ardmst" target="_blank" rel="noopener noreferrer" className="rounded-md border border-edge bg-void px-3 py-1.5 text-fg-muted hover:border-accent/40 hover:text-accent-soft">LinkedIn</a>
              <a href={`mailto:${SITE.email}`} className="rounded-md border border-edge bg-void px-3 py-1.5 text-fg-muted hover:border-accent/40 hover:text-accent-soft">Email</a>
              <a href="https://portofolio.ardmst.my.id" target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-3 py-1.5 text-white hover:bg-accent-soft">Portfolio ↗</a>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-edge pt-4 font-mono text-[0.7rem] text-fg-subtle sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.</span>
            <span>Built with Next.js · Tailwind · Framer Motion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
