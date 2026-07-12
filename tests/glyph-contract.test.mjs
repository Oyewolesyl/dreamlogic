import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../packages/glyphs/src/index.ts", import.meta.url), "utf8");
const names = [...source.matchAll(/\|\s+"([^"]+)"/g)].map((match) => match[1]);
const productNames = names.filter((name) => !["origin-cross", "woven-diamond", "logic-flower", "research-lattice", "relationship-knot"].includes(name));

if (productNames.length < 24) {
  throw new Error(`Expected at least 24 product glyph names, found ${productNames.length}`);
}

for (const required of ["natal-chart", "birth-profile", "transits", "journal", "privacy", "settings"]) {
  if (!names.includes(required)) {
    throw new Error(`Missing required glyph: ${required}`);
  }
}

console.log(`Glyph contract passed with ${productNames.length} product glyphs.`);
