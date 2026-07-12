export const dreamLogicColors = {
  black: "#171717",
  blackDeep: "#0d0d0e",
  white: "#f7f7f4",
  cream: "#f0ece4",
  parchment: "#ded4c1",
  midnight: "#07152f",
  blue: "#1254a8",
  blueBright: "#2467cb",
  blueSoft: "#86a8e5",
  yellow: "#f5c21c",
  red: "#e51d2a",
  orange: "#d96a32",
  bronze: "#bd6a42",
  brown: "#3c1713"
} as const;

export const dreamLogicThemes = {
  dark: {
    name: "dark",
    background: dreamLogicColors.blackDeep,
    surface: dreamLogicColors.black,
    raised: "#202021",
    textPrimary: "#f5f5f2",
    textSecondary: "#b5b2aa",
    border: "rgba(255, 255, 255, 0.12)",
    accent: dreamLogicColors.yellow,
    accentSecondary: dreamLogicColors.blueBright,
    warning: dreamLogicColors.orange
  },
  light: {
    name: "light",
    background: dreamLogicColors.white,
    surface: dreamLogicColors.cream,
    raised: "#ffffff",
    textPrimary: dreamLogicColors.black,
    textSecondary: "#6f7075",
    border: "rgba(23, 23, 23, 0.14)",
    accent: dreamLogicColors.red,
    accentSecondary: dreamLogicColors.blue,
    warning: dreamLogicColors.bronze
  }
} as const;

export const typographyTokens = {
  display: "var(--font-editorial), Georgia, serif",
  heading: "var(--font-ui), Inter, system-ui, sans-serif",
  body: "var(--font-ui), Inter, system-ui, sans-serif",
  label: "var(--font-ui), Inter, system-ui, sans-serif",
  data: "var(--font-data), ui-monospace, SFMono-Regular, Consolas, monospace",
  degree: "var(--font-data), ui-monospace, SFMono-Regular, Consolas, monospace",
  signature: "var(--font-signature), cursive"
} as const;

export const motionTokens = {
  micro: "140ms",
  control: "220ms",
  panel: "320ms",
  brand: "520ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
} as const;

export const cssTokenText = `:root {
  --dl-black: ${dreamLogicColors.black};
  --dl-black-deep: ${dreamLogicColors.blackDeep};
  --dl-white: ${dreamLogicColors.white};
  --dl-cream: ${dreamLogicColors.cream};
  --dl-parchment: ${dreamLogicColors.parchment};
  --dl-midnight: ${dreamLogicColors.midnight};
  --dl-blue: ${dreamLogicColors.blue};
  --dl-blue-bright: ${dreamLogicColors.blueBright};
  --dl-blue-soft: ${dreamLogicColors.blueSoft};
  --dl-yellow: ${dreamLogicColors.yellow};
  --dl-red: ${dreamLogicColors.red};
  --dl-orange: ${dreamLogicColors.orange};
  --dl-bronze: ${dreamLogicColors.bronze};
  --dl-brown: ${dreamLogicColors.brown};
}`;
