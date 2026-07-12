# Dream Logic Glyph System

Dream Logic uses a proprietary symbolic operating system rather than a generic icon set.

## Master Grid

The first glyph set uses a 16 by 16 grid. Every cell is a square unit. Glyphs are built from filled grid cells with controlled negative space.

Rules:

- Use straight edges and square units.
- Keep optical weight balanced.
- Preserve recognisability at 16px.
- Avoid decorative stars, moons, generic astrology glyphs, and inconsistent stroke weights.
- Support filled, outline, monochrome, dark, light, textured, and animated treatments.

## Symbol Row

The five brand-row symbols are reconstructed as reusable grid glyphs: `origin-cross`, `woven-diamond`, `logic-flower`, `research-lattice`, and `relationship-knot`. They establish the grammar for all product glyphs.

## Product Glyphs

The initial library covers:

natal chart, birth profile, planets, signs, houses, aspects, transits, progressions, solar return, lunar return, profections, synastry, composite chart, relationship, journal, dream log, timeline, AI assistant, interpretation, learning, research, client, practitioner, consultation, report, library, collections, notifications, subscription, premium, privacy, and settings.

## Component Contract

Use `<DreamGlyph />` for interface rendering. Do not duplicate raw SVGs in routes or feature components. The glyph package stores definition data and the rendering component converts grid cells into SVG rectangles.

## Motion

Motion should assemble, rearrange, or reveal grid cells. Timing should stay restrained: 120-160ms for small control feedback, 180-240ms for controls, 280-360ms for panels, and 400-600ms for branded transitions. Respect reduced motion.
