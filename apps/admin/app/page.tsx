import { Workbench } from "./Workbench";

export default function DreamLogicApp() {
  return (
    <main className="app-shell">
      <section className="hero-panel" aria-label="Dream Logic Astrology Suite">
        <div className="hero-background" aria-hidden="true" />
        <div className="hero-brand">
          <img alt="Dream Logic Astrology suite" src="/brand/logoaltbrightalt.svg" />
        </div>
        <div className="hero-copy">
          <p className="kicker">Private astrology suite</p>
          <h1>Read the chart, keep the story.</h1>
          <p>
            Dream Logic brings birth profiles, calculated placements, timing notes, relationship work, client records,
            journal context, and polished reports into one calm workspace.
          </p>
          <div className="hero-actions" aria-label="Dream Logic actions">
            <a href="#workspace">Enter workspace</a>
            <a href="#report">View report</a>
          </div>
        </div>
      </section>

      <Workbench />
    </main>
  );
}
