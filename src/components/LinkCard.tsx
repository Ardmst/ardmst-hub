"use client";
import { ArrowUpRight, ExternalLink, Gamepad2, Github, Linkedin, Mail, Rocket, Server } from "lucide-react";
import { LINKS, type LinkItem } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Portfolio: Rocket,
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
  "Hermes API": Server,
  "Game Demos": Gamepad2,
};

function isDisabled(href: string) { return href === "#"; }

export function LinkCard({ item }: { item: LinkItem }) {
  const Icon = ICON[item.title] ?? ExternalLink;
  const disabled = isDisabled(item.href);

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className={cn(
          "flex size-9 items-center justify-center rounded-lg border transition-colors",
          item.accent
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-edge bg-elevated text-fg-muted group-hover:border-accent/30 group-hover:text-accent-soft"
        )}>
          <Icon className="size-4.5" />
        </span>
        <span className={cn(
          "rounded-md border px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider",
          item.accent ? "border-accent/30 bg-accent/10 text-accent-soft" : item.badge === "soon" ? "border-edge bg-void text-fg-subtle" : "border-edge bg-elevated text-fg-subtle"
        )}>
          {item.badge}
        </span>
      </div>
      <h3 className="mt-4 font-display text-[1.05rem] font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-soft">
        {item.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-fg-subtle transition-colors group-hover:text-accent-soft">
        {disabled ? "coming soon" : item.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
        {!disabled && <ArrowUpRight className="size-3 translate-y-px transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </span>
    </>
  );

  const cls = cn(
    "group relative flex flex-col rounded-xl border bg-surface p-5 text-left transition-all duration-300",
    "hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.25),0_14px_40px_-16px_rgba(59,130,246,0.28)]",
    item.accent ? "border-accent/30 hover:border-accent/60" : "border-edge hover:border-accent/40",
    disabled && "opacity-60 hover:translate-y-0 hover:shadow-none cursor-default"
  );

  if (disabled) return <div className={cls}>{content}</div>;

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(cls, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50")}
      aria-label={item.title}
    >
      {content}
    </a>
  );
}

// helper export for page map
export { LINKS };
