export type BirthTimeCertainty =
  | "official_recorded"
  | "family_reported"
  | "approximate"
  | "rectified"
  | "unknown";

export type ZodiacMode = "tropical" | "sidereal";

export type HouseSystem =
  | "placidus"
  | "whole_sign"
  | "equal"
  | "porphyry"
  | "regiomontanus"
  | "campanus"
  | "koch"
  | "alcabitius"
  | "morinus"
  | "vehlow";

export type TimeResolution = {
  originalLocalDate: string;
  originalLocalTime: string | null;
  ianaTimeZone: string;
  historicalUtcOffsetMinutes: number | null;
  dstStatus: "standard" | "daylight" | "unknown" | "not_applicable";
  resolvedUtc: string | null;
  resolverVersion: string;
  ambiguityStatus: "clear" | "fold" | "gap" | "uncertain_location" | "unknown_time";
  userOverride: boolean;
};

export type BirthProfileInput = {
  name: string;
  birthDate: string;
  birthTime: string | null;
  birthTimeCertainty: BirthTimeCertainty;
  locationLabel: string;
  latitude: number | null;
  longitude: number | null;
  timeResolution: TimeResolution;
  houseSystem: HouseSystem;
  zodiacMode: ZodiacMode;
};

export type ChartPoint = {
  body: string;
  sign: string;
  degree: number;
  minute: number;
  retrograde: boolean;
  speed?: number;
};

export type ChartSnapshot = {
  id: string;
  profileVersionId: string;
  provider: string;
  providerVersion: string;
  calculatedAt: string;
  points: ChartPoint[];
  houses: Array<{ house: number; sign: string; degree: number }> | null;
  aspects: Array<{ from: string; to: string; type: string; orb: number }>;
  warnings: string[];
};

export type AstrologyCalculationProvider = {
  name: string;
  version: string;
  calculateNatalChart(input: BirthProfileInput): Promise<ChartSnapshot>;
};

export const requiresTimedChart = (input: BirthProfileInput): boolean =>
  input.birthTimeCertainty !== "unknown" && input.birthTime !== null;

export const unknownTimeWarning =
  "Birth time is unknown, so Dream Logic omits houses, Ascendant, Midheaven and other time-dependent claims.";
