import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { DreamGlyph } from "./DreamGlyph";
import type { DreamGlyphName } from "@dream-logic/glyphs";

const navItems: Array<{ href: string; label: string; glyph: DreamGlyphName; active?: boolean }> = [
  { href: "/", label: "Workspace", glyph: "natal-chart", active: true },
  { href: "/auth", label: "Auth", glyph: "privacy" },
  { href: "/dashboard", label: "Dashboard", glyph: "timeline" },
  { href: "/onboarding", label: "Onboarding", glyph: "birth-profile" },
  { href: "/charts", label: "Charts", glyph: "natal-chart" },
  { href: "/transits", label: "Transits", glyph: "transits" },
  { href: "/journal", label: "Journal", glyph: "journal" },
  { href: "/relationships", label: "Relationships", glyph: "relationship" },
  { href: "/glyphs", label: "Glyph library", glyph: "logic-flower" },
  { href: "/clients", label: "Clients", glyph: "client" },
  { href: "/reports", label: "Reports", glyph: "report" },
  { href: "/subscriptions", label: "Subscriptions", glyph: "subscription" },
  { href: "/privacy", label: "Privacy", glyph: "privacy" },
  { href: "/learn", label: "Academy", glyph: "learning" },
  { href: "/research", label: "Research", glyph: "research" },
  { href: "/admin", label: "Admin", glyph: "settings" }
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <Wordmark mode="dark" />
        <nav aria-label="Dream Logic">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="nav-item" data-active={item.active ? "true" : "false"} href={item.href}>
                  <DreamGlyph name={item.glyph} size={22} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
