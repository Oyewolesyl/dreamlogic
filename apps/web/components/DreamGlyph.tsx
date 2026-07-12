import { glyphMap, type DreamGlyphName } from "@dream-logic/glyphs";

type DreamGlyphProps = {
  name: DreamGlyphName;
  size?: number;
  title?: string;
  className?: string;
};

export function DreamGlyph({ name, size = 24, title, className }: DreamGlyphProps) {
  const definition = glyphMap[name];
  const cell = 16;
  const accessibleTitle = title ?? definition.label;

  return (
    <svg
      aria-label={accessibleTitle}
      className={className}
      height={size}
      role="img"
      viewBox="0 0 256 256"
      width={size}
    >
      <title>{accessibleTitle}</title>
      {definition.cells.map(([x, y]) => (
        <rect
          fill="currentColor"
          height={cell}
          key={`${name}-${x}-${y}`}
          width={cell}
          x={x * cell}
          y={y * cell}
        />
      ))}
    </svg>
  );
}
