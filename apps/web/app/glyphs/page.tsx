import { glyphDefinitions } from "@dream-logic/glyphs";
import { AppShell } from "../../components/AppShell";
import { DreamGlyph } from "../../components/DreamGlyph";

export default function GlyphShowcasePage() {
  return (
    <AppShell>
      <p className="eyebrow">Symbolic operating system</p>
      <h1 className="headline">Dream Logic glyph grid</h1>
      <p className="copy">
        Each glyph is rendered from a 16 by 16 modular grid, giving navigation, reports, empty states, chart controls,
        and branded motion one shared construction grammar.
      </p>
      <div className="glyph-grid">
        {glyphDefinitions.map((definition) => (
          <article className="glyph-tile" key={definition.name}>
            <DreamGlyph name={definition.name} size={42} />
            <strong>{definition.label}</strong>
            <span>{definition.role}</span>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
