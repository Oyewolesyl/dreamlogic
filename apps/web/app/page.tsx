import { AppShell } from "../components/AppShell";
import { DreamGlyph } from "../components/DreamGlyph";

const modules = [
  ["birth-profile", "Birth profiles", "Capture birth data with certainty, location, time-zone, and house-system context."],
  ["natal-chart", "Chart studio", "A deterministic chart workspace prepared for single, bi-wheel, and tri-wheel views."],
  ["transits", "Transit centre", "Today, week, month, and year timing surfaces with exact-event records."],
  ["journal", "Journal timeline", "Reflection, dreams, life events, study notes, and transit observations in one timeline."],
  ["relationship", "Relationship astrology", "Synastry, composite, consent, shared context, and practitioner workflows."],
  ["practitioner", "Practice workspace", "Clients, intake, session preparation, private notes, reports, and follow-ups."]
] as const;

export default function HomePage() {
  return (
    <AppShell>
      <p className="eyebrow">Dream Logic operating system</p>
      <h1 className="headline">Precise astrology, deep interpretation, and professional practice in one workspace.</h1>
      <p className="copy">
        This foundation starts with the approved Dream Logic identity, modular glyph language, privacy-first data model,
        deterministic chart boundaries, onboarding shell, subscriptions, and practitioner-ready product architecture.
      </p>
      <div className="button-row">
        <a className="button" href="/onboarding">Begin onboarding</a>
        <a className="button secondary" href="/glyphs">View glyph system</a>
      </div>
      <section className="band" aria-label="Core modules">
        <div className="grid">
          {modules.map(([glyph, title, body]) => (
            <article className="panel" key={title}>
              <DreamGlyph name={glyph} size={36} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
