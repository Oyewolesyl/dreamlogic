const productLanes = [
  {
    title: "Charts",
    items: ["Birth profiles", "Natal snapshots", "Aspects", "Time resolution", "House systems"]
  },
  {
    title: "Practice",
    items: ["Practitioners", "Clients", "Intake", "Appointments", "Private notes"]
  },
  {
    title: "Reports",
    items: ["Natal", "Transit", "Year ahead", "Relationship", "Consultation"]
  },
  {
    title: "Platform",
    items: ["Users", "Subscriptions", "AI usage", "Privacy exports", "Audit logs"]
  }
];

const operations = [
  ["Calculation health", "Ephemeris provider pending", "Provider contract is present; production key/license required."],
  ["Billing webhooks", "Stripe test mode", "Checkout and entitlement sync are the next server route."],
  ["Glyph management", "33 glyphs", "Grid-based symbol library is available in the shared package."],
  ["Privacy centre", "Consent-first", "Journal, client, relationship, and AI context data stay separated."]
];

export default function AdminHome() {
  return (
    <main className="admin-shell">
      <section className="brand-stage">
        <img alt="Dream Logic Astrology suite" className="admin-logo" src="/brand/fulldarklogo.svg" />
        <div className="symbol-strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <Workbench />

      <section className="console-grid" aria-label="Dream Logic modules">
        {productLanes.map((lane) => (
          <article className="lane" key={lane.title}>
            <p>{lane.title}</p>
            <ul>
              {lane.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="ops-grid" aria-label="Operational status">
        {operations.map(([title, status, detail]) => (
          <article className="ops-card" key={title}>
            <span>{status}</span>
            <h2>{title}</h2>
            <p>{detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
import { Workbench } from "./Workbench";
