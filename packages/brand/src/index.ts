export const productName = "Dream Logic";
export const productDescriptor = "Astrology suite";

export const brandAssets = {
  fullLight: "/brand/fulllitelogo.svg",
  fullDark: "/brand/fulldarklogo.svg",
  main: "/brand/logomain.svg",
  brightAlt: "/brand/logoaltbrightalt.svg"
} as const;

export const registeredMarkRules = {
  useWithLogoLockups: true,
  useInNavigationText: false,
  opticalPlacement: "upper-right shoulder of the stacked wordmark",
  minLockupWidthPx: 96
} as const;

export const museSystem = {
  enabled: true,
  private: true,
  placements: {
    sun: { sign: "Gemini", degree: 17 },
    moon: { sign: "Aquarius", degree: 28 },
    mercury: { sign: "Gemini", degree: 5 },
    venus: { sign: "Gemini", degree: 17 },
    mars: { sign: "Cancer", degree: 20 },
    jupiter: { sign: "Virgo", degree: 10 },
    saturn: { sign: "Cancer", degree: 12 },
    uranus: { sign: "Pisces", degree: 6 },
    neptune: { sign: "Aquarius", degree: 15 },
    pluto: { sign: "Sagittarius", degree: 20 }
  }
} as const;
