export type DreamGlyphName =
  | "origin-cross"
  | "woven-diamond"
  | "logic-flower"
  | "research-lattice"
  | "relationship-knot"
  | "natal-chart"
  | "birth-profile"
  | "planets"
  | "signs"
  | "houses"
  | "aspects"
  | "transits"
  | "progressions"
  | "solar-return"
  | "lunar-return"
  | "profections"
  | "synastry"
  | "composite-chart"
  | "relationship"
  | "journal"
  | "dream-log"
  | "timeline"
  | "ai-assistant"
  | "interpretation"
  | "learning"
  | "research"
  | "client"
  | "practitioner"
  | "consultation"
  | "report"
  | "library"
  | "collections"
  | "notifications"
  | "subscription"
  | "premium"
  | "privacy"
  | "settings";

export type GlyphCell = readonly [x: number, y: number];

export type DreamGlyphDefinition = {
  readonly name: DreamGlyphName;
  readonly label: string;
  readonly grid: 16;
  readonly cells: readonly GlyphCell[];
  readonly role: "brand-symbol" | "product-glyph";
};

const mirror = (cells: readonly GlyphCell[]): GlyphCell[] => {
  const seen = new Set<string>();
  const output: GlyphCell[] = [];
  for (const [x, y] of cells) {
    const variants: GlyphCell[] = [
      [x, y],
      [15 - x, y],
      [x, 15 - y],
      [15 - x, 15 - y]
    ];
    for (const cell of variants) {
      const key = cell.join(",");
      if (!seen.has(key)) {
        seen.add(key);
        output.push(cell);
      }
    }
  }
  return output;
};

const glyph = (
  name: DreamGlyphName,
  label: string,
  role: DreamGlyphDefinition["role"],
  cells: readonly GlyphCell[]
): DreamGlyphDefinition => ({ name, label, grid: 16, role, cells });

const brandCross = mirror([
  [7, 1],
  [7, 2],
  [6, 3],
  [7, 3],
  [3, 6],
  [4, 6],
  [6, 6],
  [7, 6],
  [1, 7],
  [2, 7],
  [3, 7],
  [6, 7],
  [7, 7]
]);

const brandDiamond = mirror([
  [7, 1],
  [6, 2],
  [7, 2],
  [5, 3],
  [7, 3],
  [4, 4],
  [6, 4],
  [7, 4],
  [3, 5],
  [5, 5],
  [7, 5],
  [2, 6],
  [4, 6],
  [6, 6],
  [7, 7]
]);

const makeFromSeed = (name: DreamGlyphName, label: string, seed: number): DreamGlyphDefinition => {
  const cells: GlyphCell[] = [];
  for (let i = 0; i < 16; i += 1) {
    const x = (i * 3 + seed) % 16;
    const y = (i * 5 + seed * 2) % 16;
    if ((x + y + seed) % 3 !== 0) {
      cells.push([x, y]);
      cells.push([15 - x, y]);
    }
  }
  cells.push([7, 7], [8, 7], [7, 8], [8, 8]);
  return glyph(name, label, "product-glyph", mirror(cells));
};

export const glyphDefinitions: readonly DreamGlyphDefinition[] = [
  glyph("origin-cross", "Origin cross", "brand-symbol", brandCross),
  glyph("woven-diamond", "Woven diamond", "brand-symbol", brandDiamond),
  glyph("logic-flower", "Logic flower", "brand-symbol", mirror([[7, 1], [6, 2], [8, 2], [4, 4], [7, 4], [5, 6], [6, 6], [7, 7]])),
  glyph("research-lattice", "Research lattice", "brand-symbol", mirror([[5, 2], [7, 2], [9, 2], [4, 4], [6, 4], [8, 4], [10, 4], [5, 6], [7, 6], [9, 6], [7, 7]])),
  glyph("relationship-knot", "Relationship knot", "brand-symbol", mirror([[6, 1], [9, 1], [5, 3], [7, 3], [8, 3], [10, 3], [3, 5], [6, 6], [9, 6], [7, 7]])),
  makeFromSeed("natal-chart", "Natal chart", 1),
  makeFromSeed("birth-profile", "Birth profile", 2),
  makeFromSeed("planets", "Planets", 3),
  makeFromSeed("signs", "Signs", 4),
  makeFromSeed("houses", "Houses", 5),
  makeFromSeed("aspects", "Aspects", 6),
  makeFromSeed("transits", "Transits", 7),
  makeFromSeed("progressions", "Progressions", 8),
  makeFromSeed("solar-return", "Solar return", 9),
  makeFromSeed("lunar-return", "Lunar return", 10),
  makeFromSeed("profections", "Profections", 11),
  makeFromSeed("synastry", "Synastry", 12),
  makeFromSeed("composite-chart", "Composite chart", 13),
  makeFromSeed("relationship", "Relationship", 14),
  makeFromSeed("journal", "Journal", 15),
  makeFromSeed("dream-log", "Dream log", 16),
  makeFromSeed("timeline", "Timeline", 17),
  makeFromSeed("ai-assistant", "AI assistant", 18),
  makeFromSeed("interpretation", "Interpretation", 19),
  makeFromSeed("learning", "Learning", 20),
  makeFromSeed("research", "Research", 21),
  makeFromSeed("client", "Client", 22),
  makeFromSeed("practitioner", "Practitioner", 23),
  makeFromSeed("consultation", "Consultation", 24),
  makeFromSeed("report", "Report", 25),
  makeFromSeed("library", "Library", 26),
  makeFromSeed("collections", "Collections", 27),
  makeFromSeed("notifications", "Notifications", 28),
  makeFromSeed("subscription", "Subscription", 29),
  makeFromSeed("premium", "Premium", 30),
  makeFromSeed("privacy", "Privacy", 31),
  makeFromSeed("settings", "Settings", 32)
];

export const glyphMap = Object.fromEntries(
  glyphDefinitions.map((definition) => [definition.name, definition])
) as Record<DreamGlyphName, DreamGlyphDefinition>;

export const productGlyphNames = glyphDefinitions
  .filter((definition) => definition.role === "product-glyph")
  .map((definition) => definition.name);
