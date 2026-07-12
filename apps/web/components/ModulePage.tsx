import { AppShell } from "./AppShell";
import { DreamGlyph } from "./DreamGlyph";
import type { ProductModule } from "../lib/product-modules";

export function ModulePage({ module }: { module: ProductModule }) {
  return (
    <AppShell>
      <p className="eyebrow">{module.eyebrow}</p>
      <h1 className="headline">{module.title}</h1>
      <p className="copy">{module.summary}</p>
      <section className="band" aria-label={`${module.title} workflow`}>
        <div className="grid">
          <article className="panel">
            <DreamGlyph name={module.glyph} size={42} />
            <h3>Primary actions</h3>
            <p>{module.primaryActions.join(" · ")}</p>
          </article>
          <article className="panel">
            <DreamGlyph name="timeline" size={42} />
            <h3>States</h3>
            <p>{module.states.join(" · ")}</p>
          </article>
          <article className="panel">
            <DreamGlyph name="privacy" size={42} />
            <h3>Privacy rule</h3>
            <p>{module.privacy}</p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
