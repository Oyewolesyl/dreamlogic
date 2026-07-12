import * as Astronomy from "astronomy-engine";

export type BirthProfile = {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthTimeCertainty: "official_recorded" | "family_reported" | "approximate" | "rectified" | "unknown";
  locationLabel: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  houseSystem: string;
  zodiacMode: "tropical" | "sidereal";
};

export type ChartPlacement = {
  body: string;
  longitude: number;
  sign: string;
  degree: number;
  minute: number;
  retrograde: boolean;
  element: string;
  modality: string;
};

export type ChartAspect = {
  from: string;
  to: string;
  type: string;
  orb: number;
};

export type NatalChart = {
  calculatedAt: string;
  utcInstant: string;
  placements: ChartPlacement[];
  aspects: ChartAspect[];
  balance: {
    elements: Record<string, number>;
    modalities: Record<string, number>;
  };
  warnings: string[];
};

const signs = [
  ["Aries", "Fire", "Cardinal"],
  ["Taurus", "Earth", "Fixed"],
  ["Gemini", "Air", "Mutable"],
  ["Cancer", "Water", "Cardinal"],
  ["Leo", "Fire", "Fixed"],
  ["Virgo", "Earth", "Mutable"],
  ["Libra", "Air", "Cardinal"],
  ["Scorpio", "Water", "Fixed"],
  ["Sagittarius", "Fire", "Mutable"],
  ["Capricorn", "Earth", "Cardinal"],
  ["Aquarius", "Air", "Fixed"],
  ["Pisces", "Water", "Mutable"]
] as const;

const bodies: Array<[string, Astronomy.Body]> = [
  ["Sun", Astronomy.Body.Sun],
  ["Moon", Astronomy.Body.Moon],
  ["Mercury", Astronomy.Body.Mercury],
  ["Venus", Astronomy.Body.Venus],
  ["Mars", Astronomy.Body.Mars],
  ["Jupiter", Astronomy.Body.Jupiter],
  ["Saturn", Astronomy.Body.Saturn],
  ["Uranus", Astronomy.Body.Uranus],
  ["Neptune", Astronomy.Body.Neptune],
  ["Pluto", Astronomy.Body.Pluto]
];

const aspectAngles = [
  ["Conjunction", 0, 8],
  ["Sextile", 60, 4],
  ["Square", 90, 6],
  ["Trine", 120, 6],
  ["Opposition", 180, 8]
] as const;

const normalize = (value: number): number => ((value % 360) + 360) % 360;

const eclipticLongitude = (body: Astronomy.Body, time: Astronomy.AstroTime): number => {
  const vector = body === Astronomy.Body.Moon ? Astronomy.GeoMoon(time) : Astronomy.GeoVector(body, time, true);
  return normalize(Astronomy.Ecliptic(vector).elon);
};

const signFor = (longitude: number) => {
  const index = Math.floor(normalize(longitude) / 30);
  return signs[index];
};

const isRetrograde = (body: Astronomy.Body, time: Astronomy.AstroTime): boolean => {
  if (body === Astronomy.Body.Sun || body === Astronomy.Body.Moon) {
    return false;
  }
  const before = new Astronomy.AstroTime(new Date(time.date.getTime() - 24 * 60 * 60 * 1000));
  const after = new Astronomy.AstroTime(new Date(time.date.getTime() + 24 * 60 * 60 * 1000));
  const delta = normalize(eclipticLongitude(body, after) - eclipticLongitude(body, before));
  return delta > 180;
};

const makeUtcDate = (profile: BirthProfile): Date => {
  const time = profile.birthTimeCertainty === "unknown" || !profile.birthTime ? "12:00" : profile.birthTime;
  return new Date(`${profile.birthDate}T${time}:00.000Z`);
};

export const calculateNatalChart = (profile: BirthProfile): NatalChart => {
  const utc = makeUtcDate(profile);
  const astroTime = new Astronomy.AstroTime(utc);
  const warnings: string[] = [
    "Planetary longitudes are computed deterministically with astronomy-engine. Production houses and angles still require historical timezone and house-system provider hardening."
  ];

  if (profile.birthTimeCertainty === "unknown") {
    warnings.push("Birth time is unknown, so houses, Ascendant, Midheaven and house overlays are intentionally omitted.");
  }

  const placements = bodies.map(([bodyName, body]) => {
    const longitude = eclipticLongitude(body, astroTime);
    const [sign, element, modality] = signFor(longitude);
    const inSign = longitude % 30;
    const degree = Math.floor(inSign);
    const minute = Math.round((inSign - degree) * 60);

    return {
      body: bodyName,
      longitude,
      sign,
      degree,
      minute,
      retrograde: isRetrograde(body, astroTime),
      element,
      modality
    };
  });

  const aspects: ChartAspect[] = [];
  for (let a = 0; a < placements.length; a += 1) {
    for (let b = a + 1; b < placements.length; b += 1) {
      const separation = Math.abs(180 - Math.abs(Math.abs(placements[a].longitude - placements[b].longitude) - 180));
      for (const [type, angle, maxOrb] of aspectAngles) {
        const orb = Math.abs(separation - angle);
        if (orb <= maxOrb) {
          aspects.push({ from: placements[a].body, to: placements[b].body, type, orb: Number(orb.toFixed(2)) });
        }
      }
    }
  }

  const balance = {
    elements: Object.fromEntries(["Fire", "Earth", "Air", "Water"].map((key) => [key, placements.filter((item) => item.element === key).length])),
    modalities: Object.fromEntries(["Cardinal", "Fixed", "Mutable"].map((key) => [key, placements.filter((item) => item.modality === key).length]))
  };

  return {
    calculatedAt: new Date().toISOString(),
    utcInstant: utc.toISOString(),
    placements,
    aspects,
    balance,
    warnings
  };
};
