import { Workbench } from "./Workbench";

const suites = [
  {
    title: "Chart Studio",
    items: ["Birth profiles", "Natal placements", "Major aspects", "Element balance", "Unknown-time safeguards"]
  },
  {
    title: "Timing",
    items: ["Transit watch", "Calendar planning", "Stations", "Ingresses", "Journal links"]
  },
  {
    title: "Relationships",
    items: ["Synastry", "Composite work", "Consent", "Shared timeline", "Relationship reports"]
  },
  {
    title: "Practice",
    items: ["Clients", "Private notes", "Consultation prep", "Reports", "Privacy controls"]
  }
];

export default function DreamLogicApp() {
  return (
    <main className="app-shell">
      <section className="brand-stage">
        <img alt="Dream Logic Astrology suite" className="app-logo" src="/brand/fulldarklogo.svg" />
        <div className="symbol-strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <Workbench />

      <section className="suite-grid" aria-label="Dream Logic astrology suite">
        {suites.map((suite) => (
          <article className="suite-card" key={suite.title}>
            <p>{suite.title}</p>
            <ul>
              {suite.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
