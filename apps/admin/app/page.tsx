import { Workbench } from "./Workbench";

export default function DreamLogicApp() {
  return (
    <main className="app-shell">
      <section className="hero-panel" aria-label="Dream Logic">
        <div className="hero-art">
          <img alt="Dream Logic Astrology suite dark brand direction" src="/brand/logo-direction-dark.jpg" />
        </div>
        <div className="hero-copy">
          <p className="kicker">Dream Logic</p>
          <h1>Astrology suite</h1>
          <p>
            Calculate charts, study placements, track timing, write with context, prepare consultations, and export reports
            from one private astrology workspace.
          </p>
        </div>
      </section>

      <Workbench />
    </main>
  );
}
